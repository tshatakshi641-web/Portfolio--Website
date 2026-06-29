import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CalendarIcon, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import SectionHeading from "@/components/SectionHeading";
import { api } from "@/lib/api";
import { formatINR } from "@/lib/salon";
import { format } from "date-fns";

const TIME_SLOTS = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00",
];

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    api.get("/services").then((r) => {
      setServices(r.data);
      const params = new URLSearchParams(location.search);
      const sid = params.get("service");
      if (sid && r.data.some((s) => s.id === sid)) {
        setSelected(new Set([sid]));
      }
    });
  }, [location.search]);

  const categories = useMemo(() => Array.from(new Set(services.map((s) => s.category))), [services]);

  const total = useMemo(() => {
    return services.filter((s) => selected.has(s.id)).reduce((sum, s) => sum + s.price, 0);
  }, [services, selected]);

  const totalMin = useMemo(() => {
    return services.filter((s) => selected.has(s.id)).reduce((sum, s) => sum + s.duration_min, 0);
  }, [services, selected]);

  const toggle = (id) => {
    setSelected((s) => {
      const ns = new Set(s);
      if (ns.has(id)) ns.delete(id);
      else ns.add(id);
      return ns;
    });
  };

  const submit = async () => {
    if (selected.size === 0) return toast.error("Pick at least one service");
    if (!date) return toast.error("Please choose a date");
    if (!time) return toast.error("Please choose a time");
    if (!form.name.trim() || !form.phone.trim()) return toast.error("Name & phone are required");

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        service_ids: Array.from(selected),
        date: format(date, "yyyy-MM-dd"),
        time,
      };
      const res = await api.post("/bookings", payload);
      setConfirmation(res.data);
      toast.success("Booking requested! Megha will confirm shortly.");
    } catch (e) {
      toast.error("Booking failed. Please try again or WhatsApp us.");
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <div className="pt-20 pb-24" data-testid="booking-confirmation">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <div className="w-20 h-20 rounded-full bg-[#F0ECE1] grid place-items-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-[#C87A63]" />
          </div>
          <h2 className="font-serif-display text-4xl text-[#2A2A2A] mt-6">You're booked in!</h2>
          <p className="text-[#5C5C5C] mt-3">
            We've received your appointment request. Megha will WhatsApp / call you to confirm shortly.
          </p>

          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] mt-8 text-left">
            <div className="flex justify-between text-sm text-[#5C5C5C]">
              <span>Booking ID</span>
              <span className="font-mono text-[#2A2A2A]">{confirmation.id.slice(0, 8).toUpperCase()}</span>
            </div>
            <div className="my-4 border-t border-[#F0ECE1]" />
            <p className="text-xs uppercase tracking-[0.18em] text-[#C87A63]">Services</p>
            <ul className="mt-2 space-y-1">
              {confirmation.service_names.map((n, i) => (
                <li key={i} className="text-[#2A2A2A]">• {n}</li>
              ))}
            </ul>
            <div className="my-4 border-t border-[#F0ECE1]" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#5C5C5C]">Date</p>
                <p className="text-[#2A2A2A] font-medium mt-0.5">{confirmation.date}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#5C5C5C]">Time</p>
                <p className="text-[#2A2A2A] font-medium mt-0.5">{confirmation.time}</p>
              </div>
            </div>
            <div className="my-4 border-t border-[#F0ECE1]" />
            <div className="flex justify-between items-baseline">
              <p className="text-sm text-[#5C5C5C]">Total</p>
              <p className="font-serif-display text-3xl text-[#C87A63]">{formatINR(confirmation.total_price)}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Button onClick={() => navigate("/")} data-testid="booking-home-btn" className="rounded-full bg-[#2A2A2A] hover:bg-black text-white h-11 px-6">
              Back to home
            </Button>
            <Button
              variant="outline"
              data-testid="booking-new-btn"
              onClick={() => {
                setConfirmation(null);
                setSelected(new Set());
                setDate(null);
                setTime("");
                setForm({ name: "", phone: "", email: "", notes: "" });
              }}
              className="rounded-full h-11 px-6 border-[#C87A63] text-[#C87A63] hover:bg-[#C87A63] hover:text-white"
            >
              Book another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="booking-page" className="pb-24">
      <section className="pt-10 lg:pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <SectionHeading
            overline="Book online"
            title="Reserve your spot in 30 seconds."
            description="Pick your services, choose your date & time, and tell us how to reach you. Megha will confirm by WhatsApp."
          />
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-12 gap-6">
          {/* Services */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E8E2D9] p-6 lg:p-8">
              <h3 className="font-serif-display text-2xl text-[#2A2A2A]">1. Choose services</h3>
              <p className="text-sm text-[#5C5C5C] mt-1">Pick one or more — total updates automatically.</p>
              <div className="mt-6 space-y-6">
                {categories.map((cat) => (
                  <div key={cat}>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C87A63] mb-3">{cat}</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {services.filter((s) => s.category === cat).map((s, i) => {
                        const active = selected.has(s.id);
                        return (
                          <label
                            key={s.id}
                            data-testid={`service-option-${i}-${cat.replace(/\s+/g, "-").toLowerCase()}`}
                            className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                              active
                                ? "border-[#C87A63] bg-[#FAF1ED]"
                                : "border-[#E8E2D9] bg-white hover:border-[#C87A63]/40"
                            }`}
                          >
                            <Checkbox
                              checked={active}
                              onCheckedChange={() => toggle(s.id)}
                              className="mt-1 data-[state=checked]:bg-[#C87A63] data-[state=checked]:border-[#C87A63]"
                            />
                            <div className="flex-1">
                              <div className="flex items-baseline justify-between gap-3">
                                <p className="font-medium text-[#2A2A2A]">{s.name}</p>
                                <p className="text-sm font-semibold text-[#C87A63] whitespace-nowrap">
                                  {formatINR(s.price)}
                                </p>
                              </div>
                              <p className="text-xs text-[#5C5C5C] mt-1 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {s.duration_min} min
                              </p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#E8E2D9] p-6 lg:p-8">
              <h3 className="font-serif-display text-2xl text-[#2A2A2A]">2. Pick date & time</h3>
              <div className="grid md:grid-cols-2 gap-5 mt-5">
                <div>
                  <Label className="mb-2 block">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        data-testid="booking-date-trigger"
                        variant="outline"
                        className="w-full justify-start rounded-xl h-12 border-[#E8E2D9] bg-white"
                      >
                        <CalendarIcon className="w-4 h-4 mr-2 text-[#C87A63]" />
                        {date ? format(date, "PPP") : "Choose date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => {
                          const t = new Date();
                          t.setHours(0, 0, 0, 0);
                          return d < t || d.getDay() === 2; // Tuesday closed
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label className="mb-2 block">Time</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger data-testid="booking-time-trigger" className="rounded-xl h-12 border-[#E8E2D9] bg-white">
                      <SelectValue placeholder="Choose time" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {TIME_SLOTS.map((t) => (
                        <SelectItem key={t} value={t} data-testid={`time-slot-${t}`}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#E8E2D9] p-6 lg:p-8">
              <h3 className="font-serif-display text-2xl text-[#2A2A2A]">3. Your details</h3>
              <div className="grid sm:grid-cols-2 gap-4 mt-5">
                <div>
                  <Label htmlFor="b-name">Full name *</Label>
                  <Input id="b-name" data-testid="booking-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="b-phone">Phone (WhatsApp) *</Label>
                  <Input id="b-phone" data-testid="booking-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="b-email">Email (optional)</Label>
                  <Input id="b-email" data-testid="booking-email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="b-notes">Notes / special requests</Label>
                  <Textarea id="b-notes" data-testid="booking-notes" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Anything we should know? E.g. hair length, allergies, preferred stylist." />
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 bg-white rounded-3xl border border-[#E8E2D9] p-6 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C87A63]">Your booking</p>
              <h3 className="font-serif-display text-3xl text-[#2A2A2A] mt-2">Summary</h3>

              <div className="mt-6 space-y-2 min-h-[100px]">
                {selected.size === 0 && (
                  <p className="text-sm text-[#5C5C5C]">No services selected yet.</p>
                )}
                {services.filter((s) => selected.has(s.id)).map((s) => (
                  <div key={s.id} className="flex justify-between text-sm">
                    <span className="text-[#2A2A2A]">{s.name}</span>
                    <span className="text-[#5C5C5C]">{formatINR(s.price)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-[#F0ECE1] pt-5">
                <div className="flex justify-between text-sm text-[#5C5C5C]">
                  <span>Estimated duration</span>
                  <span>{totalMin} min</span>
                </div>
                <div className="flex justify-between items-baseline mt-3">
                  <span className="text-[#2A2A2A] text-lg">Total</span>
                  <span className="font-serif-display text-4xl text-[#C87A63]">{formatINR(total)}</span>
                </div>
              </div>

              <Button
                data-testid="booking-submit"
                disabled={submitting}
                onClick={submit}
                className="w-full mt-6 rounded-full bg-[#C87A63] hover:bg-[#B3664F] text-white h-13 py-3.5 text-base"
              >
                {submitting ? "Booking..." : "Confirm appointment"}
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </Button>
              <p className="text-xs text-[#5C5C5C] mt-3 text-center">
                No payment now. Megha will WhatsApp / call you to confirm.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
