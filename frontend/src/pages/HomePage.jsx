import { Link } from "react-router-dom";
import { Sparkles, Star, MapPin, Clock, ArrowRight, Scissors, Brush, Heart, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRow from "@/components/StarRow";
import SectionHeading from "@/components/SectionHeading";
import { SALON, callLink, whatsappLink } from "@/lib/salon";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const HERO_IMG = "https://images.pexels.com/photos/7195811/pexels-photo-7195811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400";
const OWNER_IMG = "https://images.unsplash.com/photo-1679138118375-47f78db3761d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwyfHxzbWlsaW5nJTIwaW5kaWFuJTIwZmVtYWxlJTIwYnVzaW5lc3MlMjBvd25lciUyMHBvcnRyYWl0fGVufDB8fHx8MTc4Mjc2NDgyNnww&ixlib=rb-4.1.0&q=85&w=900";

const featureCards = [
  { icon: Scissors, title: "Hair & Color", desc: "Cuts, keratin, balayage, ombre", img: "https://images.unsplash.com/photo-1636153279424-cb5d1e00f5a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJlYXV0aWZ1bCUyMGhhaXIlMjBzdHlsaW5nJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzgyNzY0ODA5fDA&ixlib=rb-4.1.0&q=85&w=600" },
  { icon: Heart, title: "Bridal & Makeup", desc: "HD makeup, hair styling, draping", img: "https://images.pexels.com/photos/36519701/pexels-photo-36519701.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=600" },
  { icon: Brush, title: "Skin & Spa", desc: "Threading, waxing, head massage", img: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3BhJTIwdHJlYXRtZW50JTIwd2FzaGluZ3xlbnwwfHx8fDE3ODI3NjQ4MjZ8MA&ixlib=rb-4.1.0&q=85&w=600" },
  { icon: Hand, title: "Nails", desc: "Manicure, pedicure, nail art", img: "https://images.unsplash.com/photo-1779636198585-658170ee0283?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwyfHxwZWRpY3VyZSUyMG1hbmljdXJlJTIwbmFpbCUyMGFydHxlbnwwfHx8fDE3ODI3NjQ4MjZ8MA&ixlib=rb-4.1.0&q=85&w=600" },
];

export default function HomePage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get("/reviews").then((r) => setReviews(r.data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative overflow-hidden" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-20 lg:pt-16 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left copy */}
            <div className="lg:col-span-6 reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E8E2D9] shadow-sm">
                <Star className="w-3.5 h-3.5 fill-[#C87A63] text-[#C87A63]" />
                <span className="text-xs font-medium text-[#2A2A2A]">
                  5.0 · {SALON.reviewsCount} Google Reviews
                </span>
              </div>

              <h1 className="font-serif-display text-[44px] sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.0] text-[#2A2A2A] mt-6">
                Beauty,<br />
                <span className="italic text-[#C87A63]">crafted with </span>
                <span className="italic">care</span>.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-[#5C5C5C] leading-relaxed max-w-xl">
                Step into <span className="text-[#2A2A2A] font-medium">Meghaa's Ladies Salon</span> in Mohan Garden — a warm, women-only space for haircuts, keratin, bridal makeup, hair spa and more. Genuine products, gentle hands, and Megha's signature energy.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/book" data-testid="hero-book-btn">
                  <Button className="rounded-full bg-[#C87A63] hover:bg-[#B3664F] text-white h-12 px-7 text-base">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" data-testid="hero-whatsapp-btn">
                  <Button variant="outline" className="rounded-full h-12 px-7 text-base border-[#2A2A2A] text-[#2A2A2A] hover:bg-[#2A2A2A] hover:text-white">
                    WhatsApp Megha
                  </Button>
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                <div>
                  <div className="font-serif-display text-3xl text-[#C87A63]">5.0★</div>
                  <p className="text-xs text-[#5C5C5C] mt-1 uppercase tracking-wider">Google rated</p>
                </div>
                <div>
                  <div className="font-serif-display text-3xl text-[#C87A63]">22+</div>
                  <p className="text-xs text-[#5C5C5C] mt-1 uppercase tracking-wider">Services</p>
                </div>
                <div>
                  <div className="font-serif-display text-3xl text-[#C87A63]">3+ yrs</div>
                  <p className="text-xs text-[#5C5C5C] mt-1 uppercase tracking-wider">In business</p>
                </div>
              </div>
            </div>

            {/* Right visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[28px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] aspect-[5/6] reveal">
                <img
                  src={HERO_IMG}
                  alt="Modern salon interior at Meghaa's Ladies Salon"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                  <div className="bg-white/85 backdrop-blur-xl rounded-2xl p-4 border border-white/60">
                    <div className="flex items-center gap-1">
                      <StarRow rating={5} size={14} />
                    </div>
                    <p className="text-sm text-[#2A2A2A] mt-1 font-medium">
                      "Best service with best price."
                    </p>
                    <p className="text-[11px] text-[#5C5C5C] mt-0.5">— Google Review</p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="hidden md:flex absolute -top-6 -left-6 lg:-left-10 items-center gap-3 bg-white rounded-2xl p-4 border border-[#E8E2D9] shadow-[0_12px_30px_rgba(0,0,0,0.08)] float-y">
                <div className="w-12 h-12 rounded-full bg-[#F0ECE1] grid place-items-center">
                  <Sparkles className="w-5 h-5 text-[#C87A63]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C87A63]">Open Today</p>
                  <p className="text-sm font-medium text-[#2A2A2A]">{SALON.hoursWeekday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview - Bento */}
      <section className="py-16 lg:py-24" style={{ background: "var(--bg-2)" }} data-testid="services-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <SectionHeading
              overline="What we do"
              title="A complete salon experience, all under one roof."
              description="From everyday haircuts to once-in-a-lifetime bridal looks — Megha and her team specialise in a wide range of beauty services."
            />
            <Link to="/services" className="self-start lg:self-end" data-testid="see-all-services-link">
              <Button variant="ghost" className="text-[#C87A63] hover:bg-[#E8E2D9] rounded-full">
                See all services <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {featureCards.map((c, i) => (
              <Link
                key={c.title}
                to="/services"
                data-testid={`service-card-${i}`}
                className="group relative rounded-2xl overflow-hidden bg-white border border-[#E8E2D9] hover:-translate-y-1 transition-transform duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-4 lg:p-5">
                  <div className="flex items-center gap-2">
                    <c.icon className="w-4 h-4 text-[#C87A63]" />
                    <h3 className="font-serif-display text-xl text-[#2A2A2A]">{c.title}</h3>
                  </div>
                  <p className="text-sm text-[#5C5C5C] mt-1">{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section className="py-20 lg:py-28" data-testid="about-snippet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="relative rounded-[28px] overflow-hidden aspect-[4/5] shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
              <img src={OWNER_IMG} alt="Megha — founder of Meghaa's Ladies Salon" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C87A63]">Meet the founder</p>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05] mt-3 text-[#2A2A2A]">
              "Every guest leaves a little<br />more confident than she came."
            </h2>
            <p className="mt-6 text-lg text-[#5C5C5C] leading-relaxed">
              Megha started this salon with one belief — that women deserve a beauty space that feels like home. Honest pricing, genuine products, hygienic spaces, and gentle service. Whether it's your first haircut after lockdown or your wedding day, you're in caring hands.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" data-testid="about-snippet-link">
                <Button className="rounded-full bg-[#2A2A2A] hover:bg-black text-white h-11 px-6">
                  Our story
                </Button>
              </Link>
              <a href={callLink()} data-testid="about-snippet-call">
                <Button variant="outline" className="rounded-full h-11 px-6 border-[#C87A63] text-[#C87A63] hover:bg-[#C87A63] hover:text-white">
                  Call {SALON.phone}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews preview */}
      <section className="py-20 lg:py-28" style={{ background: "var(--bg-2)" }} data-testid="reviews-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <SectionHeading
            align="center"
            overline="Loved by our clients"
            title="161 five-star reviews. And counting."
            description="Real words from real clients. We're humbled by every visit."
            className="mb-12"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={r.id || i}
                className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                data-testid={`review-preview-${i}`}
              >
                <StarRow rating={r.rating || 5} />
                <p className="mt-4 text-[#2A2A2A] text-base leading-relaxed">"{r.text}"</p>
                <div className="mt-5 pt-5 border-t border-[#F0ECE1] flex items-center justify-between">
                  <p className="text-sm font-medium text-[#2A2A2A]">{r.name}</p>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C87A63]">{r.source}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/reviews" data-testid="reviews-preview-link">
              <Button variant="ghost" className="text-[#C87A63] hover:bg-white rounded-full">
                Read all reviews <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 lg:py-28" data-testid="final-cta">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="relative rounded-[32px] overflow-hidden p-8 sm:p-14 lg:p-20 bg-[#2A2A2A] text-white">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#C87A63]/40 blur-3xl" />
            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4A373]">Reserve your seat</p>
                <h3 className="font-serif-display text-4xl lg:text-5xl tracking-tight leading-tight mt-3">
                  A little 'me-time' is waiting for you.
                </h3>
                <p className="mt-4 text-white/70 max-w-xl">
                  Book online in under 30 seconds. Pick your service, choose a time, and Megha will see you soon.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
                <Link to="/book" data-testid="final-cta-book">
                  <Button className="rounded-full bg-[#C87A63] hover:bg-[#B3664F] h-12 px-7 text-base">
                    Book now <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" data-testid="final-cta-whatsapp">
                  <Button variant="outline" className="rounded-full h-12 px-7 text-base bg-transparent border-white text-white hover:bg-white hover:text-[#2A2A2A]">
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Strip */}
      <section className="pb-20 lg:pb-28" data-testid="visit-strip">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E8E2D9] flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#C87A63] mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#5C5C5C]">Visit us</p>
              <p className="text-sm font-medium text-[#2A2A2A] mt-1">{SALON.shortAddress}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-[#E8E2D9] flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#C87A63] mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#5C5C5C]">Open hours</p>
              <p className="text-sm font-medium text-[#2A2A2A] mt-1">{SALON.hoursWeekday} · Closed {SALON.hoursClosed}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-[#E8E2D9] flex items-start gap-3">
            <Star className="w-5 h-5 text-[#C87A63] mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#5C5C5C]">Rated 5.0</p>
              <p className="text-sm font-medium text-[#2A2A2A] mt-1">on Google · {SALON.reviewsCount} reviews</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
