export const SALON = {
  name: "Meghaa's Ladies Salon",
  tagline: "Hair · Bridal · Skin · Nails",
  shortDesc:
    "A spacious ladies' salon in Mohan Garden offering haircuts, keratin treatments, hair spa and bridal makeup artistry — led by Megha.",
  phone: "+91 79825 74977",
  phoneDial: "+917982574977",
  whatsapp: "917982574977",
  whatsappMessage:
    "Hi Megha! I'd like to book an appointment at Meghaa's Ladies Salon.",
  address:
    "K1/79, Ext, Shani Bazar Road, near SBI ATM, Mohan Garden, Uttam Nagar, New Delhi, Delhi 110059",
  shortAddress: "Mohan Garden, Uttam Nagar, New Delhi",
  hoursWeekday: "10:45 AM – 9:00 PM",
  hoursClosed: "Tuesday",
  rating: 5.0,
  reviewsCount: 161,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Meghaa's+Ladies+Salon+Mohan+Garden",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Meghaa%27s+Ladies+Salon+Mohan+Garden+Uttam+Nagar&output=embed",
  established: "2022",
};

export const whatsappLink = () =>
  `https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent(SALON.whatsappMessage)}`;

export const callLink = () => `tel:${SALON.phoneDial}`;

export const formatINR = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
