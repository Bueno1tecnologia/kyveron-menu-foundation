import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Globe2, MousePointerClick, Share2, Sparkles, Wand2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Funcionalidades — Kyveron Menu" },
      {
        name: "description",
        content:
          "Descubra todas as funcionalidades da Kyveron Menu: criação por IA, design premium, partilha imediata, multi-idioma e análises.",
      },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  const { t } = useTranslation();
  const features = [
    { icon: Wand2, title: t("landing.feature1Title"), desc: t("landing.feature1Desc") },
    { icon: Sparkles, title: t("landing.feature2Title"), desc: t("landing.feature2Desc") },
    { icon: Share2, title: t("landing.feature3Title"), desc: t("landing.feature3Desc") },
    { icon: Globe2, title: t("landing.feature4Title"), desc: t("landing.feature4Desc") },
    { icon: MousePointerClick, title: t("landing.feature5Title"), desc: t("landing.feature5Desc") },
    { icon: BarChart3, title: t("landing.feature6Title"), desc: t("landing.feature6Desc") },
  ];
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingNav />
      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t("landing.featuresTitle")}
          </h1>
          <p className="mt-3 text-muted-foreground">{t("landing.featuresSubtitle")}</p>
        </div>
      </section>
      <section className="border-t border-border/60 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="rounded-2xl border-border/60 p-6 shadow-sm">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-sm">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
