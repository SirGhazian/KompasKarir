import { dataKampus, type KampusEntry } from "./dataKampus";

// cari kampus yang programStudi cocok (case-insensitive, partial match)
export function matchProdiToKampus(programName: string): KampusEntry[] {
  const keyword = programName.toLowerCase().trim();
  return dataKampus.filter(
    (k) =>
      k.programStudi.toLowerCase().includes(keyword) ||
      keyword.includes(k.programStudi.toLowerCase()),
  );
}

// ambil range ukt (min dan max, exclude null/0)
export function getUktRange(ukt: (number | null)[]): { min: number; max: number } | null {
  const valid = ukt.filter((v): v is number => v !== null && v > 0);
  if (valid.length === 0) return null;
  return { min: Math.min(...valid), max: Math.max(...valid) };
}

// format angka ke rupiah
export function formatRupiah(num: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
}

// extract kota dari string lokasi (ambil bagian sebelum kode pos)
export function extractKota(lokasi: string): string {
  // format umum: "..., Kota/Kab, Provinsi, KodePos"
  const parts = lokasi.split(",").map((s) => s.trim());
  // cari bagian yang mengandung nama kota cuyyy
  if (parts.length >= 3) {
    // ambil 2 bagian terakhir sebelum kode pos
    const filtered = parts.filter((p) => !/^\d{5}$/.test(p)); // hapus kode pos
    if (filtered.length >= 2) {
      return filtered.slice(-2).join(", ");
    }
  }
  return lokasi.length > 50 ? lokasi.slice(0, 50) + "..." : lokasi;
}
