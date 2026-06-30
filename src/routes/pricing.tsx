import { Link, createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/currency";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Preços — Kyveron Menu" },
      {
        name: "description",
        content: "Planos mensais simples e transparentes. Comece grátis e escale quando precisar.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { t } = useTranslation();

  const plans = [
    {
      name: t("pricing.starterName"),
      desc: t("pricing.starterDesc"),
      price: 9,
      highlighted: false,
      features: [
        t("pricing.features.menus1"),
        t("pricing.features.aiBasic"),
        t("pricing.features.qr"),
        t("pricing.features.support"),
      ],
    },
    {
      name: t("pricing.proName"),
      desc: t("pricing.proDesc"),
      price: 29,
      highlighted: true,
      features: [
        t("pricing.features.menus5"),
        t("pricing.features.aiAdvanced"),
        t("pricing.features.qr"),
        t("pricing.features.analytics"),
        t("pricing.features.supportPriority"),
      ],
    },
    {
      name: t("pricing.businessName"),
      desc: t("pricing.businessDesc"),
      price: 79,
      highlighted: false,
      features: [
        t("pricing.features.menusUnlimited"),
        t("pricing.features.aiAdvanced"),
        t("pricing.features.team"),
        t("pricing.features.multiLocation"),
        t("pricing.features.supportPriority"),
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingNav />
      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t("pricing.title")}
          </h1>
          <p className="mt-3 text-muted-foreground">{t("pricing.subtitle")}</p>
        </div>
      </section>
      <section className="border-t border-border/60 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-3">
          {plans.map((p) => (
            <Card
              key={p.name}
              className={
                p.highlighted
                  ? "relative rounded-2xl border-transparent bg-gradient-brand p-[1px] shadow-elegant-lg"
                  : "rounded-2xl border-border/60 bg-card shadow-sm"
              }
            >
              <div
                className={
                  p.highlighted
                    ? "h-full rounded-[calc(theme(borderRadius.2xl)-1px)] bg-card p-7"
                    : "h-full rounded-2xl p-7"
                }
              >
                {p.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-brand text-primary-foreground shadow-sm">
                    {t("pricing.mostPopular")}
                  </Badge>
                )}
                <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight text-foreground">
                    {formatCurrency(p.price).replace(/[\u00A0\s]?€/, "€")}
                  </span>
                  <span className="text-sm text-muted-foreground">{t("pricing.perMonth")}</span>
                </div>
                <Button
                  asChild
                  className={
                    p.highlighted
                      ? "mt-6 w-full bg-gradient-brand text-primary-foreground hover:opacity-95"
                      : "mt-6 w-full"
                  }
                  variant={p.highlighted ? "default" : "outline"}
                >
                  <Link to="/signup">{t("pricing.choose")}</Link>
                </Button>
                <ul className="mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
