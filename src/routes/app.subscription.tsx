import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, CreditCard, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/app/EmptyState";
import { ListSkeleton } from "@/components/app/LoadingSkeletons";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/subscription")({
  component: SubscriptionPage,
});

interface Plan {
  key: string;
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}

function SubscriptionPage() {
  const { t } = useTranslation();
  const loading = useSimulatedLoading();

  const plans: Plan[] = [
    {
      key: "starter",
      name: t("subscriptionPage.plans.starter.name", "Starter"),
      price: "€0",
      features: [
        t("subscriptionPage.plans.starter.f1", "1 cardápio digital"),
        t("subscriptionPage.plans.starter.f2", "QR Code partilhável"),
        t("subscriptionPage.plans.starter.f3", "Suporte por email"),
      ],
    },
    {
      key: "pro",
      name: t("subscriptionPage.plans.pro.name", "Pro"),
      price: "€19",
      features: [
        t("subscriptionPage.plans.pro.f1", "Até 5 estabelecimentos"),
        t("subscriptionPage.plans.pro.f2", "Cardápios ilimitados"),
        t("subscriptionPage.plans.pro.f3", "Analytics avançado"),
        t("subscriptionPage.plans.pro.f4", "Personalização de marca"),
      ],
      highlight: true,
    },
    {
      key: "business",
      name: t("subscriptionPage.plans.business.name", "Business"),
      price: "€49",
      features: [
        t("subscriptionPage.plans.business.f1", "Estabelecimentos ilimitados"),
        t("subscriptionPage.plans.business.f2", "Domínio personalizado"),
        t("subscriptionPage.plans.business.f3", "Suporte prioritário 24/7"),
        t("subscriptionPage.plans.business.f4", "API e integrações"),
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl animate-fade-in">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("nav.subscription")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t(
            "subscriptionPage.subtitle",
            "Escolha o plano ideal para o seu negócio. Cancele a qualquer momento.",
          )}
        </p>
      </header>

      {loading ? (
        <ListSkeleton count={3} />
      ) : (
        <>
          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => (
              <Card
                key={p.key}
                className={cn(
                  "group flex flex-col gap-4 rounded-2xl border-border/60 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg",
                  p.highlight && "border-primary/40 bg-gradient-soft shadow-glow",
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
                  {p.highlight && (
                    <Badge className="gap-1 bg-gradient-brand text-primary-foreground">
                      <Sparkles className="h-3 w-3" />
                      {t("subscriptionPage.recommended", "Recomendado")}
                    </Badge>
                  )}
                </div>
                <div>
                  <span className="text-3xl font-semibold text-foreground">{p.price}</span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    /{t("subscriptionPage.month", "mês")}
                  </span>
                </div>
                <ul className="flex flex-col gap-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn(
                    "mt-auto transition",
                    p.highlight ? "bg-gradient-brand shadow-glow hover:opacity-95" : "",
                  )}
                  variant={p.highlight ? "default" : "outline"}
                >
                  {t("subscriptionPage.choose", "Escolher plano")}
                </Button>
              </Card>
            ))}
          </section>

          <div className="mt-8">
            <EmptyState
              icon={CreditCard}
              title={t("subscriptionPage.emptyTitle", "Ainda não tem uma assinatura ativa.")}
              description={t(
                "subscriptionPage.emptyDesc",
                "Escolha um dos planos acima para desbloquear todos os recursos.",
              )}
              action={
                <Button asChild variant="outline" size="lg">
                  <Link to="/app/billing">{t("subscriptionPage.viewBilling", "Ver faturação")}</Link>
                </Button>
              }
            />
          </div>
        </>
      )}
    </div>
  );
}
