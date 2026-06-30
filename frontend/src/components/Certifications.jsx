import { ArrowUpRight, Award } from "lucide-react";
import { certifications } from "../data/portfolio";

export const Certifications = () => {
    return (
        <section
            id="certifications"
            data-testid="certifications-section"
            className="border-t border-hairline bg-paper"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
                <div className="grid md:grid-cols-12 gap-10 mb-16">
                    <div className="md:col-span-4">
                        <p className="text-xs tracking-[0.3em] uppercase font-bold text-klein mb-4">
                            / 03 — Certifications
                        </p>
                    </div>
                    <div className="md:col-span-8">
                        <h2 className="font-display font-black uppercase tracking-tight text-4xl md:text-6xl text-ink leading-[1.02]">
                            Credentials &amp; courses.
                        </h2>
                        <p className="mt-6 text-base text-muted2 max-w-xl">
                            Continuous learning across AI, marketing, analytics, and
                            project management — each program completed end-to-end.
                        </p>
                    </div>
                </div>

                <div
                    data-testid="certifications-grid"
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline"
                >
                    {certifications.map((cert, i) => (
                        <article
                            key={cert.title}
                            data-testid={`certification-card-${i}`}
                            className="group relative bg-paper p-8 md:p-10 flex flex-col justify-between min-h-[280px] hover:bg-surface transition-colors duration-300"
                        >
                            <div>
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-11 h-11 border border-hairline flex items-center justify-center group-hover:bg-ink group-hover:border-ink transition-colors duration-300">
                                        <Award
                                            size={20}
                                            strokeWidth={1.5}
                                            className="text-klein group-hover:text-white transition-colors duration-300"
                                        />
                                    </div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted2 font-semibold">
                                        {String(i + 1).padStart(2, "0")}
                                    </p>
                                </div>

                                <p className="text-[10px] uppercase tracking-[0.25em] text-klein font-bold mb-3">
                                    {cert.category}
                                </p>
                                <h3 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight leading-tight mb-2">
                                    {cert.title}
                                </h3>
                                <p className="text-sm text-muted2 font-medium">
                                    {cert.issuer}
                                </p>
                            </div>

                            <a
                                href={cert.url}
                                data-testid={`certification-view-btn-${i}`}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="mt-8 inline-flex items-center justify-between gap-2 border border-ink bg-paper px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-white transition-colors duration-300"
                            >
                                <span>View Certificate</span>
                                <ArrowUpRight
                                    size={16}
                                    strokeWidth={2}
                                    className="group-hover:rotate-45 transition-transform duration-500"
                                />
                            </a>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
