import { Phone, MessageCircle } from "lucide-react";
import { callLink, whatsappLink } from "@/lib/salon";

export default function StickyCTA() {
  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-3" data-testid="sticky-cta">
      <a
        data-testid="sticky-whatsapp"
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-[0_12px_30px_rgba(37,211,102,0.45)] hover:scale-105 transition-transform"
        aria-label="WhatsApp Meghaa's Salon"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      <a
        data-testid="sticky-call"
        href={callLink()}
        className="w-14 h-14 rounded-full bg-[#C87A63] text-white grid place-items-center shadow-[0_12px_30px_rgba(200,122,99,0.45)] hover:scale-105 transition-transform"
        aria-label="Call Meghaa's Salon"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
