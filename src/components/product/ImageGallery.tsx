"use client";

import { useState } from "react";

interface Props {
  images: string[];
  name: string;
}

export default function ImageGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }

  if (images.length === 0) {
    return (
      <div className="ph" style={{ aspectRatio: "4/5" }}>
        <span className="ph-label">Imatge no disponible</span>
      </div>
    );
  }

  return (
    <div>
      {/* Imatge principal amb zoom */}
      <div
        style={{
          aspectRatio: "4/5",
          overflow: "hidden",
          cursor: zoomed ? "zoom-out" : "zoom-in",
          border: "none",
          position: "relative",
        }}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={images[active]}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.2s ease",
            ...(zoomed
              ? {
                  transform: "scale(2)",
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }
              : {}),
          }}
        />
        {/* Mono label bottom-right */}
        {!zoomed && (
          <div
            className="mono"
            style={{
              position: "absolute",
              bottom: 12,
              right: 12,
              background: "var(--bg)",
              padding: "4px 8px",
              fontSize: 9,
              letterSpacing: "0.08em",
              color: "var(--mute)",
            }}
          >
            Clica per ampliar
          </div>
        )}
      </div>

      {/* Miniatures */}
      {images.length > 1 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            marginTop: 10,
          }}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                padding: 0,
                border: "none",
                background: "none",
                cursor: "pointer",
                opacity: active === i ? 1 : 0.5,
                transition: "opacity 0.2s ease",
                overflow: "hidden",
                aspectRatio: "4/5",
              }}
              onMouseEnter={(e) => {
                if (active !== i) (e.currentTarget as HTMLButtonElement).style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                if (active !== i) (e.currentTarget as HTMLButtonElement).style.opacity = "0.5";
              }}
            >
              <img
                src={img}
                alt={`${name} ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
