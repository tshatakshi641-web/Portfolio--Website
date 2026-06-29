# Meghaa's Ladies Salon — Website MVP

## Problem Statement
Build a stylish and attractive website for Meghaa's Ladies Salon (Mohan Garden, Uttam Nagar, New Delhi). 5.0 ★ on Google with 161 reviews. Owner: Megha. Phone: +91 79825 74977. Services include haircuts, keratin, hair spa, bridal makeup, color, threading, manicure/pedicure, etc.

User instruction: "Add all the things" — full booking, all marketing pages, admin dashboard, curated stock images.

## Architecture
- **Backend**: FastAPI + Motor (MongoDB). Single `server.py`. Routes prefixed `/api`. Admin auth via `x-admin-token` header (token = `ADMIN_TOKEN` env var, default `megha-salon-admin-2025`).
- **Frontend**: React 19 (CRA + craco) + Tailwind + Shadcn UI + framer-motion-like CSS animations. React Router v7. Sonner for toasts.
- **Design**: Light theme, "Organic & Earthy" — warm linen `#FAF8F5`, terracotta `#C87A63`, deep olive ink `#2A2A2A`. Fonts: Cormorant Garamond (display) + Outfit (body).

## What's Implemented (Dec 2025)
### Backend (`/app/backend/server.py`)
- `GET /api/services` — list active services (seeded with 22 across 5 categories)
- `POST/PATCH/DELETE /api/services/*` — admin CRUD
- `POST /api/bookings` — create booking (computes total from selected services)
- `GET/PATCH/DELETE /api/bookings/*` — admin list/update-status/delete
- `GET /api/reviews`, `POST /api/reviews` — list approved + add new (1-5 rating)
- `POST /api/contact`, `GET /api/contact` (admin) — contact messages
- `POST /api/admin/login`, `GET /api/admin/stats` — admin auth + dashboard stats
- Startup seeds 22 services + 6 reviews if empty
- Test suite: `/app/backend/tests/test_salon_api.py` — 18/18 passed

### Frontend (`/app/frontend/src/`)
- Routes: `/`, `/services`, `/gallery`, `/about`, `/reviews`, `/contact`, `/book`, `/admin/login`, `/admin`
- Pages: hero with 5.0 ★ social proof, bento services preview, owner story, reviews preview, final CTA, visit strip
- Services page with category Tabs + Book per service
- Booking flow: multi-service checkbox + Calendar popover (Tuesdays disabled) + Time Select + customer details + summary sidebar → confirmation screen with booking ID + ₹ total
- Reviews page with Write-a-review Dialog (star rating + text)
- Contact page with form, Google Map embed, sticky WhatsApp/Call
- Admin dashboard: stat cards + Bookings/Services/Messages tabs + status updates + add/delete services

## User Personas
1. **Salon Client (primary)** — Indian woman 18–55, books appointments via mobile, prefers WhatsApp confirmation.
2. **Megha (Owner)** — Manages bookings, services, customer messages via `/admin`.

## Core Requirements (static)
- Mobile-first responsive design
- WhatsApp + Call sticky CTAs always visible
- Honest pricing in ₹
- All interactive elements have `data-testid` (kebab-case)

## Backlog (Next Priorities)
### P0
- Booking confirmation via WhatsApp auto-link (one-click message to Megha after booking)
- Email/SMS notifications for new bookings to Megha (SendGrid / Twilio)

### P1
- Service-image upload from admin (real photos of work)
- Time-slot availability check (prevent double bookings)
- Booking reschedule / cancellation links for clients (via secure tokens)

### P2
- Loyalty / referral program ("get ₹100 off when a friend books")
- Gift voucher purchase via Stripe / Razorpay
- Instagram-feed embed on Gallery page
- Multilingual (Hindi) toggle
- SEO meta tags + structured data for Google Business indexing

## Test Credentials
See `/app/memory/test_credentials.md`. Admin password: `megha-salon-admin-2025`.
