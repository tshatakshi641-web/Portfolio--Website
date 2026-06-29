import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { Heart, Sparkles, Shield, Smile } from "lucide-react";
import { SALON } from "@/lib/salon";

const OWNER_IMG =
  "https://images.unsplash.com/photo-1679138118375-47f78db3761d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwyfHxzbWlsaW5nJTIwaW5kaWFuJTIwZmVtYWxlJTIwYnVzaW5lc3MlMjBvd25lciUyMHBvcnRyYWl0fGVufDB8fHx8MTc4Mjc2NDgyNnww&ixlib=rb-4.1.0&q=85&w=900";

const VALUES = [
  { icon: Sparkles, title: "Genuine products only", text: "We use trusted, authentic brands for colour, keratin and care." },
  { icon: Shield, title: "Hygienic & clean", text: "Sanitised tools, single-use disposables, fresh towels for every client." },
  { icon: Heart, title: "Women-only space", text: "A safe, welcoming salon designed for the comfort of women & children." },
  { icon: Smile, title: "Honest pricing", text: "No hidden costs. Your stylist will confirm price before starting." },
];

export default function AboutPage() {
  return (
    <div data-testid="about-page" className="pb-24">
      <section className="pt-10 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 reveal">
            <SectionHeading
              overline="Our story"
              title={`Meet Megha — \nthe heart of the salon.`}
              description={`Meghaa's Ladies Salon was started with one simple promise: to give every woman a salon that feels like home. Megha personally trains her team, picks every product on the shelf, and greets every guest at the door.`}
            />
            <p className="mt-5 text-[#5C5C5C] leading-relaxed">
              From a small chair to a full-service salon in Mohan Garden, this journey has been built on one client at a time — keratin treatments that actually last, bridal looks that turn heads, and the kind of warm conversation that turns clients into family.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <Link to="/book" data-testid="about-book-link">
                <Button className="rounded-full bg-[#C87A63] hover:bg-[#B3664F] text-white h-12 px-7">
                  Book with Megha
                </Button>
              </Link>
              <Link to="/services" data-testid="about-services-link">
                <Button variant="outline" className="rounded-full h-12 px-7 border-[#2A2A2A] text-[#2A2A2A] hover:bg-[#2A2A2A] hover:text-white">
                  Browse services
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-[28px] overflow-hidden aspect-[4/5] shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
              <img src={OWNER_IMG} alt="Megha — founder of Meghaa's Ladies Salon" className="w-full h-full object-cover" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/85 backdrop-blur-xl rounded-2xl p-4 border border-white/60">
                <p className="text-xs uppercase tracking-[0.2em] text-[#C87A63]">Founder & Stylist</p>
                <p className="font-serif-display text-2xl text-[#2A2A2A] mt-1">Megha</p>
                <p className="text-sm text-[#5C5C5C] mt-1">Hair, Bridal & Makeup specialist · {SALON.established}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: "var(--bg-2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <SectionHeading
            align="center"
            overline="What we stand for"
            title="The little things that make a big difference."
            description="Our values shape every guest experience — from a quick threading visit to a full bridal day."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                data-testid={`value-card-${i}`}
                className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              >
                <div className="w-12 h-12 rounded-full bg-[#F0ECE1] grid place-items-center">
                  <v.icon className="w-5 h-5 text-[#C87A63]" />
                </div>
                <h3 className="font-serif-display text-xl text-[#2A2A2A] mt-4">{v.title}</h3>
                <p className="text-sm text-[#5C5C5C] mt-2 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="bg-[#2A2A2A] text-white rounded-3xl p-10 lg:p-14 relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#C87A63]/30 blur-3xl" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4A373] relative">A note from Megha</p>
            <p className="font-serif-display text-2xl sm:text-3xl lg:text-4xl leading-snug mt-4 relative">
              "Walk in tired, walk out glowing. That's the only promise I make to every guest who chooses us."
            </p>
            <p className="mt-6 text-white/70 relative">— Megha, Founder</p>
          </div>
        </div>
      </section>
    </div>
  );
}
