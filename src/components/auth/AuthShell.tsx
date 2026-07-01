import type { ReactNode } from "react";

import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { AuthIllustration } from "@/components/auth/AuthIllustration";
import { useOnlineStatus } from "@/hooks/use-online-status";
import { useTranslation } from "react-i18next";
import { WifiOff } from "lucide-react";

/**
 * Two-column premium auth layout.
 * Left  — form area (logo header + form card).
 * Right — brand illustration (hidden on <lg).
 */
export function AuthShell({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const online = useOnlineStatus();

  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* Form side */}
      <div className="relative flex min-h-screen flex-col bg-background">
        <header className="flex items-center justify-between px-6 py-5 sm:px-10">
          <Logo />
          <LanguageSwitcher />
        </header>

        {!online && (
          <div
            role="status"
            className="mx-6 flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-xs font-medium text-warning-foreground sm:mx-10"
          >
            <WifiOff className="h-3.5 w-3.5" />
            <span>{t("auth.offline")}</span>
          </div>
        )}

        <main className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">{children}</div>
        </main>

        <footer className="px-6 py-6 text-xs text-muted-foreground sm:px-10">
          © {new Date().getFullYear()} Kyveron · Menu
        </footer>
      </div>

      {/* Illustration side */}
      <div className="relative hidden lg:block">
        <AuthIllustration />
      </div>
    </div>
  );
}
