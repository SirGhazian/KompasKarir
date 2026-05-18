"use client";

import { useState, useRef, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi2";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  placeholder: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Select({
  placeholder,
  options,
  value,
  onChange,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // tutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full cursor-pointer items-center justify-between rounded-2xl border bg-white px-4 py-3.5 text-left outline-none transition-all duration-200
          ${isOpen ? "border-[#0b1c30]" : "border-[#c6c6cd] hover:border-[#0b1c30]"}`}
      >
        <span
          className={`text-sm font-semibold font-sans ${
            value ? "text-[#0b1c30]" : "text-[#76777d]"
          }`}
        >
          {selectedLabel || placeholder}
        </span>
        <span
          className={`ml-3 shrink-0 text-[#006a61] transition-transform duration-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <HiChevronDown size={20} />
        </span>
      </button>

      {/* dropdown menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-[#c6c6cd] bg-white shadow-card">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center px-4 py-3 text-left text-sm font-semibold transition-colors font-sans
                  ${
                    isSelected
                      ? "bg-[#e5f7f5] text-[#006a61]"
                      : "text-[#45464d] hover:bg-[#f8f9ff] hover:text-[#006a61]"
                  }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
