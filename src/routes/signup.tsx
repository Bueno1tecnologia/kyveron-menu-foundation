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
import { signUpSchema, type SignUpValues } from "@/lib/auth-schemas";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Criar conta — Kyveron Menu" }] }),
  component: SignupPage,
});

function SignupPage() {
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false as unknown as true,
    },
    mode: "onBlur",
  });

  async function onSubmit(values: SignUpValues) {
    setFormError(null);
    try {
      await signUp(values.name, values.email, values.password);
      navigate({ to: "/app" });
    } catch {
      setFormError(t("auth.genericError"));
    }
  }

  return (
    <AuthShell>
      <div className="space-y-1.5">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {t("auth.signUpTitle")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("auth.signUpSubtitle")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 flex flex-col gap-4">
        {formError && <FormAlert>{formError}</FormAlert>}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">{t("common.name")}</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

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
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

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

        <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <Checkbox
            className="mt-0.5"
            checked={watch("acceptTerms") === true}
            onCheckedChange={(v) =>
              setValue("acceptTerms", (v === true) as unknown as true, { shouldValidate: true })
            }
            aria-invalid={!!errors.acceptTerms}
          />
          <span className="leading-snug">
            {t("auth.acceptTerms")}{" "}
            <a href="#" className="font-medium text-foreground hover:underline">
              {t("auth.termsOfUse")}
            </a>{" "}
            {t("auth.and")}{" "}
            <a href="#" className="font-medium text-foreground hover:underline">
              {t("auth.privacyPolicy")}
            </a>
            .
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="-mt-2 text-xs text-destructive">{errors.acceptTerms.message}</p>
        )}

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
            t("common.signUp")
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t("auth.haveAccount")}{" "}
        <Link to="/login" className="font-medium text-foreground hover:underline">
          {t("common.signIn")}
        </Link>
      </p>
    </AuthShell>
  );
}
