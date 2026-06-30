# Shatakshi Tiwari — Portfolio (PRD)

## Original Problem Statement
Build a personal portfolio for Shatakshi Tiwari (MBA student) showcasing Operations Coordination,
Business Development & Inside Sales experience. Static React app, deployable to GitHub Pages
(repo: `Portfolio--Website`). Use `mailto:` for contact, placeholders for phone/LinkedIn/GitHub/resume,
no photo, no backend.

## User Persona
- MBA student / early-career business professional
- Targeting recruiters in Operations, Business Operations, Sales Operations, Business Development

## Architecture
- React 19 SPA (CRA + Craco), Tailwind CSS, no backend, no API calls
- Pure static — deployable to GitHub Pages via `gh-pages` package
- Single content file: `frontend/src/data/portfolio.js`

## Sections Implemented (Dec 2026)
- Navbar (sticky, mobile responsive)
- Hero (massive typographic, status pill, stats strip)
- About (bio + abstract image + 4-card info grid)
- Skills (numbered grid + marquee strip)
- Experience (Star Estate + Short Web Solution timeline)
- Projects (Portfolio site + MBA academic project)
- Education (MBA + BA)
- Contact (oversized `Let's talk`, mailto link, LinkedIn/GitHub/resume placeholders)
- Footer

## Design System
- Archetype 4: Swiss & High-Contrast, light theme
- Fonts: Outfit (display) + IBM Plex Sans (body)
- Accent: Klein Blue (#002FA7) on near-pure white background, sharp 1px hairline borders

## Backlog / Next Phase
- P1: Replace placeholders (phone, LinkedIn, GitHub URLs, resume PDF)
- P1: Deploy to GitHub Pages (see `/app/DEPLOYMENT.md`)
- P2: Add Achievements / Certifications section
- P2: Add scroll-progress indicator and smoother section animations
- P2: Add favicon + open-graph image
- P3: Light analytics (Plausible/Umami) once deployed
