// --- tipe data ---
export type RiasecCategory =
  | "Realistic"
  | "Investigative"
  | "Artistic"
  | "Social"
  | "Enterprising"
  | "Conventional";

// --- warna per kategori (dipakai di halaman tentang) ---
export const categoryColors: Record<RiasecCategory, string> = {
  Realistic: "bg-[#e8f5e9] text-[#1b5e20]",
  Investigative: "bg-[#e3f2fd] text-[#0d47a1]",
  Artistic: "bg-[#fce4ec] text-[#880e4f]",
  Social: "bg-[#fff3e0] text-[#e65100]",
  Enterprising: "bg-[#f3e5f5] text-[#4a148c]",
  Conventional: "bg-[#e0f2f1] text-[#004d40]",
};
