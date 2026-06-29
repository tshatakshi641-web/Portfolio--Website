export default function SectionHeading({ overline, title, description, align = "left", className = "" }) {
  return (
    <div
      className={`${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"} ${className}`}
    >
      {overline && (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C87A63]">
          {overline}
        </p>
      )}
      <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05] mt-3 text-[#2A2A2A]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#5C5C5C] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
