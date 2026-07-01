import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { FormAlert } from "@/components/auth/FormAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth-context";
import { signInSchema, type SignInValues } from "@/lib/auth-schemas";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — Kyveron Menu" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema(t)),
    defaultValues: { email: "", password: "", remember: true },
    mode: "onBlur",
  });

  async function onSubmit(values: SignInValues) {
    setFormError(null);
    try {
      await signIn(values.email, values.password, values.remember);
      navigate({ to: "/app" });
    } catch {
      setFormError(t("auth.invalidCredentials"));
    }
  }

  return (
    <AuthShell>
      <div className="space-y-1.5">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {t("auth.signInTitle")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("auth.signInSubtitle")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 flex flex-col gap-4">
        {formError && <FormAlert>{formError}</FormAlert>}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">{t("common.email")}</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="voce@empresa.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t("common.password")}</Label>
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              {t("auth.forgotPassword")}
            </Link>
          </div>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <label className="flex select-none items-center gap-2 text-sm text-muted-foreground">
          <Checkbox
            checked={!!watch("remember")}
            onCheckedChange={(v) => setValue("remember", v === true)}
          />
          <span>{t("auth.rememberMe")}</span>
        </label>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 h-11 w-full bg-gradient-brand text-primary-foreground shadow-elegant transition-opacity hover:opacity-95"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("common.loading")}
            </>
          ) : (
            t("common.signIn")
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-11 w-full"
          onClick={() => navigate({ to: "/signup" })}
        >
          {t("common.signUp")}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t("auth.noAccount")}{" "}
        <Link to="/signup" className="font-medium text-foreground hover:underline">
          {t("common.signUp")}
        </Link>
      </p>
    </AuthShell>
  );
}
