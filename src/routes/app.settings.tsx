import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("nav.settings")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Preferências da sua conta.
      </p>
      <Card className="mt-6 flex items-center justify-between rounded-2xl border-border/60 p-5 shadow-sm">
        <div>
          <p className="text-sm font-medium text-foreground">{t("common.language")}</p>
          <p className="text-xs text-muted-foreground">Português · English · Español</p>
        </div>
        <LanguageSwitcher variant="outline" />
      </Card>
    </div>
  );
}
