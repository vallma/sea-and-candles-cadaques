"use client";

import { useMemo } from "react";

interface SeaData {
  waterTemp: string;
  airTemp: string;
  wind: string;
  windDir: string;
  waveHeight: string;
  sunrise: string;
  sunset: string;
  moon: string;
  time: string;
}

function useSeaData(): SeaData {
  return useMemo(() => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const waterTemp = (17 + Math.sin(((h - 6) / 24) * Math.PI * 2) * 3).toFixed(1);
    const airTemp = (19 + Math.sin(((h - 8) / 24) * Math.PI * 2) * 5).toFixed(1);
    const wind = (8 + Math.abs(Math.sin(h / 6)) * 14).toFixed(0);
    const windDir = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.floor(h / 3) % 8];
    const waveHeight = (0.2 + Math.abs(Math.sin(h / 4)) * 0.8).toFixed(1);
    return {
      waterTemp,
      airTemp,
      wind,
      windDir,
      waveHeight,
      sunrise: "07:12",
      sunset: "20:48",
      moon: "Creixent",
      time: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
    };
  }, []);
}

export function SeaWidgetCompact() {
  const data = useSeaData();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 32,
        padding: "14px 0",
        overflowX: "auto",
      }}
    >
      <span className="mono" style={{ color: "var(--sea)", whiteSpace: "nowrap" }}>
        Cadaqués · {data.time}
      </span>
      <span style={{ width: 1, height: 16, background: "var(--rule)", flexShrink: 0 }} />
      <span className="mono" style={{ color: "var(--ink-soft)", whiteSpace: "nowrap" }}>
        Aigua {data.waterTemp}°C
      </span>
      <span className="mono" style={{ color: "var(--ink-soft)", whiteSpace: "nowrap" }}>
        Aire {data.airTemp}°C
      </span>
      <span className="mono" style={{ color: "var(--ink-soft)", whiteSpace: "nowrap" }}>
        Vent {data.wind} km/h {data.windDir}
      </span>
      <span className="mono" style={{ color: "var(--ink-soft)", whiteSpace: "nowrap" }}>
        Onatge {data.waveHeight} m
      </span>
      <span style={{ width: 1, height: 16, background: "var(--rule)", flexShrink: 0 }} />
      <span className="mono" style={{ color: "var(--mute)", whiteSpace: "nowrap" }}>
        ↑ {data.sunrise} · ↓ {data.sunset}
      </span>
    </div>
  );
}

export function SeaWidgetFull() {
  const data = useSeaData();

  const stats = [
    { label: "Aigua", value: `${data.waterTemp}°C`, unit: "temperatura" },
    { label: "Aire", value: `${data.airTemp}°C`, unit: "temperatura" },
    { label: "Vent", value: `${data.wind} km/h`, unit: data.windDir },
    { label: "Onatge", value: `${data.waveHeight} m`, unit: "alçada" },
  ];

  return (
    <div
      style={{
        border: "1px solid var(--rule)",
        background: "var(--bg)",
        padding: "32px",
      }}
    >
      {/* Header: time + coordinates */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 28,
          borderBottom: "1px solid var(--rule)",
          paddingBottom: 20,
        }}
      >
        <div>
          <div className="serif" style={{ fontSize: 32, color: "var(--ink)", lineHeight: 1 }}>
            {data.time}
          </div>
          <div className="mono" style={{ color: "var(--mute)", marginTop: 6 }}>
            Cadaqués · Costa Brava
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="mono" style={{ color: "var(--mute)" }}>42°17′N</div>
          <div className="mono" style={{ color: "var(--mute)" }}>3°09′E</div>
        </div>
      </div>

      {/* 4-stat grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1px",
          background: "var(--rule)",
          marginBottom: 1,
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--bg)",
              padding: "20px 16px",
            }}
          >
            <div className="mono" style={{ color: "var(--mute)", marginBottom: 8 }}>
              {s.label}
            </div>
            <div
              className="serif"
              style={{ fontSize: 36, color: "var(--ink)", lineHeight: 1 }}
            >
              {s.value}
            </div>
            <div className="mono" style={{ color: "var(--mute)", marginTop: 4 }}>
              {s.unit}
            </div>
          </div>
        ))}
      </div>

      {/* Footer: sunrise / sunset / moon */}
      <div
        style={{
          borderTop: "1px solid var(--rule)",
          paddingTop: 16,
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <span className="mono" style={{ color: "var(--ink-soft)" }}>
          ↑ Sortida {data.sunrise}
        </span>
        <span className="mono" style={{ color: "var(--ink-soft)" }}>
          ↓ Posta {data.sunset}
        </span>
        <span className="mono" style={{ color: "var(--ink-soft)" }}>
          ☽ {data.moon}
        </span>
      </div>
    </div>
  );
}
