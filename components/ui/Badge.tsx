import React from "react";

type BadgeVariant = "category" | "chip" | "label";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  // className warna (bg + teks)
  colorClass?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = "category",
  size = "sm",
  colorClass = "",
  children,
  className = "",
}: BadgeProps) {
  // --- variant: label (teks saja, tanpa pill) ---
  if (variant === "label") {
    return (
      <p
        className={`text-[10px] font-bold uppercase tracking-widest font-sans text-[#006a61] ${className}`}
      >
        {children}
      </p>
    );
  }

  // --- variant: chip (tag abu-abu muda) ---
  if (variant === "chip") {
    return (
      <span
        className={`inline-block rounded-full bg-[#f8f9ff] px-3 py-1 text-xs font-medium text-[#45464d] font-sans ${className}`}
      >
        {children}
      </span>
    );
  }

  // --- variant: category (pill berwarna) ---
  const sizeClass =
    size === "md"
      ? "inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold"
      : "inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider";

  return (
    <span className={`rounded-full font-sans ${sizeClass} ${colorClass} ${className}`}>
      {children}
    </span>
  );
}
