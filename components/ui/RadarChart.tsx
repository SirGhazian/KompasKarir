"use client";

interface RadarChartProps {
  // R, I, A, S, E, C
  data: number[];
  labels?: string[];
  size?: number;
  color?: string;
  className?: string;
}

export default function RadarChart({
  data,
  labels = ["R", "I", "A", "S", "E", "C"],
  size = 280,
  color = "#006a61",
  className = "",
}: RadarChartProps) {
  const center = size / 2;
  const radius = size * 0.38;
  const levels = 5; // jumlah ring konsentris
  const sides = 6;
  const angleStep = (Math.PI * 2) / sides;
  // mulai dari atas (-90 derajat)
  const startAngle = -Math.PI / 2;

  // hitung titik pada polygon untuk level tertentu
  function getPoint(index: number, scale: number): [number, number] {
    const angle = startAngle + index * angleStep;
    const x = center + Math.cos(angle) * radius * scale;
    const y = center + Math.sin(angle) * radius * scale;
    return [x, y];
  }

  // path polygon dari array titik
  function polygonPoints(scale: number): string {
    return Array.from({ length: sides })
      .map((_, i) => getPoint(i, scale).join(","))
      .join(" ");
  }

  // titik data (normalisasi 0–100 ke 0–1)
  function dataPoints(): string {
    return data
      .map((val, i) => {
        const scale = Math.min(Math.max(val, 0), 100) / 100;
        return getPoint(i, scale).join(",");
      })
      .join(" ");
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-label="Radar chart RIASEC"
    >
      {/* ring konsentris */}
      {Array.from({ length: levels }).map((_, lvl) => {
        const scale = (lvl + 1) / levels;
        return (
          <polygon
            key={`level-${lvl}`}
            points={polygonPoints(scale)}
            fill="none"
            stroke="#c6c6cd"
            strokeWidth={lvl === levels - 1 ? 1.5 : 0.8}
            opacity={0.5}
          />
        );
      })}

      {/* garis radial dari tengah ke tiap sudut */}
      {Array.from({ length: sides }).map((_, i) => {
        const [x, y] = getPoint(i, 1);
        return (
          <line
            key={`axis-${i}`}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="#c6c6cd"
            strokeWidth={0.8}
            opacity={0.5}
          />
        );
      })}

      {/* area data */}
      <polygon
        points={dataPoints()}
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* titik data */}
      {data.map((val, i) => {
        const scale = Math.min(Math.max(val, 0), 100) / 100;
        const [x, y] = getPoint(i, scale);
        return (
          <circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r={4}
            fill={color}
            stroke="#ffffff"
            strokeWidth={2}
          />
        );
      })}

      {/* label di luar */}
      {labels.map((label, i) => {
        const [x, y] = getPoint(i, 1.2);
        return (
          <text
            key={`label-${i}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-[#0b1c30] text-xs font-bold font-sans"
            style={{ fontSize: "12px", fontWeight: 700 }}
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
