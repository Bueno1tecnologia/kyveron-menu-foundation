import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Copy,
  Ellipsis,
  ExternalLink,
  MapPin,
  Pencil,
  QrCode,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";

import type { Establishment } from "@/lib/establishments-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  establishment: Establishment;
  onEdit: (e: Establishment) => void;
  onDelete: (e: Establishment) => void;
  onDuplicate: (e: Establishment) => void;
  onQrCode: (e: Establishment) => void;
}

function formatRelative(iso: string, locale: string): string {
  const then = new Date(iso).getTime();
  const diffMs = Date.now() - then;
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const minutes = Math.round(diffMs / 60000);
  if (Math.abs(minutes) < 60) return rtf.format(-minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(-hours, "hour");
  const days = Math.round(hours / 24);
  return rtf.format(-days, "day");
}

export function EstablishmentCard({
  establishment,
  onEdit,
  onDelete,
  onDuplicate,
  onQrCode,
}: Props) {
  const { t, i18n } = useTranslation();
  const isActive = establishment.status === "active";
  const initials = useMemo(
    () =>
      establishment.name
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("") || "K",
    [establishment.name],
  );

  return (
    <Card className="group relative flex flex-col overflow-hidden rounded-2xl border-border/70 bg-card p-0 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-elegant-lg">
      <div
        className="relative h-24 w-full"
        style={{
          background: establishment.branding.coverUrl
            ? `center/cover no-repeat url(${establishment.branding.coverUrl})`
            : `linear-gradient(135deg, ${establishment.branding.primaryColor}, ${establishment.branding.secondaryColor})`,
        }}
      >
        <div className="absolute right-3 top-3">
          <Badge
            variant="secondary"
            className={
              isActive
                ? "border-transparent bg-success/15 text-success"
                : "border-transparent bg-warning/20 text-warning-foreground"
            }
          >
            {isActive ? t("establishments.status.active") : t("establishments.status.draft")}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
          <div
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border/70 bg-background text-sm font-semibold text-foreground shadow-sm"
            style={{
              backgroundImage: establishment.branding.logoUrl
                ? `url(${establishment.branding.logoUrl})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!establishment.branding.logoUrl && initials}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-foreground">
              {establishment.name}
            </h3>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {t(`establishments.categories.${establishment.category}`)}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <Ellipsis className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(establishment)}>
                <Pencil className="mr-2 h-4 w-4" />
                {t("common.edit")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(establishment)}>
                <Copy className="mr-2 h-4 w-4" />
                {t("common.duplicate")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onQrCode(establishment)}>
                <QrCode className="mr-2 h-4 w-4" />
                {t("common.qrCode")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(establishment)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {t("establishments.actions.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          {establishment.address.city && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {establishment.address.city}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <UtensilsCrossed className="h-3.5 w-3.5" />
            {t("establishments.card.menusCount", { count: establishment.menusCount })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5" />
            {t("establishments.card.updated", {
              when: formatRelative(establishment.updatedAt, i18n.language),
            })}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          <Button asChild size="sm" className="flex-1 min-w-[6rem]">
            <Link to="/app/menus" search={{ establishment: establishment.id } as never}>
              <ExternalLink className="h-4 w-4" />
              {t("establishments.actions.open")}
            </Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(establishment)}
            className="flex-1 min-w-[6rem]"
          >
            <Pencil className="h-4 w-4" />
            {t("common.edit")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
