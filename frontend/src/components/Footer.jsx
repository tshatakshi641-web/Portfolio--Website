import { profile } from "../data/portfolio";

export const Footer = () => {
    return (
        <footer
            data-testid="site-footer"
            className="bg-ink text-white border-t border-white/10"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
                <p>© {new Date().getFullYear()} {profile.name}</p>
                <p className="font-display font-black text-white">
                    Designed & built with care.
                </p>
                <a
                    data-testid="footer-back-top"
                    href="#top"
                    className="hover:text-white transition-colors"
                >
                    Back to top ↑
                </a>
            </div>
        </footer>
    );
};
