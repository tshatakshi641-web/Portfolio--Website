import { ArrowDownRight, MapPin } from "lucide-react";
import { profile } from "../data/portfolio";

export const Hero = () => {
    return (
        <section
            id="top"
            data-testid="hero-section"
            className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 max-w-7xl mx-auto px-6 md:px-12"
        >
            {/* Status row */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-6 reveal delay-1">
                <div className="flex items-center gap-3">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-klein opacity-75 animate-ping"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-klein"></span>
                    </span>
                    <p className="text-xs tracking-[0.25em] uppercase font-bold text-klein">
                        Available for Full-time Roles
                    </p>
                </div>
                <p className="text-xs tracking-[0.25em] uppercase font-medium text-muted2 flex items-center gap-2">
                    <MapPin size={12} strokeWidth={1.5} /> {profile.location} · MBA · 2026
                </p>
            </div>

            {/* Massive headline */}
            <div className="flex-1 flex flex-col justify-center py-16 md:py-24">
                <p
                    data-testid="hero-overline"
                    className="text-xs tracking-[0.3em] uppercase font-bold text-muted2 mb-6 reveal delay-1"
                >
                    Portfolio / 2026 — Shatakshi Tiwari
                </p>

                <h1
                    data-testid="hero-headline"
                    className="font-display font-black uppercase leading-[0.92] tracking-[-0.04em] text-ink"
                >
                    <span className="block text-[14vw] md:text-[10vw] reveal delay-2">
                        Operations
                    </span>
                    <span className="block text-[14vw] md:text-[10vw] reveal delay-3">
                        <em className="not-italic text-klein">&</em>{" "}
                        <span className="italic font-serif" style={{ fontFamily: "'Outfit', serif" }}>
                            Business
                        </span>
                    </span>
                    <span className="block text-[14vw] md:text-[10vw] reveal delay-4">
                        Development.
                    </span>
                </h1>

                <div className="mt-10 grid md:grid-cols-12 gap-6 items-end reveal delay-5">
                    <p className="md:col-span-7 text-base md:text-lg text-muted2 leading-relaxed max-w-2xl">
                        MBA student turning operational chaos into measurable outcomes —
                        through CRM hygiene, cross-functional coordination, and a
                        relentless eye for customer experience.
                    </p>
                    <div className="md:col-span-5 flex md:justify-end gap-3">
                        <a
                            href="#contact"
                            data-testid="hero-cta-contact"
                            className="inline-flex items-center gap-2 bg-ink text-white px-5 py-3 text-sm font-semibold hover:bg-klein transition-colors"
                        >
                            Get in touch
                            <ArrowDownRight size={16} strokeWidth={1.5} />
                        </a>
                        <a
                            href="#experience"
                            data-testid="hero-cta-work"
                            className="inline-flex items-center gap-2 border border-ink px-5 py-3 text-sm font-semibold text-ink hover:bg-ink hover:text-white transition-colors"
                        >
                            See my work
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom marquee strip */}
            <div className="border-t border-hairline pt-6 reveal delay-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3">
                    {[
                        ["2+ yrs", "Hands-on Experience"],
                        ["100%", "CRM Discipline"],
                        ["B2B & B2C", "Customer Coordination"],
                        ["MBA", "In Progress"],
                    ].map(([k, v]) => (
                        <div key={k}>
                            <p className="font-display font-black text-2xl text-ink">{k}</p>
                            <p className="text-xs uppercase tracking-[0.15em] text-muted2 mt-1">
                                {v}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
