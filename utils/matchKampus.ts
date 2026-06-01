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

// daftar provinsi unik dari data
export function getProvinsiList(): string[] {
  const set = new Set<string>();
  dataKampus.forEach((k) => {
    if (k.provinsi) set.add(k.provinsi);
  });
  return Array.from(set).sort();
}
