// --- tipe data ---
export type RiasecCategory =
  | "Realistic"
  | "Investigative"
  | "Artistic"
  | "Social"
  | "Enterprising"
  | "Conventional";

export interface QuizQuestion {
  id: number;
  category: RiasecCategory;
  text: string;
}

// --- data soal dummy ---
export const quizQuestions: QuizQuestion[] = [
  { id: 1, category: "Realistic", text: "Saya senang bekerja dengan alat dan mesin." },
  { id: 2, category: "Realistic", text: "Saya suka memperbaiki atau merakit sesuatu." },
  {
    id: 3,
    category: "Investigative",
    text: "Saya suka memecahkan teka-teki atau masalah yang kompleks.",
  },
  {
    id: 4,
    category: "Investigative",
    text: "Saya suka melakukan riset sebelum mengambil keputusan penting.",
  },
  {
    id: 5,
    category: "Artistic",
    text: "Saya suka mengekspresikan diri melalui seni, musik, atau tulisan.",
  },
  { id: 6, category: "Social", text: "Saya senang membantu orang lain mengatasi masalah mereka." },
  {
    id: 7,
    category: "Social",
    text: "Saya suka mengajar atau menjelaskan sesuatu kepada orang lain.",
  },
  { id: 8, category: "Enterprising", text: "Saya suka memimpin dan mengarahkan orang lain." },
  {
    id: 9,
    category: "Conventional",
    text: "Saya suka bekerja dengan data, angka, dan laporan yang terstruktur.",
  },
  {
    id: 10,
    category: "Conventional",
    text: "Saya teliti dan memperhatikan detail dalam setiap pekerjaan saya.",
  },
];

// --- warna per kategori ---
export const categoryColors: Record<RiasecCategory, string> = {
  Realistic: "bg-[#e8f5e9] text-[#1b5e20]",
  Investigative: "bg-[#e3f2fd] text-[#0d47a1]",
  Artistic: "bg-[#fce4ec] text-[#880e4f]",
  Social: "bg-[#fff3e0] text-[#e65100]",
  Enterprising: "bg-[#f3e5f5] text-[#4a148c]",
  Conventional: "bg-[#e0f2f1] text-[#004d40]",
};

export const totalQuestions = 99;
