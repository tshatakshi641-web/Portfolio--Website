from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN', 'megha-salon-admin-2025')

app = FastAPI(title="Meghaa's Ladies Salon API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class Service(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str
    description: str = ""
    price: int  # INR
    duration_min: int = 60
    active: bool = True
    created_at: str = Field(default_factory=now_iso)


class ServiceCreate(BaseModel):
    name: str
    category: str
    description: str = ""
    price: int
    duration_min: int = 60


class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = None
    duration_min: Optional[int] = None
    active: Optional[bool] = None


class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    service_ids: List[str]
    service_names: List[str] = []
    date: str  # YYYY-MM-DD
    time: str  # HH:MM
    notes: str = ""
    status: str = "pending"  # pending | confirmed | completed | cancelled
    total_price: int = 0
    created_at: str = Field(default_factory=now_iso)


class BookingCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    service_ids: List[str]
    date: str
    time: str
    notes: str = ""


class BookingStatusUpdate(BaseModel):
    status: str


class Review(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    rating: int
    text: str
    source: str = "website"  # website | google
    approved: bool = True
    created_at: str = Field(default_factory=now_iso)


class ReviewCreate(BaseModel):
    name: str
    rating: int
    text: str


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    message: str
    created_at: str = Field(default_factory=now_iso)
    read: bool = False


class ContactCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    message: str


class AdminLogin(BaseModel):
    password: str


# ---------- Auth ----------
async def require_admin(x_admin_token: Optional[str] = Header(None)):
    if x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return True


# ---------- Routes: Services ----------
@api_router.get("/services", response_model=List[Service])
async def list_services(active_only: bool = True):
    q = {"active": True} if active_only else {}
    docs = await db.services.find(q, {"_id": 0}).sort("category", 1).to_list(1000)
    return docs


@api_router.post("/services", response_model=Service)
async def create_service(payload: ServiceCreate, _: bool = Depends(require_admin)):
    svc = Service(**payload.model_dump())
    await db.services.insert_one(svc.model_dump())
    return svc


@api_router.patch("/services/{service_id}", response_model=Service)
async def update_service(service_id: str, payload: ServiceUpdate, _: bool = Depends(require_admin)):
    updates = {k: v for k, v in payload.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="No updates provided")
    result = await db.services.update_one({"id": service_id}, {"$set": updates})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    doc = await db.services.find_one({"id": service_id}, {"_id": 0})
    return doc


@api_router.delete("/services/{service_id}")
async def delete_service(service_id: str, _: bool = Depends(require_admin)):
    result = await db.services.delete_one({"id": service_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"ok": True}


# ---------- Routes: Bookings ----------
@api_router.post("/bookings", response_model=Booking)
async def create_booking(payload: BookingCreate):
    if not payload.service_ids:
        raise HTTPException(status_code=400, detail="Select at least one service")
    services = await db.services.find({"id": {"$in": payload.service_ids}}, {"_id": 0}).to_list(100)
    if not services:
        raise HTTPException(status_code=400, detail="Invalid services")
    total_price = sum(s.get("price", 0) for s in services)
    names = [s["name"] for s in services]
    booking = Booking(
        **payload.model_dump(),
        service_names=names,
        total_price=total_price,
    )
    await db.bookings.insert_one(booking.model_dump())
    return booking


@api_router.get("/bookings", response_model=List[Booking])
async def list_bookings(_: bool = Depends(require_admin), status: Optional[str] = None):
    q = {}
    if status:
        q["status"] = status
    docs = await db.bookings.find(q, {"_id": 0}).sort("created_at", -1).to_list(2000)
    return docs


@api_router.patch("/bookings/{booking_id}", response_model=Booking)
async def update_booking_status(booking_id: str, payload: BookingStatusUpdate, _: bool = Depends(require_admin)):
    if payload.status not in ("pending", "confirmed", "completed", "cancelled"):
        raise HTTPException(status_code=400, detail="Invalid status")
    result = await db.bookings.update_one({"id": booking_id}, {"$set": {"status": payload.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    doc = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    return doc


@api_router.delete("/bookings/{booking_id}")
async def delete_booking(booking_id: str, _: bool = Depends(require_admin)):
    result = await db.bookings.delete_one({"id": booking_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"ok": True}


# ---------- Routes: Reviews ----------
@api_router.get("/reviews", response_model=List[Review])
async def list_reviews(approved_only: bool = True):
    q = {"approved": True} if approved_only else {}
    docs = await db.reviews.find(q, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


@api_router.post("/reviews", response_model=Review)
async def create_review(payload: ReviewCreate):
    if payload.rating < 1 or payload.rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be 1-5")
    review = Review(**payload.model_dump(), source="website", approved=True)
    await db.reviews.insert_one(review.model_dump())
    return review


# ---------- Routes: Contact ----------
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.model_dump())
    await db.contacts.insert_one(msg.model_dump())
    return msg


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts(_: bool = Depends(require_admin)):
    docs = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


# ---------- Admin ----------
@api_router.post("/admin/login")
async def admin_login(payload: AdminLogin):
    if payload.password != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid password")
    return {"token": ADMIN_TOKEN}


@api_router.get("/admin/stats")
async def admin_stats(_: bool = Depends(require_admin)):
    total_bookings = await db.bookings.count_documents({})
    pending = await db.bookings.count_documents({"status": "pending"})
    confirmed = await db.bookings.count_documents({"status": "confirmed"})
    completed = await db.bookings.count_documents({"status": "completed"})
    cancelled = await db.bookings.count_documents({"status": "cancelled"})
    total_services = await db.services.count_documents({"active": True})
    total_messages = await db.contacts.count_documents({})
    return {
        "total_bookings": total_bookings,
        "pending": pending,
        "confirmed": confirmed,
        "completed": completed,
        "cancelled": cancelled,
        "total_services": total_services,
        "total_messages": total_messages,
    }


@api_router.get("/")
async def root():
    return {"message": "Meghaa's Ladies Salon API", "status": "ok"}


# ---------- Seed ----------
DEFAULT_SERVICES = [
    # Hair
    {"name": "Haircut & Styling", "category": "Hair", "description": "Tailored haircut with blow-dry finish by Megha & team.", "price": 700, "duration_min": 60},
    {"name": "Blow Dry", "category": "Hair", "description": "Salon-quality blow dry for any occasion.", "price": 500, "duration_min": 40},
    {"name": "Fringe Trim", "category": "Hair", "description": "Quick precision fringe / bang trim.", "price": 200, "duration_min": 15},
    {"name": "Hair Straightening", "category": "Hair", "description": "Sleek, frizz-free straightening with care for hair health.", "price": 3500, "duration_min": 180},
    {"name": "Keratin Treatment", "category": "Hair", "description": "Premium keratin treatment for smooth, shiny, manageable hair.", "price": 4500, "duration_min": 210},
    {"name": "Hair Spa", "category": "Hair", "description": "Deep-conditioning spa with scalp massage.", "price": 1200, "duration_min": 75},
    {"name": "Children's Haircut", "category": "Hair", "description": "Gentle, friendly haircuts for kids.", "price": 350, "duration_min": 30},
    # Color
    {"name": "Global Hair Colour", "category": "Color", "description": "All-over colour using ammonia-free brands.", "price": 2800, "duration_min": 120},
    {"name": "Highlights", "category": "Color", "description": "Foil highlights to add dimension & glow.", "price": 3500, "duration_min": 150},
    {"name": "Balayage", "category": "Color", "description": "Hand-painted, sun-kissed colour blend.", "price": 4500, "duration_min": 180},
    {"name": "Ombre Hair Colour", "category": "Color", "description": "Gradient colour from dark roots to lighter ends.", "price": 4000, "duration_min": 180},
    {"name": "Gloss / Glaze", "category": "Color", "description": "Add shine and tone refresh in 30 minutes.", "price": 1500, "duration_min": 45},
    # Bridal & Makeup
    {"name": "Bridal Make-up", "category": "Bridal & Makeup", "description": "Complete bridal look with HD makeup, hair & draping.", "price": 12000, "duration_min": 180},
    {"name": "Party Make-up", "category": "Bridal & Makeup", "description": "Glam party makeup for any occasion.", "price": 2500, "duration_min": 75},
    {"name": "Engagement Look", "category": "Bridal & Makeup", "description": "Soft, radiant engagement makeup + hair.", "price": 6000, "duration_min": 120},
    # Skin & Body
    {"name": "Eyebrow Threading", "category": "Skin & Body", "description": "Precision shaping with experienced hands.", "price": 80, "duration_min": 15},
    {"name": "Body Waxing (Full)", "category": "Skin & Body", "description": "Full body waxing with rica / honey wax.", "price": 1800, "duration_min": 75},
    {"name": "Head Massage", "category": "Skin & Body", "description": "Relaxing oil head massage with warm towel.", "price": 600, "duration_min": 30},
    {"name": "Shampoo & Conditioning", "category": "Skin & Body", "description": "Wash, mask & conditioning treatment.", "price": 400, "duration_min": 30},
    # Nails
    {"name": "Manicure", "category": "Nails", "description": "Classic manicure with shape, cuticle care & polish.", "price": 500, "duration_min": 45},
    {"name": "Pedicure", "category": "Nails", "description": "Relaxing pedicure with scrub & polish.", "price": 700, "duration_min": 60},
]

DEFAULT_REVIEWS = [
    {"name": "Priya S.", "rating": 5, "text": "Had a wonderful experience! The service is really good, and they use genuine products. All the staff are very polite and welcoming. Megha is full of energy and spreads positivity!", "source": "google"},
    {"name": "Anjali R.", "rating": 5, "text": "You will get best service with best price by best host (Megha) here.", "source": "google"},
    {"name": "Neha K.", "rating": 5, "text": "Amazing work, my experience... very kind behaviour. Love it!", "source": "google"},
    {"name": "Sneha P.", "rating": 5, "text": "Got my keratin done here — silky smooth hair and so worth it. Highly recommend Meghaa's Ladies Salon.", "source": "google"},
    {"name": "Riya M.", "rating": 5, "text": "Best bridal makeup in Uttam Nagar. Megha didi made me feel so beautiful on my big day!", "source": "google"},
    {"name": "Pooja D.", "rating": 5, "text": "Clean, hygienic and very professional. The hair spa is heavenly. My go-to salon.", "source": "google"},
]


@app.on_event("startup")
async def seed():
    if await db.services.count_documents({}) == 0:
        for s in DEFAULT_SERVICES:
            svc = Service(**s)
            await db.services.insert_one(svc.model_dump())
        logger.info(f"Seeded {len(DEFAULT_SERVICES)} services")
    if await db.reviews.count_documents({}) == 0:
        for r in DEFAULT_REVIEWS:
            rv = Review(**r, approved=True)
            await db.reviews.insert_one(rv.model_dump())
        logger.info(f"Seeded {len(DEFAULT_REVIEWS)} reviews")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
