import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Globe2,
  MousePointerClick,
  Share2,
  Sparkles,
  Wand2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="mx-auto max-w-5xl px-4 pb-24 pt-20 text-center sm:px-6 sm:pt-28">
          <Badge
            variant="secondary"
            className="mb-6 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <Sparkles className="mr-1.5 h-3 w-3 text-accent" />
            {t("landing.badge")}
          </Badge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {t("landing.heroTitle").split(" ").slice(0, -2).join(" ")}{" "}
            <span className="text-gradient-brand">
              {t("landing.heroTitle").split(" ").slice(-2).join(" ")}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
            {t("landing.heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
            >
              <Link to="/signup">
                {t("landing.ctaPrimary")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border/70">
              <Link to="/features">{t("landing.ctaSecondary")}</Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">{t("landing.trustedBy")}</p>

          {/* Product preview card */}
          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute inset-x-10 -top-6 h-24 bg-gradient-brand opacity-20 blur-3xl" />
            <Card className="relative overflow-hidden rounded-2xl border-border/60 bg-card p-0 shadow-elegant-lg">
              <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/40 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
                <span className="ml-3 text-xs text-muted-foreground">kyveron.app/menu/casa-do-mar</span>
              </div>
              <div className="grid gap-6 p-8 md:grid-cols-[1fr_1.2fr]">
                <div className="flex flex-col gap-3 text-left">
                  <Badge className="w-fit bg-accent/15 text-accent hover:bg-accent/20">IA</Badge>
                  <p className="text-sm text-muted-foreground">Descreva o seu negócio</p>
                  <div className="rounded-xl border border-border/70 bg-background p-3 text-sm">
                    “Restaurante de peixe e marisco em Cascais, ambiente acolhedor, pratos do dia e vinhos da região.”
                  </div>
                  <Button size="sm" className="mt-1 w-fit bg-gradient-brand text-primary-foreground">
                    <Wand2 className="mr-1.5 h-3.5 w-3.5" />
                    Gerar cardápio
                  </Button>
                </div>
                <div className="flex flex-col gap-3 text-left">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Pré-visualização
                  </p>
                  {[
                    { name: "Arroz de marisco", price: "18,50 €" },
                    { name: "Bacalhau à brás", price: "14,90 €" },
                    { name: "Polvo à lagareiro", price: "21,00 €" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-lg border border-border/60 bg-background px-3 py-2.5"
                    >
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                      <span className="text-sm text-muted-foreground">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border/60 bg-background py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("landing.featuresTitle")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">{t("landing.featuresSubtitle")}</p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card
                key={f.title}
                className="group rounded-2xl border-border/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-elegant"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-sm">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60 bg-gradient-soft py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("landing.ctaTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("landing.ctaSubtitle")}</p>
          <Button
            asChild
            size="lg"
            className="mt-7 bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
          >
            <Link to="/signup">
              {t("common.getStarted")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
