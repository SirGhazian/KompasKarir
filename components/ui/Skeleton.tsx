// --- komponen skeleton loading ---

interface SkeletonProps {
  className?: string;
}

// blok skeleton dasar (1 baris/elemen)
export default function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`animate-pulse rounded-lg bg-[#e5eeff] ${className}`} />;
}

// skeleton khusus untuk blok deskripsi/narasi (beberapa baris teks)
export function TextSkeleton({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-4 ${i === lines - 1 ? "w-3/5" : "w-full"}`} />
      ))}
    </div>
  );
}
