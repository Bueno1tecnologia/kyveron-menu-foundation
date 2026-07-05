import { Link } from "@tanstack/react-router";
import {
  Beef,
  Cake,
  Coffee,
  Croissant,
  Fish,
  IceCream,
  Pizza,
  Salad,
  Sparkles,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/templates")({
  component: TemplatesPage,
});

import { createFileRoute } from "@tanstack/react-router";

export type TemplateKey =
  | "burger"
  | "pizzeria"
  | "restaurant"
  | "pastry"
  | "bakery"
  | "cafe"
  | "sushi"
  | "acai"
  | "gelato"
  | "foodtruck";

interface TemplateMeta {
  key: TemplateKey;
  icon: LucideIcon;
  colors: [string, string];
  accent: string;
}

const TEMPLATES: TemplateMeta[] = [
  { key: "pizzeria", icon: Pizza, colors: ["#C0392B", "#F39C12"], accent: "#F1C40F" },
  { key: "burger", icon: Beef, colors: ["#2C3E50", "#E67E22"], accent: "#E67E22" },
  { key: "pastry", icon: Cake, colors: ["#F8C8DC", "#D4AF37"], accent: "#D4AF37" },
  { key: "bakery", icon: Croissant, colors: ["#D4A373", "#5D4037"], accent: "#8D6E63" },
  { key: "restaurant", icon: UtensilsCrossed, colors: ["#2E5C47", "#F5F5DC"], accent: "#2E5C47" },
  { key: "sushi", icon: Fish, colors: ["#1A1A1A", "#C0392B"], accent: "#C0392B" },
  { key: "gelato", icon: IceCream, colors: ["#FFB7C5", "#A8E6CF"], accent: "#FFB7C5" },
  { key: "foodtruck", icon: Truck, colors: ["#F1C40F", "#E91E63"], accent: "#E91E63" },
  { key: "cafe", icon: Coffee, colors: ["#6F4E37", "#FFF8E7"], accent: "#6F4E37" },
  { key: "acai", icon: Salad, colors: ["#6A1B9A", "#FFCA28"], accent: "#FFCA28" },
];

function MiniPreview({ colors, accent }: { colors: [string, string]; accent: string }) {
  return (
    <div
      className="relative h-36 w-full overflow-hidden rounded-xl"
      style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{ backgroundImage: `radial-gradient(circle at 20% 30%, ${accent} 0%, transparent 60%)` }} />
      </div>
      <div className="absolute bottom-2.5 left-2.5 right-2.5 space-y-1.5 rounded-lg bg-white/90 p-2.5 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
          <div className="h-2 w-16 rounded bg-gray-200" />
        </div>
        <div className="h-2 w-3/4 rounded bg-gray-200" />
        <div className="h-2 w-1/2 rounded bg-gray-200" />
      </div>
    </div>
  );
}

function TemplatesPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 animate-fade-in">
      {/* Header */}
      <header className="text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Kyveron AI
        </div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t("templates.title")}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
          {t("templates.subtitle")}
        </p>
      </header>

      {/* Grid */}
      <section aria-label={t("templates.title")}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TEMPLATES.map((tmpl) => {
            const Icon = tmpl.icon;
            return (
              <Card
                key={tmpl.key}
                className={cn(
                  "group flex flex-col gap-4 overflow-hidden border-border/60 p-3 shadow-sm transition",
                  "hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg",
                )}
              >
                <MiniPreview colors={tmpl.colors} accent={tmpl.accent} />

                <div className="flex min-w-0 flex-col gap-1 px-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-white"
                      style={{ backgroundColor: tmpl.accent }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <h3 className="truncate text-sm font-semibold text-foreground">
                      {t(`create.examples.${tmpl.key}.label`)}
                    </h3>
                  </div>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {t(`templates.descriptions.${tmpl.key}`)}
                  </p>
                </div>

                <div className="mt-auto px-1 pb-1">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-lg border-primary/20 text-xs font-medium hover:bg-primary hover:text-primary-foreground"
                  >
                    <Link
                      to="/app/create"
                      search={{ template: tmpl.key }}
                      className="flex items-center justify-center gap-2"
                    >
                      {t("templates.useTemplate")}
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
