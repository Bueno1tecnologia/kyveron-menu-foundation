import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, LifeBuoy, Mail, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";

export const Route = createFileRoute("/app/support")({
  component: SupportPage,
});

function SupportPage() {
  const { t } = useTranslation();
  const loading = useSimulatedLoading();

  const channels = [
    {
      key: "chat",
      icon: MessageCircle,
      title: t("supportPage.chat.title", "Chat ao vivo"),
      desc: t("supportPage.chat.desc", "Fale connosco em tempo real, dias úteis 9h–19h."),
      cta: t("supportPage.chat.cta", "Iniciar conversa"),
    },
    {
      key: "email",
      icon: Mail,
      title: t("supportPage.email.title", "Email"),
      desc: t("supportPage.email.desc", "Respondemos em até 24 horas úteis."),
      cta: "suporte@kyveron.menu",
    },
    {
      key: "docs",
      icon: BookOpen,
      title: t("supportPage.docs.title", "Base de conhecimento"),
      desc: t("supportPage.docs.desc", "Guias, tutoriais e boas práticas."),
      cta: t("supportPage.docs.cta", "Abrir documentação"),
    },
  ];

  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <header className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
          <LifeBuoy className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("nav.support")}
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {t("supportPage.subtitle", "Estamos aqui para ajudar sempre que precisar.")}
          </p>
        </div>
      </header>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="rounded-2xl border-border/60 p-6 shadow-sm">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="mt-4 h-4 w-1/2" />
              <Skeleton className="mt-2 h-3 w-4/5" />
              <Skeleton className="mt-6 h-9 w-full rounded-lg" />
            </Card>
          ))}
        </div>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((c) => (
            <Card
              key={c.key}
              className="group flex flex-col gap-3 rounded-2xl border-border/60 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
              <Button variant="outline" className="mt-auto w-full transition hover:bg-primary hover:text-primary-foreground">
                {c.cta}
              </Button>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
}
