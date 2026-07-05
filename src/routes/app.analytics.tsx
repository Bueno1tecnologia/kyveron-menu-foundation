import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/app/EmptyState";
import { StatsSkeleton } from "@/components/app/LoadingSkeletons";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";

export const Route = createFileRoute("/app/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const { t } = useTranslation();
  const loading = useSimulatedLoading();

  return (
    <div className="mx-auto max-w-6xl animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("nav.analytics")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("analyticsPage.subtitle", "Acompanhe visualizações, pedidos e desempenho dos cardápios.")}
        </p>
      </header>

      {loading ? (
        <StatsSkeleton count={4} />
      ) : (
        <EmptyState
          icon={BarChart3}
          title={t("analyticsPage.emptyTitle", "Ainda não existem métricas.")}
          description={t(
            "analyticsPage.emptyDesc",
            "As estatísticas aparecerão aqui assim que o seu cardápio começar a receber visitas.",
          )}
          action={
            <Button asChild size="lg" className="bg-gradient-brand shadow-glow">
              <Link to="/app/create">
                <Sparkles className="h-4 w-4" />
                {t("analyticsPage.cta", "Criar cardápio")}
              </Link>
            </Button>
          }
        />
      )}
    </div>
  );
}
