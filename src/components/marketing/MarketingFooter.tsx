import { useTranslation } from "react-i18next";

import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function MarketingFooter() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kyveron. {t("landing.footerRights")}
          </p>
        </div>
        <LanguageSwitcher variant="outline" />
      </div>
    </footer>
  );
}
