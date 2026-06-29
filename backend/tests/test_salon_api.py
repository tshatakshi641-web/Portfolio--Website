"""Backend API tests for Meghaa's Ladies Salon"""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://nearby-salons-4.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"
ADMIN_PASSWORD = "megha-salon-admin-2025"


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def admin_token(client):
    r = client.post(f"{API}/admin/login", json={"password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"Admin login failed: {r.text}"
    return r.json()["token"]


@pytest.fixture(scope="session")
def admin_client(admin_token):
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json", "x-admin-token": admin_token})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        assert r.json().get("status") == "ok"


# ---------- Services ----------
class TestServices:
    def test_list_services_seeded(self, client):
        r = client.get(f"{API}/services")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 20, f"Expected >=20 seeded services, got {len(data)}"
        # validate structure
        sample = data[0]
        for k in ["id", "name", "category", "price", "duration_min"]:
            assert k in sample, f"Missing field {k}"
        # validate categories
        cats = {s["category"] for s in data}
        for expected in ["Hair", "Color", "Bridal & Makeup", "Skin & Body", "Nails"]:
            assert expected in cats, f"Missing category {expected}"

    def test_admin_create_and_delete_service(self, admin_client, client):
        payload = {"name": "TEST_AdminService", "category": "Hair",
                   "description": "test", "price": 999, "duration_min": 30}
        r = admin_client.post(f"{API}/services", json=payload)
        assert r.status_code == 200, r.text
        svc = r.json()
        assert svc["name"] == payload["name"]
        assert svc["price"] == 999
        svc_id = svc["id"]
        # verify list contains it
        r2 = client.get(f"{API}/services")
        assert any(s["id"] == svc_id for s in r2.json())
        # delete
        r3 = admin_client.delete(f"{API}/services/{svc_id}")
        assert r3.status_code == 200

    def test_create_service_requires_admin(self, client):
        r = client.post(f"{API}/services", json={"name": "X", "category": "Hair", "price": 10})
        assert r.status_code == 401


# ---------- Reviews ----------
class TestReviews:
    def test_list_reviews_seeded(self, client):
        r = client.get(f"{API}/reviews")
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 6
        assert all("rating" in x and "name" in x and "text" in x for x in data)

    def test_create_review(self, client):
        r = client.post(f"{API}/reviews", json={"name": "TEST_Tester", "rating": 5, "text": "Amazing!"})
        assert r.status_code == 200
        body = r.json()
        assert body["rating"] == 5
        assert body["name"] == "TEST_Tester"

    def test_invalid_rating_low(self, client):
        r = client.post(f"{API}/reviews", json={"name": "X", "rating": 0, "text": "bad"})
        assert r.status_code == 400

    def test_invalid_rating_high(self, client):
        r = client.post(f"{API}/reviews", json={"name": "X", "rating": 6, "text": "bad"})
        assert r.status_code == 400


# ---------- Contact ----------
class TestContact:
    def test_create_contact(self, client):
        r = client.post(f"{API}/contact", json={
            "name": "TEST_Contact", "phone": "+919999999999",
            "email": "t@t.com", "message": "Hi"
        })
        assert r.status_code == 200
        assert r.json()["name"] == "TEST_Contact"

    def test_list_contact_requires_admin(self, client):
        r = client.get(f"{API}/contact")
        assert r.status_code == 401

    def test_list_contact_admin(self, admin_client):
        r = admin_client.get(f"{API}/contact")
        assert r.status_code == 200
        assert isinstance(r.json(), list)


# ---------- Bookings ----------
class TestBookings:
    def test_create_booking(self, client, admin_client):
        services = client.get(f"{API}/services").json()
        chosen = services[:2]
        service_ids = [s["id"] for s in chosen]
        expected_total = sum(s["price"] for s in chosen)
        payload = {
            "name": "TEST_Booker", "phone": "+919876543210",
            "service_ids": service_ids,
            "date": "2026-02-15", "time": "11:00", "notes": "test"
        }
        r = client.post(f"{API}/bookings", json=payload)
        assert r.status_code == 200, r.text
        b = r.json()
        assert b["status"] == "pending"
        assert b["total_price"] == expected_total
        assert sorted(b["service_ids"]) == sorted(service_ids)
        assert len(b["service_names"]) == 2

        # verify via admin GET
        bid = b["id"]
        r2 = admin_client.get(f"{API}/bookings")
        assert r2.status_code == 200
        assert any(x["id"] == bid for x in r2.json())

        # update status
        r3 = admin_client.patch(f"{API}/bookings/{bid}", json={"status": "confirmed"})
        assert r3.status_code == 200
        assert r3.json()["status"] == "confirmed"

        # invalid status
        r4 = admin_client.patch(f"{API}/bookings/{bid}", json={"status": "bogus"})
        assert r4.status_code == 400

    def test_empty_services_rejected(self, client):
        r = client.post(f"{API}/bookings", json={
            "name": "X", "phone": "1", "service_ids": [],
            "date": "2026-02-15", "time": "11:00"
        })
        assert r.status_code == 400

    def test_list_bookings_requires_admin(self, client):
        r = client.get(f"{API}/bookings")
        assert r.status_code == 401


# ---------- Admin ----------
class TestAdmin:
    def test_login_wrong_password(self, client):
        r = client.post(f"{API}/admin/login", json={"password": "wrong"})
        assert r.status_code == 401

    def test_login_correct(self, client):
        r = client.post(f"{API}/admin/login", json={"password": ADMIN_PASSWORD})
        assert r.status_code == 200
        assert "token" in r.json()

    def test_stats_requires_admin(self, client):
        r = client.get(f"{API}/admin/stats")
        assert r.status_code == 401

    def test_stats(self, admin_client):
        r = admin_client.get(f"{API}/admin/stats")
        assert r.status_code == 200
        d = r.json()
        for k in ["total_bookings", "pending", "confirmed", "completed", "cancelled", "total_services", "total_messages"]:
            assert k in d
