import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { ArrowLeft, QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QrCodePanel } from "@/components/qr-code/QrCodePanel";
import { useEstablishments } from "@/lib/establishments-context";

const searchSchema = z.object({
  establishment: z.string().optional(),
});

export const Route = createFileRoute("/app/qr")({
  validateSearch: searchSchema,
  component: QrCodePage,
});

function QrCodePage() {
  const { t } = useTranslation();
  const { establishments } = useEstablishments();
  const { establishment: establishmentId } = Route.useSearch();

  const establishment = establishments.find((e) => e.id === establishmentId);

  if (!establishment) {
    throw notFound();
  }

  const publicUrl = `https://kyveron.menu/e/${establishment.id}`;

  return (
    <div className="mx-auto max-w-xl animate-fade-in">
      <header className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="shrink-0">
          <Link to="/app/establishments">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("qrCode.pageTitle")}
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {t("qrCode.pageSubtitle")}
          </p>
        </div>
      </header>

      <div className="mt-8">
        <QrCodePanel
          establishmentName={establishment.name}
          publicUrl={publicUrl}
          primaryColor={establishment.branding.primaryColor}
          secondaryColor={establishment.branding.secondaryColor}
        />
      </div>
    </div>
  );
}
