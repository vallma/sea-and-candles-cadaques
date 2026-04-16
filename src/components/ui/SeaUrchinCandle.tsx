export default function SeaUrchinCandle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 340"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="smokeGrad" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── SMOKE ── */}
      <g opacity="0.55">
        {/* Hilo central */}
        <path
          d="M100 68 C100 58 95 48 100 36 C105 24 99 14 100 2"
          stroke="currentColor" strokeWidth="1.5" fill="none"
          strokeLinecap="round"
          style={{ animation: "smokeRise 3s ease-in-out infinite" }}
        />
        {/* Hilo izquierdo */}
        <path
          d="M100 68 C96 55 90 45 93 33 C96 21 91 12 88 0"
          stroke="currentColor" strokeWidth="1" fill="none"
          strokeLinecap="round" opacity="0.6"
          style={{ animation: "smokeRise 3s ease-in-out infinite 0.4s" }}
        />
        {/* Hilo derecho */}
        <path
          d="M100 68 C104 56 110 46 107 34 C104 22 109 13 112 1"
          stroke="currentColor" strokeWidth="1" fill="none"
          strokeLinecap="round" opacity="0.6"
          style={{ animation: "smokeRise 3s ease-in-out infinite 0.8s" }}
        />
        {/* Volutas dispersas */}
        <path
          d="M97 45 C92 40 85 38 83 30"
          stroke="currentColor" strokeWidth="0.8" fill="none"
          strokeLinecap="round" opacity="0.35"
          style={{ animation: "smokeRise 3.5s ease-in-out infinite 0.2s" }}
        />
        <path
          d="M103 42 C108 37 115 36 117 28"
          stroke="currentColor" strokeWidth="0.8" fill="none"
          strokeLinecap="round" opacity="0.35"
          style={{ animation: "smokeRise 3.5s ease-in-out infinite 0.6s" }}
        />
      </g>

      {/* ── MECHA ── */}
      <line x1="100" y1="68" x2="100" y2="80"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

      {/* ── CUERPO ERIZO — círculo sólido ── */}
      <circle cx="100" cy="205" r="68" fill="currentColor" />

      {/* ── PÚAS — silhouette style, misma dirección que el cuerpo ── */}
      {/* Las púas como triángulos muy finos desde el borde */}
      {[
        // [ángulo en grados]
        0, 18, 36, 54, 72, 90, 108, 126, 144, 162,
        180, 198, 216, 234, 252, 270, 288, 306, 324, 342,
        9, 27, 45, 63, 81, 99, 117, 135, 153, 171,
        189, 207, 225, 243, 261, 279, 297, 315, 333, 351,
      ].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 100, cy = 205, r = 68;
        // start point on circle edge
        const sx = cx + r * Math.sin(rad);
        const sy = cy - r * Math.cos(rad);
        // spine length alternates long/short
        const len = i % 3 === 0 ? 28 : i % 3 === 1 ? 20 : 14;
        const ex = cx + (r + len) * Math.sin(rad);
        const ey = cy - (r + len) * Math.cos(rad);
        return (
          <line
            key={i}
            x1={sx} y1={sy} x2={ex} y2={ey}
            stroke="currentColor"
            strokeWidth={i % 3 === 0 ? "1.6" : "1.1"}
            strokeLinecap="round"
          />
        );
      })}

      {/* Punta de cada espina larga */}
      {[0, 18, 36, 54, 72, 90, 108, 126, 144, 162, 180, 198, 216, 234, 252, 270, 288, 306, 324, 342].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 100, cy = 205;
        const ex = cx + 96 * Math.sin(rad);
        const ey = cy - 96 * Math.cos(rad);
        return <circle key={i} cx={ex} cy={ey} r="1.8" fill="currentColor" />;
      })}

      {/* ── SOMBRA base ── */}
      <ellipse cx="100" cy="274" rx="52" ry="8" fill="currentColor" opacity="0.18" />
    </svg>
  );
}
