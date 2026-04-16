import { useTranslations } from "next-intl";
import SeaUrchinCandle from "./SeaUrchinCandle";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="bg-[#fafafa] pt-16 pb-10 px-6 border-t border-stone-100">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        <SeaUrchinCandle className="w-12 text-[#1a5276]/30" />
        <p className="text-[9px] tracking-[0.4em] text-stone-400 uppercase">Sea & Candles</p>
        <p className="text-[11px] text-stone-400 text-center max-w-sm leading-relaxed font-light">
          {t("bio")}
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 text-[9px] tracking-widest text-stone-300 pt-6 border-t border-stone-100 w-full justify-between">
          <p>Cadaqués · Costa Brava · Catalunya</p>
          <a href="mailto:sea.andcandles@gmail.com"
            className="hover:text-[#1a5276] transition-colors text-stone-400">
            sea.andcandles@gmail.com
          </a>
          <p>© {new Date().getFullYear()} · {t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
