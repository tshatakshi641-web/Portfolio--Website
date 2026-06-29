import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import SectionHeading from "@/components/SectionHeading";
import StarRow from "@/components/StarRow";
import { api } from "@/lib/api";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", rating: 5, text: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = () => {
    setLoading(true);
    api
      .get("/reviews")
      .then((r) => setReviews(r.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const submit = async () => {
    if (!form.name.trim() || !form.text.trim()) {
      toast.error("Please add your name and review");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/reviews", form);
      toast.success("Thank you for your review!");
      setOpen(false);
      setForm({ name: "", rating: 5, text: "" });
      fetchReviews();
    } catch (e) {
      toast.error("Could not submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="reviews-page" className="pb-24">
      <section className="pt-10 lg:pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeading
            overline="Hear from our clients"
            title="5.0 on Google. ♥ in real life."
            description="161+ verified Google reviews and a community that keeps coming back. Read what they say — or add your own."
          />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button data-testid="add-review-btn" className="rounded-full bg-[#C87A63] hover:bg-[#B3664F] text-white h-11 px-6 self-start lg:self-end">
                Write a review
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white rounded-2xl">
              <DialogHeader>
                <DialogTitle className="font-serif-display text-2xl text-[#2A2A2A]">Share your experience</DialogTitle>
                <DialogDescription>Your review helps other clients find Meghaa's Salon.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="r-name">Your name</Label>
                  <Input
                    id="r-name"
                    data-testid="review-name-input"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Priya"
                  />
                </div>
                <div>
                  <Label>Rating</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        data-testid={`rating-star-${n}`}
                        onClick={() => setForm((f) => ({ ...f, rating: n }))}
                        className="p-1"
                      >
                        <StarRow rating={n <= form.rating ? 5 : 0} size={22} />
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-[#5C5C5C] mt-1">{form.rating} of 5</p>
                </div>
                <div>
                  <Label htmlFor="r-text">Review</Label>
                  <Textarea
                    id="r-text"
                    data-testid="review-text-input"
                    rows={4}
                    value={form.text}
                    onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                    placeholder="Tell us what you loved..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  data-testid="submit-review-btn"
                  disabled={submitting}
                  onClick={submit}
                  className="rounded-full bg-[#2A2A2A] hover:bg-black text-white"
                >
                  {submitting ? "Posting..." : "Post review"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {loading ? (
            <p className="text-[#5C5C5C]">Loading reviews...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.map((r, i) => (
                <div
                  key={r.id || i}
                  data-testid={`review-card-${i}`}
                  className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                >
                  <StarRow rating={r.rating} />
                  <p className="mt-4 text-[#2A2A2A] leading-relaxed">"{r.text}"</p>
                  <div className="mt-5 pt-5 border-t border-[#F0ECE1] flex items-center justify-between">
                    <p className="text-sm font-medium text-[#2A2A2A]">{r.name}</p>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C87A63]">{r.source}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
