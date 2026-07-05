import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/app/EmptyState";
import { ListSkeleton } from "@/components/app/LoadingSkeletons";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";

export const Route = createFileRoute("/app/billing")({
  component: BillingPage,
});

function BillingPage() {
  const { t } = useTranslation();
  const loading = useSimulatedLoading();

  return (
    <div className="mx-auto max-w-4xl animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("nav.billing")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("billingPage.subtitle", "Gestão do plano e faturação em Euros (€).")}
        </p>
      </header>

      {loading ? (
        <ListSkeleton count={3} />
      ) : (
        <EmptyState
          icon={CreditCard}
          title={t("billingPage.emptyTitle", "Ainda não existem faturas.")}
          description={t(
            "billingPage.emptyDesc",
            "As suas faturas e histórico de pagamentos aparecerão aqui assim que assinar um plano.",
          )}
          action={
            <Button asChild size="lg" className="bg-gradient-brand shadow-glow">
              <Link to="/app/subscription">
                <Sparkles className="h-4 w-4" />
                {t("billingPage.cta", "Ver planos")}
              </Link>
            </Button>
          }
        />
      )}
    </div>
  );
}
