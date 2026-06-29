import { Star } from "lucide-react";

export default function StarRow({ rating = 5, size = 16, className = "" }) {
  return (
    <div className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating} of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={i < rating ? "fill-[#C87A63] text-[#C87A63]" : "text-[#E8E2D9] fill-[#E8E2D9]"}
        />
      ))}
    </div>
  );
}
