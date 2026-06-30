import { GraduationCap } from "lucide-react";
import { education } from "../data/portfolio";

export const Education = () => {
    return (
        <section
            id="education"
            data-testid="education-section"
            className="border-t border-hairline bg-surface"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
                <div className="grid md:grid-cols-12 gap-10 mb-16">
                    <div className="md:col-span-4">
                        <p className="text-xs tracking-[0.3em] uppercase font-bold text-klein mb-4">
                            / 05 — Education
                        </p>
                    </div>
                    <div className="md:col-span-8">
                        <h2 className="font-display font-black uppercase tracking-tight text-4xl md:text-6xl text-ink leading-[1.02]">
                            Academic <br className="hidden md:block" /> foundation.
                        </h2>
                    </div>
                </div>

                <div className="border-t border-hairline">
                    {education.map((e, i) => (
                        <div
                            key={e.degree}
                            data-testid={`education-item-${i}`}
                            className="grid md:grid-cols-12 gap-6 py-10 border-b border-hairline items-center"
                        >
                            <div className="md:col-span-1">
                                <div className="w-12 h-12 border border-ink flex items-center justify-center">
                                    <GraduationCap size={20} strokeWidth={1.5} className="text-ink" />
                                </div>
                            </div>
                            <div className="md:col-span-7">
                                <h3 className="font-display font-bold text-2xl md:text-3xl text-ink tracking-tight">
                                    {e.degree}
                                </h3>
                                <p className="text-base text-muted2 mt-1">{e.institute}</p>
                            </div>
                            <div className="md:col-span-4 md:text-right">
                                <p className="text-xs uppercase tracking-[0.2em] text-klein font-semibold">
                                    {e.period}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
