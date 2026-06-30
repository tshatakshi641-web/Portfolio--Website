import { ArrowUpRight, Mail, Linkedin, Github, FileDown } from "lucide-react";
import { profile } from "../data/portfolio";

export const Contact = () => {
    const subject = encodeURIComponent("Opportunity / Inquiry — via Portfolio");
    const body = encodeURIComponent(
        "Hi Shatakshi,\n\nI came across your portfolio and would like to discuss an opportunity.\n\n"
    );
    const mailtoHref = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    return (
        <section
            id="contact"
            data-testid="contact-section"
            className="border-t border-hairline bg-ink text-white"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
                <p className="text-xs tracking-[0.3em] uppercase font-bold text-klein mb-8">
                    / 06 — Let&apos;s talk
                </p>

                <h2 className="font-display font-black uppercase tracking-[-0.04em] leading-[0.9] mb-12">
                    <span className="block text-[14vw] md:text-[12vw]">
                        Let&apos;s <span className="italic font-serif" style={{ fontFamily: "'Outfit', serif" }}>talk.</span>
                    </span>
                </h2>

                <div className="grid md:grid-cols-12 gap-10 mb-16">
                    <div className="md:col-span-7">
                        <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
                            I&apos;m currently looking for full-time opportunities in{" "}
                            <span className="text-white font-semibold">
                                {profile.seeking.join(", ")}
                            </span>
                            . The fastest way to reach me is over email — I usually reply
                            within a day.
                        </p>
                    </div>
                    <div className="md:col-span-5 flex md:justify-end items-end">
                        <a
                            data-testid="contact-resume-btn"
                            href={profile.resumeUrl}
                            download
                            className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white hover:text-ink transition-colors"
                        >
                            <FileDown size={16} strokeWidth={1.5} /> Download Resume
                        </a>
                    </div>
                </div>

                {/* Massive email link */}
                <a
                    data-testid="contact-email-link"
                    href={mailtoHref}
                    className="group block border-t border-white/20 py-10 hover:bg-klein transition-colors duration-500"
                >
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-3">
                                Email me
                            </p>
                            <p className="font-display font-black uppercase tracking-tight text-3xl md:text-6xl break-all leading-none">
                                {profile.email}
                            </p>
                        </div>
                        <ArrowUpRight
                            size={56}
                            strokeWidth={1}
                            className="shrink-0 group-hover:rotate-45 transition-transform duration-500"
                        />
                    </div>
                </a>

                {/* Social row */}
                <div className="border-t border-white/20 mt-px pt-10 grid sm:grid-cols-3 gap-6">
                    <a
                        data-testid="contact-linkedin-link"
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between border-b border-white/20 pb-4 hover:border-klein transition-colors"
                    >
                        <span className="flex items-center gap-3 text-base font-medium">
                            <Linkedin size={18} strokeWidth={1.5} /> LinkedIn
                        </span>
                        <ArrowUpRight
                            size={18}
                            strokeWidth={1.5}
                            className="group-hover:rotate-45 transition-transform"
                        />
                    </a>
                    <a
                        data-testid="contact-github-link"
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between border-b border-white/20 pb-4 hover:border-klein transition-colors"
                    >
                        <span className="flex items-center gap-3 text-base font-medium">
                            <Github size={18} strokeWidth={1.5} /> GitHub
                        </span>
                        <ArrowUpRight
                            size={18}
                            strokeWidth={1.5}
                            className="group-hover:rotate-45 transition-transform"
                        />
                    </a>
                    <a
                        data-testid="contact-email-row"
                        href={mailtoHref}
                        className="group flex items-center justify-between border-b border-white/20 pb-4 hover:border-klein transition-colors"
                    >
                        <span className="flex items-center gap-3 text-base font-medium">
                            <Mail size={18} strokeWidth={1.5} /> Email
                        </span>
                        <ArrowUpRight
                            size={18}
                            strokeWidth={1.5}
                            className="group-hover:rotate-45 transition-transform"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
};
