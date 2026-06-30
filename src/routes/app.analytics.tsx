import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/app/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("nav.analytics")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Métricas detalhadas dos seus cardápios em breve.
      </p>
      <Card className="mt-6 rounded-2xl border-border/60 p-10 text-center text-sm text-muted-foreground shadow-sm">
        Esta secção está reservada para a próxima etapa.
      </Card>
    </div>
  );
}
