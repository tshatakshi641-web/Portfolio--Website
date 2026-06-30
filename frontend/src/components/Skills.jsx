import { skills } from "../data/portfolio";

export const Skills = () => {
    // Duplicate for seamless marquee
    const marqueeItems = [...skills, ...skills];

    return (
        <section
            id="skills"
            data-testid="skills-section"
            className="border-t border-hairline bg-paper"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
                <div className="grid md:grid-cols-12 gap-10 mb-16">
                    <div className="md:col-span-4">
                        <p className="text-xs tracking-[0.3em] uppercase font-bold text-klein mb-4">
                            / 02 — Skills
                        </p>
                    </div>
                    <div className="md:col-span-8">
                        <h2 className="font-display font-black uppercase tracking-tight text-4xl md:text-6xl text-ink leading-[1.02]">
                            The toolkit.
                        </h2>
                        <p className="mt-6 text-base text-muted2 max-w-xl">
                            A blend of business fundamentals, CRM discipline, and the soft
                            skills that actually move pipelines forward.
                        </p>
                    </div>
                </div>

                {/* Brutalist tag grid */}
                <div
                    data-testid="skills-grid"
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 border-t border-l border-hairline"
                >
                    {skills.map((s, i) => (
                        <div
                            key={s}
                            data-testid={`skill-${i}`}
                            className="group relative p-6 border-r border-b border-hairline hover:bg-ink hover:text-white transition-all duration-300 cursor-default"
                        >
                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted2 group-hover:text-white/60 mb-3">
                                {String(i + 1).padStart(2, "0")}
                            </p>
                            <p className="font-display font-semibold text-lg leading-tight">
                                {s}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom marquee */}
            <div className="border-t border-b border-hairline overflow-hidden bg-ink text-white">
                <div className="marquee flex whitespace-nowrap py-5">
                    {marqueeItems.map((s, i) => (
                        <span
                            key={i}
                            className="font-display font-black uppercase text-3xl md:text-5xl tracking-tight px-8 flex items-center gap-8"
                        >
                            {s}
                            <span className="text-klein">✦</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};
