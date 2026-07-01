import { z } from "zod";
import type { TFunction } from "i18next";

/**
 * Zod schemas for the auth flow. Messages are keyed against the i18n
 * dictionary so validation feedback stays in the user's language.
 */
export const signInSchema = (t: TFunction) =>
  z.object({
    email: z
      .string({ required_error: t("validation.required") })
      .trim()
      .min(1, t("validation.required"))
      .email(t("validation.emailInvalid"))
      .max(255),
    password: z
      .string({ required_error: t("validation.required") })
      .min(1, t("validation.required"))
      .max(128),
    remember: z.boolean().optional(),
  });

const strongPassword = (t: TFunction) =>
  z
    .string({ required_error: t("validation.required") })
    .min(8, t("validation.passwordMin"))
    .max(128)
    .regex(/[A-Z]/, t("validation.passwordStrength"))
    .regex(/[a-z]/, t("validation.passwordStrength"))
    .regex(/[0-9]/, t("validation.passwordStrength"));

export const signUpSchema = (t: TFunction) =>
  z
    .object({
      name: z
        .string({ required_error: t("validation.required") })
        .trim()
        .min(2, t("validation.nameMin"))
        .max(80),
      email: z
        .string({ required_error: t("validation.required") })
        .trim()
        .min(1, t("validation.required"))
        .email(t("validation.emailInvalid"))
        .max(255),
      password: strongPassword(t),
      confirmPassword: z.string({ required_error: t("validation.required") }),
      acceptTerms: z.literal(true, {
        errorMap: () => ({ message: t("validation.termsRequired") }),
      }),
    })
    .refine((d) => d.password === d.confirmPassword, {
      path: ["confirmPassword"],
      message: t("validation.passwordMismatch"),
    });

export const forgotPasswordSchema = (t: TFunction) =>
  z.object({
    email: z
      .string({ required_error: t("validation.required") })
      .trim()
      .min(1, t("validation.required"))
      .email(t("validation.emailInvalid"))
      .max(255),
  });

export const resetPasswordSchema = (t: TFunction) =>
  z
    .object({
      password: strongPassword(t),
      confirmPassword: z.string({ required_error: t("validation.required") }),
    })
    .refine((d) => d.password === d.confirmPassword, {
      path: ["confirmPassword"],
      message: t("validation.passwordMismatch"),
    });

export type SignInValues = z.infer<ReturnType<typeof signInSchema>>;
export type SignUpValues = z.infer<ReturnType<typeof signUpSchema>>;
export type ForgotPasswordValues = z.infer<ReturnType<typeof forgotPasswordSchema>>;
export type ResetPasswordValues = z.infer<ReturnType<typeof resetPasswordSchema>>;
