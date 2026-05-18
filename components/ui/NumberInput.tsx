"use client";

import { useState } from "react";
import { FaCheck, FaExclamation } from "react-icons/fa6";

interface NumberInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  disabled?: boolean;
}

// --- input angka validasi range ---
export default function NumberInput({
  id,
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  placeholder = "0–100",
  disabled = false,
}: NumberInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);

  // validasi nilai saat blur
  function handleBlur() {
    setIsFocused(false);
    if (value === "") {
      setHasError(false);
      return;
    }
    const num = Number(value);
    setHasError(isNaN(num) || num < min || num > max);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    // hanya izinkan angka
    if (raw === "" || /^\d+$/.test(raw)) {
      onChange(raw);
      if (hasError && raw !== "") {
        const num = Number(raw);
        setHasError(isNaN(num) || num < min || num > max);
      }
    }
  }

  // warna border
  const borderClass = hasError
    ? "border-[#ba1a1a] focus:border-[#ba1a1a]"
    : isFocused
      ? "border-[#006a61]"
      : value !== ""
        ? "border-[#006a61]"
        : "border-[#c6c6cd] hover:border-[#006a61]";

  return (
    <div className="flex flex-col gap-2">
      {/* label */}
      <label
        htmlFor={id}
        className={`text-sm font-semibold font-sans transition-colors duration-200 ${
          hasError
            ? "text-[#ba1a1a]"
            : isFocused || value !== ""
              ? "text-[#006a61]"
              : "text-[#45464d]"
        }`}
      >
        {label}
      </label>

      {/* wrapper input + indikator nilai */}
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={3}
          className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-base font-bold font-headline text-[#0b1c30] outline-none transition-all duration-200 placeholder:font-sans placeholder:text-sm placeholder:font-normal placeholder:text-[#c6c6cd] disabled:cursor-not-allowed disabled:bg-[#f8f9ff] disabled:text-[#c6c6cd] ${borderClass}`}
        />

        {/* indikator nilai terisi */}
        {value !== "" && !hasError && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-[#e5f7f5]">
            <FaCheck size={12} className="text-[#006a61]" />
          </div>
        )}

        {/* indikator error */}
        {hasError && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-[#ffdad6]">
            <FaExclamation size={12} className="text-[#ba1a1a]" />
          </div>
        )}
      </div>

      {/*  error */}
      {hasError && (
        <p className="text-xs font-sans text-[#ba1a1a]">
          Masukkan angka antara {min}–{max}
        </p>
      )}
    </div>
  );
}
