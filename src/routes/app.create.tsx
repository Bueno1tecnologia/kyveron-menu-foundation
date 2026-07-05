import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import {
  Beef,
  Cake,
  Check,
  CircleDashed,
  Coffee,
  Croissant,
  Fish,
  IceCream,
  Loader2,
  Pizza,
  Salad,
  Sparkles,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/create")({
  validateSearch: z.object({ template: z.string().optional() }).parse,
  component: CreateMenuPage,
});

const MIN_PROMPT_LENGTH = 40;
const MAX_PROMPT_LENGTH = 2000;

type ExampleKey =
  | "burger"
  | "pizzeria"
  | "restaurant"
  | "pastry"
  | "bakery"
  | "cafe"
  | "sushi"
  | "acai"
  | "gelato"
  | "foodtruck";

const EXAMPLES: Array<{ key: ExampleKey; icon: LucideIcon }> = [
  { key: "burger", icon: Beef },
  { key: "pizzeria", icon: Pizza },
  { key: "restaurant", icon: UtensilsCrossed },
  { key: "pastry", icon: Cake },
  { key: "bakery", icon: Croissant },
  { key: "cafe", icon: Coffee },
  { key: "sushi", icon: Fish },
  { key: "acai", icon: Salad },
  { key: "gelato", icon: IceCream },
  { key: "foodtruck", icon: Truck },
];

const STEP_KEYS = [
  "analyzing",
  "identifying",
  "categories",
  "products",
  "prices",
  "identity",
  "layout",
  "finalizing",
] as const;

function CreateMenuPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const search = useSearch({ from: "/app/create" });
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showShortWarning, setShowShortWarning] = useState(false);

  // Pre-fill prompt when arriving from a template selection
  useEffect(() => {
    const key = search.template as ExampleKey | undefined;
    if (key && EXAMPLES.some((e) => e.key === key) && !prompt) {
      const text = t(`create.examples.${key}.prompt`);
      setPrompt(text);
      requestAnimationFrame(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.template]);

  const trimmed = prompt.trim();
  const isTooShort = trimmed.length > 0 && trimmed.length < MIN_PROMPT_LENGTH;
  const canGenerate = trimmed.length >= MIN_PROMPT_LENGTH && !isGenerating;

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Simulated stepper progression — real backend call will drive these steps.
  useEffect(() => {
    if (!isGenerating) return;
    if (currentStep >= STEP_KEYS.length) {
      const timer = window.setTimeout(() => {
        setIsGenerating(false);
        setCurrentStep(0);
        void navigate({ to: "/app/menus" });
      }, 700);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setCurrentStep((s) => s + 1), 850);
    return () => window.clearTimeout(timer);
  }, [isGenerating, currentStep, navigate]);

  const handleGenerate = () => {
    if (trimmed.length < MIN_PROMPT_LENGTH) {
      setShowShortWarning(true);
      textareaRef.current?.focus();
      return;
    }
    setShowShortWarning(false);
    setCurrentStep(0);
    setIsGenerating(true);
  };

  const handleExample = (key: ExampleKey) => {
    const text = t(`create.examples.${key}.prompt`);
    setPrompt(text);
    setShowShortWarning(false);
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    });
  };

  const progressValue = useMemo(
    () => Math.round((Math.min(currentStep, STEP_KEYS.length) / STEP_KEYS.length) * 100),
    [currentStep],
  );

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 animate-fade-in">
      {/* Header */}
      <header className="text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Kyveron AI
        </div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {t("create.title")}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
          {t("create.subtitle")}
        </p>
      </header>

      {/* Prompt editor */}
      <Card className="relative overflow-hidden rounded-3xl border-border/60 p-1 shadow-sm">
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-brand opacity-[0.06]" />
        <div className="relative rounded-[calc(theme(borderRadius.3xl)-4px)] bg-card p-5 sm:p-6">
          <label htmlFor="prompt" className="sr-only">
            {t("create.editorLabel")}
          </label>
          <Textarea
            id="prompt"
            ref={textareaRef}
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value.slice(0, MAX_PROMPT_LENGTH));
              if (showShortWarning) setShowShortWarning(false);
            }}
            placeholder={t("create.placeholder")}
            disabled={isGenerating}
            rows={9}
            className="min-h-[220px] resize-none rounded-2xl border-none bg-transparent p-3 text-base leading-relaxed shadow-none focus-visible:ring-0 sm:text-[15px]"
          />

          <div className="mt-4 flex flex-col items-stretch gap-3 border-t border-border/50 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>
                {trimmed.length}/{MAX_PROMPT_LENGTH}
              </span>
              {isTooShort || showShortWarning ? (
                <span className="text-destructive">
                  {t("create.tooShort", { min: MIN_PROMPT_LENGTH })}
                </span>
              ) : (
                <span className="hidden sm:inline">{t("create.hint")}</span>
              )}
            </div>

            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="group h-12 gap-2 rounded-xl bg-gradient-brand px-6 text-base font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 hover:shadow-lg disabled:opacity-60"
            >
              <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
              {t("create.cta")}
            </Button>
          </div>
        </div>
      </Card>

      {/* Examples */}
      <section aria-labelledby="examples-title">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h2 id="examples-title" className="text-sm font-semibold text-foreground">
              {t("create.examplesTitle")}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {t("create.examplesSubtitle")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.key}
              type="button"
              disabled={isGenerating}
              onClick={() => handleExample(ex.key)}
              className={cn(
                "group flex flex-col items-start gap-2 rounded-xl border border-border/60 bg-card p-3 text-left shadow-sm transition",
                "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
                "disabled:pointer-events-none disabled:opacity-50",
              )}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-gradient-brand group-hover:text-primary-foreground">
                <ex.icon className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium text-foreground">
                {t(`create.examples.${ex.key}.label`)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Generation progress dialog */}
      <Dialog open={isGenerating}>
        <DialogContent
          className="max-w-md rounded-3xl border-border/60 p-0 sm:max-w-lg"
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="relative overflow-hidden rounded-3xl">
            <div className="pointer-events-none absolute inset-0 bg-gradient-brand opacity-[0.08]" />
            <div className="relative p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-2xl bg-primary/40 opacity-60" />
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>
                <div className="min-w-0">
                  <DialogTitle className="text-base font-semibold">
                    {t("create.progress.title")}
                  </DialogTitle>
                  <DialogDescription className="text-xs">
                    {t("create.progress.subtitle")}
                  </DialogDescription>
                </div>
              </div>

              <div className="mt-6">
                <Progress value={progressValue} className="h-2" />
                <p className="mt-2 text-right text-xs text-muted-foreground">{progressValue}%</p>
              </div>

              <ol className="mt-4 space-y-1.5">
                {STEP_KEYS.map((key, index) => {
                  const state =
                    index < currentStep ? "done" : index === currentStep ? "active" : "pending";
                  return (
                    <li
                      key={key}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition",
                        state === "active" && "bg-primary/5 text-foreground",
                        state === "done" && "text-muted-foreground",
                        state === "pending" && "text-muted-foreground/70",
                      )}
                    >
                      <span className="flex h-5 w-5 items-center justify-center">
                        {state === "done" ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : state === "active" ? (
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        ) : (
                          <CircleDashed className="h-4 w-4" />
                        )}
                      </span>
                      <span
                        className={cn(
                          "truncate",
                          state === "active" && "font-medium text-foreground",
                        )}
                      >
                        {t(`create.progress.steps.${key}`)}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
