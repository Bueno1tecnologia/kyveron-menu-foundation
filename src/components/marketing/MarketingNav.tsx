import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";

export function MarketingNav() {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <Link to="/features" className="transition-colors hover:text-foreground">
            {t("nav.features")}
          </Link>
          <Link to="/pricing" className="transition-colors hover:text-foreground">
            {t("nav.pricing")}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/login">{t("common.signIn")}</Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-brand text-primary-foreground shadow-sm hover:opacity-95">
            <Link to="/signup">{t("common.getStarted")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
