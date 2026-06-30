import {
    GraduationCap,
    Briefcase,
    Sparkles,
    Rocket,
    TrendingUp,
    Award,
} from "lucide-react";
import { achievements } from "../data/portfolio";

const ICONS = {
    GraduationCap,
    Briefcase,
    Sparkles,
    Rocket,
    TrendingUp,
    Award,
};

export const Achievements = () => {
    return (
        <section
            id="achievements"
            data-testid="achievements-section"
            className="relative border-t border-hairline bg-ink text-white overflow-hidden"
        >
            {/* Decorative grain / gradient layer */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                    background:
                        "radial-gradient(1200px 600px at 10% 10%, rgba(0,47,167,0.45), transparent 60%), radial-gradient(900px 500px at 90% 90%, rgba(0,47,167,0.25), transparent 60%)",
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
                <div className="grid md:grid-cols-12 gap-10 mb-16">
                    <div className="md:col-span-4">
                        <p className="text-xs tracking-[0.3em] uppercase font-bold text-white/70 mb-4">
                            <span className="text-klein-on-dark">/ 04 — </span>
                            Achievements
                        </p>
                    </div>
                    <div className="md:col-span-8">
                        <h2 className="font-display font-black uppercase tracking-tight text-4xl md:text-6xl text-white leading-[1.02]">
                            Things I&apos;m proud of.
                        </h2>
                        <p className="mt-6 text-base text-white/65 max-w-xl">
                            Milestones, mindsets, and momentum — the through-line behind
                            the resume.
                        </p>
                    </div>
                </div>

                <div
                    data-testid="achievements-grid"
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
                >
                    {achievements.map((item, i) => {
                        const Icon = ICONS[item.icon] || Award;
                        return (
                            <article
                                key={item.title}
                                data-testid={`achievement-card-${i}`}
                                className="group relative p-7 md:p-8 rounded-sm border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] hover:border-white/35 hover:bg-white/[0.10] transition-all duration-500"
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                {/* Soft top sheen */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                />

                                <div className="flex items-center justify-between mb-7">
                                    <div className="w-12 h-12 rounded-sm border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-klein group-hover:border-klein transition-colors duration-500">
                                        <Icon
                                            size={22}
                                            strokeWidth={1.5}
                                            className="text-white"
                                        />
                                    </div>
                                    <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white/55">
                                        {String(i + 1).padStart(2, "0")}
                                    </p>
                                </div>

                                <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight leading-tight text-white mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-sm md:text-base text-white/70 leading-relaxed">
                                    {item.description}
                                </p>

                                <div
                                    aria-hidden="true"
                                    className="mt-7 h-px w-10 bg-white/30 group-hover:w-20 group-hover:bg-white transition-all duration-500"
                                />
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
