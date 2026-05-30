"use client";

import NumberInput from "@/components/ui/NumberInput";
import { FaArrowRight } from "react-icons/fa";
import { FaLanguage, FaCalculator, FaFlask, FaUsers, FaPalette, FaSpinner } from "react-icons/fa6";

// --- tipe data nilai ---
export interface NilaiAkademik {
  bahasaIndonesia: string;
  bahasaInggris: string;
  matematika: string;
  informatika: string;
  ipa: string;
  ips: string;
  ppkn: string;
  penjas: string;
  seni: string;
}

// --- data kategori mata pelajaran ---
const kategoriNilai = [
  {
    id: "bahasa",
    label: "Bahasa",
    icon: FaLanguage,
    aksen: "#0d47a1",
    aksenBg: "#e3f2fd",
    mapel: [
      { key: "bahasaIndonesia" as keyof NilaiAkademik, label: "Bahasa Indonesia" },
      { key: "bahasaInggris" as keyof NilaiAkademik, label: "Bahasa Inggris" },
    ],
  },
  {
    id: "logika",
    label: "Logika",
    icon: FaCalculator,
    aksen: "#4a148c",
    aksenBg: "#f3e5f5",
    mapel: [
      { key: "matematika" as keyof NilaiAkademik, label: "Matematika" },
      { key: "informatika" as keyof NilaiAkademik, label: "Informatika" },
    ],
  },
  {
    id: "sains",
    label: "Sains",
    icon: FaFlask,
    aksen: "#1b5e20",
    aksenBg: "#e8f5e9",
    mapel: [{ key: "ipa" as keyof NilaiAkademik, label: "IPA" }],
  },
  {
    id: "sosial",
    label: "Sosial",
    icon: FaUsers,
    aksen: "#e65100",
    aksenBg: "#fff3e0",
    mapel: [
      { key: "ips" as keyof NilaiAkademik, label: "IPS" },
      { key: "ppkn" as keyof NilaiAkademik, label: "PPKN" },
    ],
  },
  {
    id: "praktik",
    label: "Praktik",
    icon: FaPalette,
    aksen: "#880e4f",
    aksenBg: "#fce4ec",
    mapel: [
      { key: "penjas" as keyof NilaiAkademik, label: "Penjas" },
      { key: "seni" as keyof NilaiAkademik, label: "Seni" },
    ],
  },
];

interface NilaiFormProps {
  nilai: NilaiAkademik;
  onChange: (key: keyof NilaiAkademik, value: string) => void;
  onSubmit: () => void;
  submitting?: boolean;
}

// --- hitung jumlah field yang sudah terisi ---
function hitungTerisi(nilai: NilaiAkademik): number {
  return Object.values(nilai).filter((v) => v !== "").length;
}

const TOTAL_MAPEL = 9;

// --- komponen form nilai akademik ---
export default function NilaiForm({
  nilai,
  onChange,
  onSubmit,
  submitting = false,
}: NilaiFormProps) {
  const terisi = hitungTerisi(nilai);
  const semuaTerisi = terisi === TOTAL_MAPEL;

  return (
    <div className="flex flex-col gap-8">
      {/* --- header --- */}
      <div className="rounded-3xl bg-white p-8 shadow-card md:p-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#0b1c30] md:text-3xl font-headline">
          Input Nilai Akademik
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[#45464d] font-sans">
          Masukkan nilai rapor terakhirmu (0–100) untuk setiap mata pelajaran. Data ini membantu
          sistem memberikan rekomendasi jurusan yang lebih akurat.
        </p>

        {/* progress pengisian */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006a61] font-sans">
              Terisi
            </span>
            <span className="text-xs font-semibold text-[#45464d] font-sans">
              {terisi} / {TOTAL_MAPEL} mata pelajaran
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#e5eeff]">
            <div
              className="h-full rounded-full bg-secondary transition-all duration-500"
              style={{ width: `${(terisi / TOTAL_MAPEL) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* --- daftar kategori vertikal --- */}
      <div className="flex flex-col gap-5">
        {kategoriNilai.map((kat) => {
          const Icon = kat.icon;
          return (
            <div key={kat.id} className="overflow-hidden rounded-3xl bg-white shadow-card">
              {/* header kategori */}
              <div className="flex items-center gap-3 border-b border-[#e5eeff] px-6 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f0f4ff]">
                  <Icon className="text-[#006a61]" size={16} />
                </div>
                <h3 className="text-base font-bold text-[#0b1c30] font-headline">{kat.label}</h3>
              </div>

              {/* input per mata pelajaran */}
              <div className="flex flex-col gap-4 p-6">
                {kat.mapel.map((mp) => (
                  <div key={mp.key} className="flex items-center gap-4">
                    <span className="w-40 shrink-0 text-sm font-semibold text-[#45464d] font-sans">
                      {mp.label}
                    </span>
                    <div className="flex-1">
                      <NumberInput
                        id={mp.key}
                        label=""
                        value={nilai[mp.key]}
                        onChange={(val) => onChange(mp.key, val)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* --- tombol submit --- */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={onSubmit}
          disabled={!semuaTerisi || submitting}
          className={`inline-flex w-full items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-base font-semibold transition-all duration-200 font-sans active:scale-95
            ${
              semuaTerisi && !submitting
                ? "cursor-pointer bg-secondary text-white hover:bg-secondary-dim"
                : "cursor-not-allowed bg-[#c6c6cd] text-white"
            }`}
        >
          {submitting ? (
            <>
              <FaSpinner size={16} className="animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              Lihat Hasil Analisis
              <FaArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
