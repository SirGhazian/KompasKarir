"use client";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// hitung halaman yang ditampilkan (max 7 item)
function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  if (current <= 4) {
    for (let i = 1; i <= 5; i++) pages.push(i);
    pages.push("...");
    pages.push(total);
  } else if (current >= total - 3) {
    pages.push(1);
    pages.push("...");
    for (let i = total - 4; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push("...");
    pages.push(current - 1);
    pages.push(current);
    pages.push(current + 1);
    pages.push("...");
    pages.push(total);
  }

  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2">
      {/* prev */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm transition-all duration-200 font-sans
          ${
            currentPage === 1
              ? "cursor-not-allowed border-transparent bg-[#f8f9ff] text-[#c6c6cd]"
              : "cursor-pointer border-transparent bg-white text-[#45464d] hover:border-[#c6c6cd]"
          }`}
      >
        <FaArrowLeft size={12} />
      </button>

      {/* nomor halaman */}
      {pages.map((page, i) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${i}`}
              className="flex h-10 w-10 items-center justify-center text-sm text-[#76777d] font-sans"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border text-sm font-bold transition-all duration-200 font-sans
              ${
                isActive
                  ? "border-[#0b1c30] bg-white text-[#0b1c30]"
                  : "border-transparent bg-white text-[#45464d] hover:border-[#c6c6cd]"
              }`}
          >
            {page}
          </button>
        );
      })}

      {/* next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm transition-all duration-200 font-sans
          ${
            currentPage === totalPages
              ? "cursor-not-allowed border-transparent bg-[#f8f9ff] text-[#c6c6cd]"
              : "cursor-pointer border-transparent bg-white text-[#45464d] hover:border-[#c6c6cd]"
          }`}
      >
        <FaArrowRight size={12} />
      </button>
    </div>
  );
}
