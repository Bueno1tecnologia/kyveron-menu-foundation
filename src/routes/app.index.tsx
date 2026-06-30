import { Link, createFileRoute } from "@tanstack/react-router";
import { BarChart3, Eye, Plus, UtensilsCrossed, Wand2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/app/")({
  component: DashboardHome,
});

function DashboardHome() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const stats = [
    { label: t("dashboard.statMenus"), value: "0", icon: UtensilsCrossed },
    { label: t("dashboard.statViews"), value: "0", icon: Eye },
    { label: t("dashboard.statItems"), value: "0", icon: BarChart3 },
    { label: t("dashboard.statRevenue"), value: "—", icon: Wand2 },
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("dashboard.welcome")}{user?.name ? `, ${user.name}` : ""}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("dashboard.subtitle")}</p>
        </div>
        <Button asChild className="shrink-0 bg-gradient-brand text-primary-foreground hover:opacity-95">
          <Link to="/app/menus">
            <Plus className="mr-1 h-4 w-4" />
            {t("dashboard.createMenu")}
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="rounded-2xl border-border/60 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </span>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl border-dashed border-border bg-gradient-soft p-10 text-center shadow-none">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
          <Wand2 className="h-5 w-5" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-foreground">{t("dashboard.emptyTitle")}</h2>
        <p className="mx-auto mt-1.5 max-w-md text-sm text-muted-foreground">
          {t("dashboard.emptyDesc")}
        </p>
        <Button asChild className="mt-5 bg-gradient-brand text-primary-foreground hover:opacity-95">
          <Link to="/app/menus">
            <Plus className="mr-1 h-4 w-4" />
            {t("dashboard.createMenu")}
          </Link>
        </Button>
      </Card>

      <div>
        <h3 className="text-sm font-semibold text-foreground">{t("dashboard.recentActivity")}</h3>
        <Card className="mt-3 rounded-2xl border-border/60 p-6 text-sm text-muted-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <span>{t("dashboard.noActivity")}</span>
            <Badge variant="secondary" className="bg-muted text-muted-foreground">v0.1</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}
