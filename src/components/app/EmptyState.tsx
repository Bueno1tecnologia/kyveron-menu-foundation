import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  secondary?: ReactNode;
  className?: string;
}

/**
 * Reusable empty-state block: icon badge + title + description + primary action.
 * Uses the brand gradient badge and dashed card treatment for a consistent
 * "nothing here yet" look across the platform.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondary,
  className,
}: EmptyStateProps) {
  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl border-dashed border-border/70 bg-gradient-soft px-6 py-14 text-center shadow-none animate-fade-in",
        className,
      )}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-25 blur-2xl" aria-hidden />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow transition-transform duration-300 hover:scale-105">
          <Icon className="h-7 w-7" />
        </div>
      </div>
      <div className="max-w-md space-y-2">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="mt-1">{action}</div> : null}
      {secondary ? <div className="mt-1 text-xs text-muted-foreground">{secondary}</div> : null}
    </Card>
  );
}
