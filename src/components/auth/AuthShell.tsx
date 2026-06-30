import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left — form */}
      <div className="flex flex-col bg-background">
        <header className="flex items-center justify-between px-6 py-5">
          <Logo />
          <LanguageSwitcher />
        </header>
        <main className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-7">{children}</div>
            <div className="mt-6 text-sm text-muted-foreground">{footer}</div>
          </div>
        </main>
      </div>
      {/* Right — brand */}
      <div className="relative hidden overflow-hidden bg-gradient-brand lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_20%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <div />
          <div>
            <p className="text-2xl font-semibold leading-snug">
              “Em menos de um minuto tinha o meu cardápio pronto para os clientes.”
            </p>
            <p className="mt-4 text-sm opacity-80">— Restaurante Casa do Mar, Cascais</p>
          </div>
          <div className="flex items-center gap-2 text-xs opacity-70">
            <Link to="/" className="hover:opacity-100">Kyveron · Menu</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
