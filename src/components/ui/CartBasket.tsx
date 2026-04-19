"use client";

interface Props {
  count: number;
  className?: string;
}

const CANDLE_POSITIONS: number[][] = [
  [],
  [24],
  [19, 29],
  [14, 24, 34],
  [11, 19, 29, 37],
  [9, 16, 24, 32, 39],
];

export default function CartBasket({ count, className }: Props) {
  const level = Math.min(count, CANDLE_POSITIONS.length - 1);
  const xs = CANDLE_POSITIONS[level];

  // Geometria espelmes
  const CANDLE_TOP = 23;
  const CANDLE_H   = 11;
  const CANDLE_W   = 3.5;
  const WICK_H     = 3;
  const FLAME_H    = 3.5;

  return (
    <svg
      viewBox="0 0 48 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Carret amb ${count} productes`}
    >
      {/* ─── Pas 1: cossos espelmes (darrere cistell) ─── */}
      {xs.map((x, i) => (
        <rect
          key={`body-${i}`}
          x={x - CANDLE_W / 2}
          y={CANDLE_TOP}
          width={CANDLE_W}
          height={CANDLE_H}
          rx={0.5}
          fill="currentColor"
          opacity={0.75}
        />
      ))}

      {/* ═══════════════════════════════════
          CISTELL D'ESPART — estil mediterrani
          Forma barril lleuger (més ample al mig)
      ═══════════════════════════════════ */}

      {/* Cos principal */}
      <path
        d="M10,35 C6,39 6,53 10,56 Q15,60 24,60 Q33,60 38,56 C42,53 42,39 38,35 Z"
        fill="currentColor" opacity={0.1}
        stroke="currentColor" strokeWidth={1.3}
      />

      {/* Voltes d'espart — cada volta és un arc que segueix el contorn del cistell */}
      {/* Les corbes saguen cap a fora per donar volum al barril */}
      <path d="M10.5,38.5 Q24,40.5 37.5,38.5" fill="none" stroke="currentColor" strokeWidth={1.1} opacity={0.45} />
      <path d="M9,42.5   Q24,44.5 39,42.5"   fill="none" stroke="currentColor" strokeWidth={1.1} opacity={0.45} />
      <path d="M9,46.5   Q24,48.5 39,46.5"   fill="none" stroke="currentColor" strokeWidth={1.1} opacity={0.45} />
      <path d="M9.5,50.5 Q24,52.5 38.5,50.5" fill="none" stroke="currentColor" strokeWidth={1.1} opacity={0.45} />
      <path d="M11,54.5  Q24,56   37,54.5"   fill="none" stroke="currentColor" strokeWidth={1.1} opacity={0.45} />

      {/* Marques curtes entre voltes — textura teixit espart */}
      {[13, 19, 24, 29, 35].map((x) => (
        <g key={x} opacity={0.2}>
          <line x1={x} y1={38.5} x2={x - 1} y2={42.5} stroke="currentColor" strokeWidth={0.6} />
          <line x1={x} y1={42.5} x2={x + 1} y2={46.5} stroke="currentColor" strokeWidth={0.6} />
          <line x1={x} y1={46.5} x2={x - 1} y2={50.5} stroke="currentColor" strokeWidth={0.6} />
          <line x1={x} y1={50.5} x2={x + 1} y2={54.5} stroke="currentColor" strokeWidth={0.6} />
        </g>
      ))}

      {/* ─── Vorera superior (cèrcol d'espart) ─── */}
      {/* Cèrcol exterior — gruixut */}
      <path
        d="M9,35 Q24,37.5 39,35"
        fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round"
        opacity={0.55}
      />
      {/* Cèrcol interior — filat fi */}
      <path
        d="M9,35 Q24,37.5 39,35"
        fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round"
        opacity={0.3}
        strokeDasharray="2 2"
      />

      {/* ─── Anansa d'espart trençat (dues corbes paral·leles) ─── */}
      {/* Corba exterior */}
      <path
        d="M12,35 C11,17 37,17 36,35"
        fill="none" stroke="currentColor" strokeWidth={3}
        strokeLinecap="round" opacity={0.5}
      />
      {/* Corba interior — crea efecte de trençat */}
      <path
        d="M14,35 C13,19 35,19 34,35"
        fill="none" stroke="currentColor" strokeWidth={1.5}
        strokeLinecap="round" opacity={0.25}
      />
      {/* Filat de l'espart — puntejat diagonal */}
      <path
        d="M13,35 C12,18 36,18 35,35"
        fill="none" stroke="currentColor" strokeWidth={0.8}
        strokeLinecap="round" opacity={0.3}
        strokeDasharray="1.5 2.5"
      />

      {/* ─── Pas 2: metxes i flames (davant de tot) ─── */}
      {xs.map((x, i) => {
        const wickTop  = CANDLE_TOP - WICK_H;
        const flameTop = wickTop - FLAME_H;
        return (
          <g key={`flame-${i}`}>
            <line
              x1={x} y1={CANDLE_TOP} x2={x} y2={wickTop}
              stroke="currentColor" strokeWidth={0.7}
              strokeLinecap="round" opacity={0.5}
            />
            <path
              d={`M${x},${flameTop} C${x-1.5},${flameTop+1.5} ${x-1.5},${CANDLE_TOP} ${x},${CANDLE_TOP} C${x+1.5},${CANDLE_TOP} ${x+1.5},${flameTop+1.5} ${x},${flameTop} Z`}
              fill="#f59e0b"
            />
            <path
              d={`M${x},${flameTop+1} C${x-0.8},${flameTop+2} ${x-0.8},${CANDLE_TOP} ${x},${CANDLE_TOP} C${x+0.8},${CANDLE_TOP} ${x+0.8},${flameTop+2} ${x},${flameTop+1} Z`}
              fill="#fde68a"
            />
          </g>
        );
      })}

      {/* ─── Badge número ─── */}
      {count > 0 && (
        <>
          <circle cx={40} cy={10} r={8} fill="#2e86c1" />
          <text
            x={40} y={10}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={count > 9 ? 7 : 8.5}
            fontWeight="700"
            fill="white"
            fontFamily="system-ui, sans-serif"
          >
            {count > 99 ? "99+" : count}
          </text>
        </>
      )}
    </svg>
  );
}
