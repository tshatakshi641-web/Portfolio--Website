import SectionHeading from "@/components/SectionHeading";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1546877625-cb8c71916608?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHx3b21hbiUyMGJlYXV0aWZ1bCUyMGhhaXIlMjBzdHlsaW5nJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzgyNzY0ODA5fDA&ixlib=rb-4.1.0&q=85&w=900", alt: "Hair styling — Meghaa's Salon", span: "md:col-span-2 md:row-span-2" },
  { src: "https://images.pexels.com/photos/36519701/pexels-photo-36519701.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=700", alt: "Bridal portrait", span: "" },
  { src: "https://images.unsplash.com/photo-1779636198585-658170ee0283?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwyfHxwZWRpY3VyZSUyMG1hbmljdXJlJTIwbmFpbCUyMGFydHxlbnwwfHx8fDE3ODI3NjQ4MjZ8MA&ixlib=rb-4.1.0&q=85&w=700", alt: "Nail care", span: "" },
  { src: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3BhJTIwdHJlYXRtZW50JTIwd2FzaGluZ3xlbnwwfHx8fDE3ODI3NjQ4MjZ8MA&ixlib=rb-4.1.0&q=85&w=900", alt: "Hair spa treatment", span: "md:col-span-2" },
  { src: "https://images.pexels.com/photos/20044503/pexels-photo-20044503.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=700", alt: "Bridal portrait B&W", span: "" },
  { src: "https://images.pexels.com/photos/7195811/pexels-photo-7195811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=700", alt: "Salon interior", span: "" },
  { src: "https://images.unsplash.com/photo-1636153279424-cb5d1e00f5a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJlYXV0aWZ1bCUyMGhhaXIlMjBzdHlsaW5nJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzgyNzY0ODA5fDA&ixlib=rb-4.1.0&q=85&w=700", alt: "Hair styling portrait", span: "" },
  { src: "https://images.unsplash.com/photo-1637777269308-6a072f24e8a4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBoYWlyJTIwc2Fsb24lMjBpbnRlcmlvciUyMGJyaWdodHxlbnwwfHx8fDE3ODI3NjQ4MDl8MA&ixlib=rb-4.1.0&q=85&w=900", alt: "Salon chairs", span: "md:col-span-2" },
];

export default function GalleryPage() {
  return (
    <div data-testid="gallery-page" className="pb-24">
      <section className="pt-10 lg:pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <SectionHeading
            overline="Gallery"
            title="A peek inside Meghaa's."
            description="A look at our salon, our work, and the smiles that walk out our door. New looks added every month."
          />
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 lg:gap-4">
            {IMAGES.map((img, i) => (
              <div
                key={i}
                data-testid={`gallery-item-${i}`}
                className={`relative overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white group ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
