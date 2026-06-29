import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Clock, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { api } from "@/lib/api";
import { formatINR } from "@/lib/salon";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/services")
      .then((r) => setServices(r.data))
      .finally(() => setLoading(false));
  }, []);

  const categories = Array.from(new Set(services.map((s) => s.category)));

  return (
    <div data-testid="services-page" className="pb-24">
      {/* Header */}
      <section className="pt-10 lg:pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <SectionHeading
            overline="Our menu"
            title="Honest pricing. Genuine products. Beautiful results."
            description="Every service is performed by our trained team using trusted brands. Pricing may vary slightly based on hair length & condition — your stylist will confirm before starting."
          />
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {loading ? (
            <p className="text-[#5C5C5C]">Loading our menu...</p>
          ) : (
            <Tabs defaultValue={categories[0]} className="w-full">
              <TabsList className="bg-[#F0ECE1] p-1.5 rounded-full inline-flex flex-wrap gap-1 h-auto mb-8">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    data-testid={`category-tab-${cat.replace(/\s+/g, "-").toLowerCase()}`}
                    className="rounded-full px-5 py-2 text-sm data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white text-[#2A2A2A]"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((cat) => (
                <TabsContent key={cat} value={cat} className="mt-0">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services
                      .filter((s) => s.category === cat)
                      .map((s, idx) => (
                        <div
                          key={s.id}
                          data-testid={`service-item-${idx}`}
                          className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-serif-display text-2xl text-[#2A2A2A] tracking-tight leading-tight">
                              {s.name}
                            </h3>
                            <span className="text-[10px] uppercase tracking-[0.18em] text-[#C87A63] whitespace-nowrap">
                              {s.category}
                            </span>
                          </div>
                          <p className="text-sm text-[#5C5C5C] mt-2 leading-relaxed flex-1">
                            {s.description}
                          </p>
                          <div className="mt-5 flex items-center justify-between">
                            <div>
                              <p className="font-serif-display text-2xl text-[#C87A63]">
                                {formatINR(s.price)}
                              </p>
                              <p className="text-xs text-[#5C5C5C] flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3" />
                                {s.duration_min} min
                              </p>
                            </div>
                            <Link to={`/book?service=${s.id}`} data-testid={`book-${idx}`}>
                              <Button className="rounded-full bg-[#2A2A2A] hover:bg-black text-white h-10 px-5 text-sm">
                                Book
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </section>

      <section className="mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="rounded-3xl p-8 lg:p-12 border border-[#E8E2D9]" style={{ background: "var(--bg-2)" }}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C87A63] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" /> Custom packages
                </p>
                <h3 className="font-serif-display text-3xl text-[#2A2A2A] mt-3">
                  Bridal & event packages
                </h3>
                <p className="text-[#5C5C5C] mt-2">
                  Planning a wedding, engagement or birthday? Let's create a custom package — Megha will personally style your look.
                </p>
              </div>
              <Link to="/contact" data-testid="custom-package-link">
                <Button className="rounded-full bg-[#C87A63] hover:bg-[#B3664F] text-white h-11 px-6">
                  Request a quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
