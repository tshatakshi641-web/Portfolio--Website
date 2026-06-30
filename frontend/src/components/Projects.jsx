import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/portfolio";

const projectImages = [
    "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlJTIwZ2VvbWV0cnl8ZW58MHx8fHwxNzgyODE0OTM3fDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1738844153732-a485f0e78382?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwyfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlJTIwZ2VvbWV0cnl8ZW58MHx8fHwxNzgyODE0OTM3fDA&ixlib=rb-4.1.0&q=85",
];

export const Projects = () => {
    return (
        <section
            id="projects"
            data-testid="projects-section"
            className="border-t border-hairline bg-paper"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
                <div className="grid md:grid-cols-12 gap-10 mb-16">
                    <div className="md:col-span-4">
                        <p className="text-xs tracking-[0.3em] uppercase font-bold text-klein mb-4">
                            / 06 — Selected Work
                        </p>
                    </div>
                    <div className="md:col-span-8">
                        <h2 className="font-display font-black uppercase tracking-tight text-4xl md:text-6xl text-ink leading-[1.02]">
                            Things I&apos;ve built <br className="hidden md:block" />
                            <span className="italic font-serif" style={{ fontFamily: "'Outfit', serif" }}>
                                & studied.
                            </span>
                        </h2>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-px bg-hairline border border-hairline">
                    {projects.map((p, i) => (
                        <article
                            key={p.title}
                            data-testid={`project-card-${i}`}
                            className="group bg-paper p-8 md:p-10 flex flex-col gap-6 hover:bg-surface transition-colors duration-500"
                        >
                            <div className="aspect-[16/10] overflow-hidden border border-hairline bg-surface-alt">
                                <img
                                    src={projectImages[i % projectImages.length]}
                                    alt={p.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                />
                            </div>

                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted2">
                                <span>{p.tag}</span>
                                <span>0{i + 1} / 0{projects.length}</span>
                            </div>

                            <h3 className="font-display font-bold text-2xl md:text-3xl text-ink leading-tight tracking-tight">
                                {p.title}
                            </h3>
                            <p className="text-base text-muted2 leading-relaxed flex-1">
                                {p.description}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-2 border-t border-hairline mt-auto">
                                {p.stack.map((s) => (
                                    <span
                                        key={s}
                                        className="text-xs px-3 py-1.5 border border-hairline text-muted2 font-medium"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
