import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-stone-200 bg-stone-50 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 tracking-wide">
        <p className="max-w-sm text-center sm:text-left">{t("bio")}</p>
        <p>
          <a href="mailto:sea.andcandles@gmail.com" className="hover:text-stone-600 transition-colors">
            sea.andcandles@gmail.com
          </a>
        </p>
        <p>© {new Date().getFullYear()} Sea & Candles. {t("rights")}.</p>
      </div>
    </footer>
  );
}
