import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Globe, Loader2, Lock, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
  };

  const rows = [
    {
      key: "language",
      icon: Globe,
      title: t("common.language"),
      desc: "Português · English · Español",
      control: <LanguageSwitcher variant="outline" />,
    },
    {
      key: "notifications",
      icon: Bell,
      title: t("settingsPage.notifications", "Notificações por email"),
      desc: t("settingsPage.notificationsDesc", "Receba atualizações importantes da sua conta."),
      control: <Switch checked={notifications} onCheckedChange={setNotifications} />,
    },
    {
      key: "dark",
      icon: Moon,
      title: t("settingsPage.darkMode", "Modo escuro"),
      desc: t("settingsPage.darkModeDesc", "Reduza o cansaço visual em ambientes escuros."),
      control: <Switch checked={darkMode} onCheckedChange={setDarkMode} />,
    },
    {
      key: "security",
      icon: Lock,
      title: t("settingsPage.security", "Segurança da conta"),
      desc: t("settingsPage.securityDesc", "Alterar palavra-passe e sessões ativas."),
      control: (
        <Button variant="outline" size="sm">
          {t("settingsPage.manage", "Gerir")}
        </Button>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("nav.settings")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("settingsPage.subtitle", "Preferências da sua conta.")}
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {rows.map((r) => (
          <Card
            key={r.key}
            className="flex flex-col gap-3 rounded-2xl border-border/60 p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <r.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{r.title}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
            </div>
            <div className="shrink-0 sm:ml-4">{r.control}</div>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-brand shadow-glow transition hover:opacity-95"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("common.save")}
        </Button>
      </div>
    </div>
  );
}
