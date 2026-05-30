// --- info tipe RIASEC (nama + deskripsi per huruf) ---

export interface TipeInfo {
  nama: string;
  deskripsi: string;
}

const riasecInfo: Record<string, TipeInfo> = {
  R: {
    nama: "Realistic",
    deskripsi:
      "Kamu praktis, menyukai aktivitas fisik, dan senang bekerja dengan alat, mesin, atau di luar ruangan. Kamu menghargai keterampilan teknis dan hasil kerja yang nyata.",
  },
  I: {
    nama: "Investigative",
    deskripsi:
      "Kamu cenderung analitis, penasaran, dan logis. Kamu menikmati proses berpikir kritis, meneliti, dan memecahkan masalah yang kompleks. Lingkungan belajar yang ideal bagimu adalah yang memberikan kebebasan untuk mengeksplorasi ide secara mendalam.",
  },
  A: {
    nama: "Artistic",
    deskripsi:
      "Kamu kreatif, imajinatif, dan ekspresif. Kamu menyukai kebebasan berkarya melalui seni, musik, tulisan, atau desain, dan lebih nyaman di lingkungan yang tidak kaku.",
  },
  S: {
    nama: "Social",
    deskripsi:
      "Kamu empatik, suka membantu, dan pandai berkomunikasi. Kamu menikmati kegiatan mengajar, membimbing, atau merawat orang lain.",
  },
  E: {
    nama: "Enterprising",
    deskripsi:
      "Kamu persuasif, percaya diri, dan berjiwa pemimpin. Kamu menyukai tantangan mengelola, memengaruhi, dan mencapai tujuan bersama orang lain.",
  },
  C: {
    nama: "Conventional",
    deskripsi:
      "Kamu teliti, terorganisir, dan menyukai keteraturan. Kamu nyaman bekerja dengan data, angka, dan prosedur yang jelas serta terstruktur.",
  },
};

// helper: ambil info tipe berdasarkan huruf (R/I/A/S/E/C)
export function getTipeInfo(huruf: string): TipeInfo {
  const key = huruf?.toUpperCase();
  return (
    riasecInfo[key] ?? {
      nama: "Tidak diketahui",
      deskripsi: "Data tipe kepribadian tidak tersedia.",
    }
  );
}
