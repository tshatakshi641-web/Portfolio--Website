import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { SALON, callLink, whatsappLink } from "@/lib/salon";
import { api } from "@/lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast.error("Please fill name, phone & message");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/contact", form);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      toast.error("Could not send. Please try WhatsApp or call.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page" className="pb-24">
      <section className="pt-10 lg:pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <SectionHeading
            overline="Get in touch"
            title="Say hello — we'd love to host you."
            description="Drop us a message, give us a call, or just walk in. We're easy to find — right by SBI ATM, Shani Bazar Road."
          />
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 lg:p-10 border border-[#E8E2D9] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <h3 className="font-serif-display text-3xl text-[#2A2A2A]">Send us a message</h3>
            <p className="text-sm text-[#5C5C5C] mt-1">We typically reply within an hour during salon hours.</p>
            <form onSubmit={submit} className="mt-6 grid gap-4" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="c-name">Your name *</Label>
                  <Input
                    id="c-name"
                    data-testid="contact-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Megha"
                  />
                </div>
                <div>
                  <Label htmlFor="c-phone">Phone *</Label>
                  <Input
                    id="c-phone"
                    data-testid="contact-phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="98xxxxxxxx"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="c-email">Email (optional)</Label>
                <Input
                  id="c-email"
                  data-testid="contact-email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <Label htmlFor="c-msg">Message *</Label>
                <Textarea
                  id="c-msg"
                  data-testid="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What can we help you with?"
                />
              </div>
              <Button
                data-testid="contact-submit"
                disabled={submitting}
                type="submit"
                className="rounded-full bg-[#C87A63] hover:bg-[#B3664F] text-white h-12 px-7 w-fit"
              >
                {submitting ? "Sending..." : "Send message"}
              </Button>
            </form>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C87A63] mt-1" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#5C5C5C]">Address</p>
                  <p className="text-[#2A2A2A] mt-1">{SALON.address}</p>
                  <a
                    href={SALON.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-[#C87A63] mt-2 hover:underline"
                    data-testid="contact-map-link"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9]">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C87A63] mt-1" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#5C5C5C]">Hours</p>
                  <p className="text-[#2A2A2A] mt-1">{SALON.hoursWeekday}</p>
                  <p className="text-sm text-[#5C5C5C]">Closed on {SALON.hoursClosed}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a href={callLink()} data-testid="contact-call-btn" className="bg-[#2A2A2A] text-white rounded-2xl p-5 hover:bg-black transition-colors flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">Call</p>
                  <p className="text-sm font-medium">{SALON.phone}</p>
                </div>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-whatsapp-btn"
                className="bg-[#25D366] text-white rounded-2xl p-5 hover:opacity-90 transition flex items-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">WhatsApp</p>
                  <p className="text-sm font-medium">Quick chat</p>
                </div>
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#E8E2D9] aspect-[4/3]">
              <iframe
                title="Meghaa's Ladies Salon location"
                src={SALON.mapEmbedUrl}
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
