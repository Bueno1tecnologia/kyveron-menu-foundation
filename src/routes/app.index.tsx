import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  Copy,
  CreditCard,
  Eye,
  FileEdit,
  Pencil,
  Plus,
  QrCode,
  ShoppingBag,
  Sparkles,
  UserCircle,
  UtensilsCrossed,
  Wand2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/")({
  component: DashboardHome,
});

// Interface-only preview data. Real data will come from the backend.
const recentMenus: Array<never> = [];
const recentActivity: Array<never> = [];

function DashboardHome() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const stats: Array<{
    key: string;
    label: string;
    value: string;
    desc: string;
    delta?: string;
    trend?: "up" | "down" | "neutral";
    icon: LucideIcon;
  }> = [
    {
      key: "menus",
      label: t("dashboard.stats.menus"),
      value: "0",
      desc: t("dashboard.stats.menusDesc"),
      icon: UtensilsCrossed,
    },
    {
      key: "views",
      label: t("dashboard.stats.views"),
      value: "0",
      desc: t("dashboard.stats.viewsDesc"),
      icon: Eye,
    },
    {
      key: "orders",
      label: t("dashboard.stats.orders"),
      value: "0",
      desc: t("dashboard.stats.ordersDesc"),
      icon: ShoppingBag,
    },
    {
      key: "establishments",
      label: t("dashboard.stats.establishments"),
      value: "0",
      desc: t("dashboard.stats.establishmentsDesc"),
      icon: Building2,
    },
    {
      key: "plan",
      label: t("dashboard.stats.plan"),
      value: "Starter",
      desc: t("dashboard.stats.planDesc"),
      icon: Sparkles,
    },
  ];

  const quickActions: Array<{
    key: string;
    label: string;
    to: string;
    icon: LucideIcon;
  }> = [
    { key: "createMenu", label: t("dashboard.actions.createMenu"), to: "/app/create", icon: UtensilsCrossed },
    { key: "newEstablishment", label: t("dashboard.actions.newEstablishment"), to: "/app/establishments", icon: Building2 },
    { key: "generateQR", label: t("dashboard.actions.generateQR"), to: "/app/menus", icon: QrCode },
    { key: "manageSubscription", label: t("dashboard.actions.manageSubscription"), to: "/app/subscription", icon: CreditCard },
    { key: "editProfile", label: t("dashboard.actions.editProfile"), to: "/app/profile", icon: UserCircle },
  ];

  const hasMenus = recentMenus.length > 0;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 animate-fade-in">
      {/* Welcome hero + primary CTA */}
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-soft p-6 shadow-sm sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-primary/20 opacity-40 blur-3xl" />

        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="min-w-0">
            <Badge
              variant="secondary"
              className="mb-3 gap-1.5 border-primary/20 bg-primary/10 text-primary"
            >
              <Sparkles className="h-3 w-3" />
              Kyveron AI
            </Badge>
            <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {t("dashboard.welcome")}
              {user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              {t("dashboard.subtitle")}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 lg:items-end">
            <Button
              asChild
              size="lg"
              className="group h-12 gap-2 rounded-xl bg-gradient-brand px-5 text-base font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 hover:shadow-lg"
            >
              <Link to="/app/create">
                <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
                {t("dashboard.createWithAI")}
              </Link>
            </Button>
            <p className="max-w-xs text-xs text-muted-foreground lg:text-right">
              {t("dashboard.createWithAIHint")}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((s) => (
          <Card
            key={s.key}
            className="group rounded-2xl border-border/60 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              {s.value}
            </p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <p className="truncate text-xs text-muted-foreground">{s.desc}</p>
              {s.delta ? (
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 text-[11px] font-semibold",
                    s.trend === "down" ? "text-destructive" : "text-emerald-600 dark:text-emerald-400",
                  )}
                >
                  <ArrowUpRight className="h-3 w-3" />
                  {s.delta}
                </span>
              ) : null}
            </div>
          </Card>
        ))}
      </section>

      {/* Recent menus + activity */}
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl border-border/60 p-6 shadow-sm lg:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                {t("dashboard.recentMenus")}
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t("dashboard.recentMenusDesc")}
              </p>
            </div>
            <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
              <Link to="/app/menus">
                {t("common.viewAll")}
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>

          {hasMenus ? null : (
            <EmptyMenus />
          )}
        </Card>

        <Card className="rounded-2xl border-border/60 p-6 shadow-sm">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              {t("dashboard.recentActivity")}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {t("dashboard.recentActivityDesc")}
            </p>
          </div>

          {recentActivity.length === 0 ? (
            <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/70 bg-muted/30 py-10 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BarChart3 className="h-5 w-5" />
              </div>
              <p className="text-xs text-muted-foreground">
                {t("dashboard.noActivity")}
              </p>
            </div>
          ) : null}
        </Card>
      </section>

      {/* Quick actions */}
      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              {t("dashboard.quickActions")}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {t("dashboard.quickActionsDesc")}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {quickActions.map((a) => (
            <Button
              key={a.key}
              asChild
              variant="outline"
              className="group h-auto flex-col items-start gap-2 rounded-2xl border-border/60 bg-card p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <Link to={a.to}>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-brand text-primary-foreground shadow-sm transition group-hover:shadow-glow">
                  <a.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {a.label}
                </span>
              </Link>
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}

function EmptyMenus() {
  const { t } = useTranslation();
  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border/70 bg-gradient-soft px-6 py-12 text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-30 blur-2xl" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
          <Wand2 className="h-7 w-7" />
        </div>
      </div>
      <div>
        <h3 className="text-base font-semibold text-foreground">
          {t("dashboard.empty.title")}
        </h3>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
          {t("dashboard.empty.desc")}
        </p>
      </div>
      <Button
        asChild
        className="mt-1 h-11 gap-2 rounded-xl bg-gradient-brand px-5 font-semibold text-primary-foreground shadow-glow hover:opacity-95"
      >
        <Link to="/app/create">
          <Plus className="h-4 w-4" />
          {t("dashboard.empty.cta")}
        </Link>
      </Button>

      {/* Feature hints */}
      <div className="mt-4 grid w-full max-w-md grid-cols-3 gap-2 text-[11px] text-muted-foreground">
        {[
          { icon: Pencil, label: t("common.edit") },
          { icon: Copy, label: t("common.duplicate") },
          { icon: QrCode, label: t("common.qrCode") },
        ].map((f) => (
          <div
            key={f.label}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-border/50 bg-background/60 px-2 py-1.5"
          >
            <f.icon className="h-3 w-3" />
            {f.label}
          </div>
        ))}
      </div>

      {/* Hidden reference: keeps FileEdit import for future menu row usage */}
      <FileEdit className="hidden" aria-hidden />
    </div>
  );
}
