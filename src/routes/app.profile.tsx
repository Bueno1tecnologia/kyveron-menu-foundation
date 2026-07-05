import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, UserCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth-context";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";

export const Route = createFileRoute("/app/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const loading = useSimulatedLoading();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  const initials = (user?.name ?? "U")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleSave = async () => {
    setSaving(true);
    // Simulated save — replace with real backend call.
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
  };

  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("nav.profile")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("profilePage.subtitle", "Gerir os seus dados pessoais e preferências.")}
        </p>
      </header>

      {loading ? (
        <Card className="rounded-2xl border-border/60 p-6 shadow-sm animate-fade-in">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </Card>
      ) : (
        <Card className="rounded-2xl border-border/60 p-6 shadow-sm transition hover:shadow-md">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-gradient-brand text-base font-semibold text-primary-foreground">
                {initials || <UserCircle className="h-6 w-6" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-base font-medium text-foreground">{user?.name ?? "—"}</p>
              <p className="text-sm text-muted-foreground">{user?.email ?? "—"}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="profile-name">{t("common.name")}</Label>
              <Input
                id="profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email">{t("common.email")}</Label>
              <Input
                id="profile-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
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
        </Card>
      )}
    </div>
  );
}
