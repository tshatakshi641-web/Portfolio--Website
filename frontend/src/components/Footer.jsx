import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Instagram } from "lucide-react";
import { SALON, callLink, whatsappLink } from "@/lib/salon";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative mt-20 border-t border-[#E8E2D9]"
      style={{ background: "var(--bg-2)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-full bg-[#C87A63] text-white grid place-items-center font-serif-display text-xl">
              M
            </span>
            <div>
              <div className="font-serif-display text-2xl text-[#2A2A2A] leading-none">
                Meghaa's
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#C87A63] mt-0.5">
                Ladies Salon
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm text-[#5C5C5C] leading-relaxed">
            {SALON.shortDesc}
          </p>
        </div>

        <div>
          <h4 className="font-serif-display text-xl text-[#2A2A2A]">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/services" className="text-[#5C5C5C] hover:text-[#C87A63] transition-colors">Services</Link></li>
            <li><Link to="/gallery" className="text-[#5C5C5C] hover:text-[#C87A63] transition-colors">Gallery</Link></li>
            <li><Link to="/about" className="text-[#5C5C5C] hover:text-[#C87A63] transition-colors">About Megha</Link></li>
            <li><Link to="/reviews" className="text-[#5C5C5C] hover:text-[#C87A63] transition-colors">Reviews</Link></li>
            <li><Link to="/book" className="text-[#5C5C5C] hover:text-[#C87A63] transition-colors">Book Appointment</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif-display text-xl text-[#2A2A2A]">Visit</h4>
          <ul className="mt-4 space-y-3 text-sm text-[#5C5C5C]">
            <li className="flex gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-[#C87A63] flex-shrink-0" />
              <span>{SALON.address}</span>
            </li>
            <li className="flex gap-2">
              <Clock className="w-4 h-4 mt-0.5 text-[#C87A63] flex-shrink-0" />
              <span>
                {SALON.hoursWeekday}<br />Closed: {SALON.hoursClosed}
              </span>
            </li>
            <li className="flex gap-2">
              <Phone className="w-4 h-4 mt-0.5 text-[#C87A63] flex-shrink-0" />
              <a href={callLink()} className="hover:text-[#C87A63] transition-colors">
                {SALON.phone}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif-display text-xl text-[#2A2A2A]">Get in touch</h4>
          <div className="mt-4 flex flex-col gap-3">
            <a
              data-testid="footer-whatsapp"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-medium hover:opacity-90 transition"
            >
              WhatsApp Us
            </a>
            <a
              data-testid="footer-call"
              href={callLink()}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[#2A2A2A] text-[#2A2A2A] text-sm font-medium hover:bg-[#2A2A2A] hover:text-white transition"
            >
              Call {SALON.phone}
            </a>
            <a
              data-testid="footer-instagram"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#5C5C5C] hover:text-[#C87A63] transition"
            >
              <Instagram className="w-4 h-4" /> Follow on Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#5C5C5C]">
          <p>© {new Date().getFullYear()} Meghaa's Ladies Salon. All rights reserved.</p>
          <p>
            Crafted with care for our beautiful clients.
            {" · "}
            <Link to="/admin/login" className="hover:text-[#C87A63] transition" data-testid="footer-admin-link">
              Owner Login
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
