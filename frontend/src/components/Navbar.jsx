import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#certifications", label: "Certifications" },
    { href: "#achievements", label: "Achievements" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            data-testid="site-navbar"
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-white/85 backdrop-blur-md border-b border-hairline"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                <a
                    href="#top"
                    data-testid="navbar-logo"
                    className="font-display font-black tracking-tight text-lg text-ink"
                >
                    ST<span className="text-klein">.</span>
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            data-testid={`nav-${l.label.toLowerCase()}`}
                            className="text-sm font-medium text-muted2 hover:text-ink transition-colors link-underline"
                        >
                            {l.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        data-testid="nav-cta-hire"
                        className="text-sm font-semibold bg-ink text-white px-4 py-2 hover:bg-klein transition-colors"
                    >
                        Hire me →
                    </a>
                </nav>

                <button
                    data-testid="nav-mobile-toggle"
                    aria-label="Toggle menu"
                    onClick={() => setOpen((o) => !o)}
                    className="md:hidden p-2 text-ink"
                >
                    {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
                </button>
            </div>

            {open && (
                <div
                    data-testid="nav-mobile-panel"
                    className="md:hidden border-t border-hairline bg-white"
                >
                    <div className="px-6 py-4 flex flex-col gap-3">
                        {links.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                data-testid={`nav-mobile-${l.label.toLowerCase()}`}
                                onClick={() => setOpen(false)}
                                className="py-2 text-base font-medium text-ink border-b border-hairline last:border-0"
                            >
                                {l.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};
