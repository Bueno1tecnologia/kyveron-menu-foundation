import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";

import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { FormAlert } from "@/components/auth/FormAlert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { resetPasswordSchema, type ResetPasswordValues } from "@/lib/auth-schemas";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Nova palavra-passe — Kyveron Menu" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { t } = useTranslation();
  const { updatePassword } = useAuth();
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema(t)),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onBlur",
  });

  async function onSubmit(values: ResetPasswordValues) {
    setFormError(null);
    try {
      await updatePassword(values.password);
      setDone(true);
    } catch {
      setFormError(t("auth.genericError"));
    }
  }

  if (done) {
    return (
      <AuthShell>
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10 text-success">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
            {t("auth.resetSuccess")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("auth.resetSuccessDesc")}</p>
          <Link
            to="/login"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-gradient-brand px-5 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-95"
          >
            {t("common.signIn")}
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="space-y-1.5">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {t("auth.resetTitle")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("auth.resetSubtitle")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 flex flex-col gap-4">
        {formError && <FormAlert>{formError}</FormAlert>}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">{t("common.password")}</Label>
          <PasswordInput
            id="password"
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirmPassword">{t("common.confirmPassword")}</Label>
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

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
            t("auth.updatePassword")
          )}
        </Button>
      </form>
    </AuthShell>
  );
}
