import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/app/establishments")({
  component: EstablishmentsPage,
});

function EstablishmentsPage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("nav.establishments")}
        </h1>
      </header>
      <Card className="flex flex-col items-center justify-center gap-3 rounded-2xl border-dashed border-border/70 bg-gradient-soft p-12 text-center shadow-none">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
          <Building2 className="h-5 w-5" />
        </div>
        <p className="text-sm text-muted-foreground">—</p>
      </Card>
    </div>
  );
}
