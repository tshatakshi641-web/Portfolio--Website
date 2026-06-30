import { ArrowUpRight } from "lucide-react";
import { experience } from "../data/portfolio";

export const Experience = () => {
    return (
        <section
            id="experience"
            data-testid="experience-section"
            className="border-t border-hairline bg-surface"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
                <div className="grid md:grid-cols-12 gap-10 mb-16">
                    <div className="md:col-span-4">
                        <p className="text-xs tracking-[0.3em] uppercase font-bold text-klein mb-4">
                            / 05 — Experience
                        </p>
                    </div>
                    <div className="md:col-span-8">
                        <h2 className="font-display font-black uppercase tracking-tight text-4xl md:text-6xl text-ink leading-[1.02]">
                            Where I&apos;ve worked.
                        </h2>
                    </div>
                </div>

                <div className="border-t border-hairline">
                    {experience.map((job, i) => (
                        <article
                            key={job.company}
                            data-testid={`experience-item-${i}`}
                            className="group border-b border-hairline py-10 md:py-14 grid md:grid-cols-12 gap-6 hover:bg-paper transition-colors duration-300"
                        >
                            <div className="md:col-span-3">
                                <p className="text-xs uppercase tracking-[0.2em] text-muted2 mb-2">
                                    {job.period}
                                </p>
                                <p className="text-xs uppercase tracking-[0.2em] text-klein font-semibold">
                                    {job.location}
                                </p>
                            </div>

                            <div className="md:col-span-9">
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                                    <h3 className="font-display font-bold text-2xl md:text-4xl text-ink tracking-tight leading-tight">
                                        {job.role}
                                    </h3>
                                    <ArrowUpRight
                                        size={28}
                                        strokeWidth={1.25}
                                        className="text-muted2 group-hover:text-klein group-hover:rotate-45 transition-all duration-500"
                                    />
                                </div>
                                <p className="font-display font-semibold text-lg text-klein mb-6">
                                    {job.company}
                                </p>
                                <ul className="space-y-3 max-w-3xl">
                                    {job.bullets.map((b, idx) => (
                                        <li
                                            key={idx}
                                            className="flex gap-3 text-base text-muted2 leading-relaxed"
                                        >
                                            <span className="text-klein font-bold mt-1.5 shrink-0">
                                                ─
                                            </span>
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
