import { createFileRoute, Link } from "@tanstack/react-router";
import { UtensilsCrossed, Plus, LayoutTemplate } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/app/EmptyState";
import { ListSkeleton } from "@/components/app/LoadingSkeletons";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";

export const Route = createFileRoute("/app/menus")({
  component: MenusPage,
});

function MenusPage() {
  const { t } = useTranslation();
  const loading = useSimulatedLoading();

  return (
    <div className="mx-auto max-w-6xl animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("nav.menus")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("menusPage.subtitle", "Gerir todos os seus cardápios digitais.")}
        </p>
      </header>

      {loading ? (
        <ListSkeleton count={4} />
      ) : (
        <EmptyState
          icon={UtensilsCrossed}
          title={t("menusPage.emptyTitle", "Ainda não tem cardápios criados.")}
          description={t(
            "menusPage.emptyDesc",
            "Crie o seu primeiro cardápio em segundos com a Inteligência Artificial da Kyveron.",
          )}
          action={
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                asChild
                size="lg"
                className="bg-gradient-brand shadow-glow transition hover:opacity-95"
              >
                <Link to="/app/create">
                  <Plus className="h-4 w-4" />
                  {t("menusPage.cta", "Criar Primeiro Cardápio")}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/app/templates">
                  <LayoutTemplate className="h-4 w-4" />
                  {t("menusPage.browseTemplates", "Explorar templates")}
                </Link>
              </Button>
            </div>
          }
        />
      )}
    </div>
  );
}
