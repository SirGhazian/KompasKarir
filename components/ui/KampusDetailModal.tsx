"use client";

import { FaXmark } from "react-icons/fa6";
import type { KampusEntry } from "@/utils/dataKampus";
import { formatRupiah } from "@/utils/matchKampus";

interface KampusDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: KampusEntry | null;
}

export default function KampusDetailModal({ isOpen, onClose, data }: KampusDetailModalProps) {
  if (!isOpen || !data) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b1c30]/50 px-4 py-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* tombol close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl text-[#45464d] transition-colors hover:text-[#0b1c30]"
        >
          <FaXmark size={18} />
        </button>

        {/* header */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-[#76777d] font-sans">{data.universitas}</p>
          <h3 className="mt-1 text-xl font-extrabold text-[#0b1c30] font-headline">
            {data.programStudi}
          </h3>
          <p className="mt-1 text-sm text-[#45464d] font-sans">
            {data.jenjang} · {data.rumpunKeilmuan}
          </p>
        </div>

        {/* info */}
        <div className="mb-6 space-y-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#006a61] font-sans">
              Fakultas
            </span>
            <p className="mt-0.5 text-sm text-[#45464d] font-sans">{data.fakultas}</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#006a61] font-sans">
              Lokasi
            </span>
            <p className="mt-0.5 text-sm text-[#45464d] font-sans">{data.lokasi}</p>
          </div>
        </div>

        {/* tabel ukt */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#006a61] font-sans">
            UKT per Kelompok
          </span>
          <div className="mt-3 overflow-hidden rounded-2xl border border-[#e5eeff]">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="bg-[#f8f9ff]">
                  <th className="px-4 py-2.5 text-left font-semibold text-[#45464d]">Kelompok</th>
                  <th className="px-4 py-2.5 text-right font-semibold text-[#45464d]">UKT</th>
                </tr>
              </thead>
              <tbody>
                {data.ukt.map((nilai, idx) => (
                  <tr key={idx} className="border-t border-[#e5eeff]">
                    <td className="px-4 py-2.5 text-[#0b1c30]">Kelompok {idx + 1}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-[#006a61]">
                      {nilai !== null ? formatRupiah(nilai) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
