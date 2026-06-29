import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl border-b border-[#E8E2D9]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-full bg-[#C87A63] text-white grid place-items-center font-serif-display text-xl">M</span>
          <div className="leading-tight">
            <div className="font-serif-display text-xl tracking-tight text-[#2A2A2A]">
              Meghaa's
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#C87A63] -mt-0.5">
              Ladies Salon
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#2A2A2A] text-white"
                    : "text-[#2A2A2A] hover:bg-[#F0ECE1]"
                }`
              }
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/book" data-testid="nav-book-button">
            <Button className="rounded-full bg-[#C87A63] hover:bg-[#B3664F] text-white px-6 h-11">
              <Sparkles className="w-4 h-4 mr-1.5" />
              Book Now
            </Button>
          </Link>
        </div>

        <button
          data-testid="mobile-menu-toggle"
          className="lg:hidden w-11 h-11 rounded-full bg-white border border-[#E8E2D9] grid place-items-center"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-[#E8E2D9]" data-testid="mobile-menu">
          <div className="px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`mobile-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[#2A2A2A] text-white"
                      : "text-[#2A2A2A] hover:bg-[#F0ECE1]"
                  }`
                }
                end={l.to === "/"}
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/book" data-testid="mobile-book-button" className="mt-2">
              <Button className="w-full rounded-full bg-[#C87A63] hover:bg-[#B3664F] text-white h-12">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
