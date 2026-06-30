import { bio, profile } from "../data/portfolio";

export const About = () => {
    return (
        <section
            id="about"
            data-testid="about-section"
            className="border-t border-hairline bg-surface"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 grid md:grid-cols-12 gap-10">
                <div className="md:col-span-4">
                    <p className="text-xs tracking-[0.3em] uppercase font-bold text-klein mb-6">
                        / 01 — About
                    </p>
                    <div className="aspect-[4/5] overflow-hidden border border-hairline bg-paper">
                        <img
                            data-testid="about-image"
                            src="https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlJTIwZ2VvbWV0cnl8ZW58MHx8fHwxNzgyODE0OTM3fDA&ixlib=rb-4.1.0&q=85"
                            alt="Architecture of operations"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted2">
                        Operations is architecture for businesses.
                    </p>
                </div>

                <div className="md:col-span-8 flex flex-col justify-center">
                    <h2 className="font-display font-black uppercase tracking-tight text-4xl md:text-6xl text-ink leading-[1.02] mb-10">
                        I build clarity <br className="hidden md:block" />
                        out of <span className="text-klein italic font-serif" style={{ fontFamily: "'Outfit', serif" }}>complexity.</span>
                    </h2>
                    <p
                        data-testid="about-bio"
                        className="text-base md:text-lg text-muted2 leading-relaxed max-w-2xl mb-10"
                    >
                        {bio}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-hairline">
                        {[
                            ["Email", profile.email, true],
                            ["Phone", profile.phone, false],
                            ["Status", "MBA Student", false],
                            ["Open to", "Full-time", false],
                        ].map(([label, value, isMail]) => (
                            <div
                                key={label}
                                className="p-5 border-r border-b border-hairline"
                            >
                                <p className="text-[10px] uppercase tracking-[0.2em] text-muted2 mb-2">
                                    {label}
                                </p>
                                {isMail ? (
                                    <a
                                        href={`mailto:${value}`}
                                        data-testid="about-email-link"
                                        className="text-sm font-semibold text-ink hover:text-klein break-all"
                                    >
                                        {value}
                                    </a>
                                ) : (
                                    <p className="text-sm font-semibold text-ink break-all">
                                        {value}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
