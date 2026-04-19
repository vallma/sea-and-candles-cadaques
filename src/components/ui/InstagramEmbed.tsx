"use client";

import { useEffect } from "react";
import Script from "next/script";

interface Props {
  url: string;
}

export default function InstagramEmbed({ url }: Props) {
  useEffect(() => {
    // Si el script ja estava carregat, forçar reprocessament
    const ig = (window as { instgrm?: { Embeds: { process: () => void } } }).instgrm;
    if (ig) {
      ig.Embeds.process();
    }
  }, [url]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", width: "100%" }}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-captioned
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: "1px solid var(--rule)",
          borderRadius: 0,
          boxShadow: "none",
          margin: 0,
          maxWidth: 480,
          minWidth: 280,
          width: "100%",
          padding: 0,
        }}
      />
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          const ig = (window as { instgrm?: { Embeds: { process: () => void } } }).instgrm;
          if (ig) ig.Embeds.process();
        }}
      />
    </div>
  );
}
