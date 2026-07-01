import { useTranslation } from "react-i18next";
import { Sparkles, QrCode, Utensils, Wifi } from "lucide-react";

/**
 * Premium illustration used on the right side of the auth pages.
 * Pure SVG + tokens — no external images, fully responsive and themable.
 */
export function AuthIllustration() {
  const { t } = useTranslation();

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-brand p-10 text-primary-foreground xl:p-14">
      {/* Ambient light layers */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_15%_15%,rgba(255,255,255,0.22),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_90%_90%,rgba(255,255,255,0.14),transparent_65%)]" />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(70% 60% at 50% 50%, black, transparent)",
        }}
      />

      {/* Top badge */}
      <div className="relative z-10 flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur">
        <Sparkles className="h-3.5 w-3.5" />
        <span>Kyveron AI</span>
      </div>

      {/* Center — Phone mock with menu */}
      <div className="relative z-10 mx-auto flex w-full max-w-sm items-center justify-center py-8">
        <div className="absolute -inset-8 rounded-[2rem] bg-white/5 blur-2xl" />
        <div className="relative w-full max-w-[280px] rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-white/90" />
              <div>
                <div className="h-2 w-16 rounded-full bg-white/80" />
                <div className="mt-1 h-1.5 w-10 rounded-full bg-white/40" />
              </div>
            </div>
            <Wifi className="h-3.5 w-3.5 opacity-70" />
          </div>

          <div className="space-y-2.5">
            {[
              { name: "Bacalhau à Brás", price: "€14.90", accent: true },
              { name: "Polvo à Lagareiro", price: "€18.50" },
              { name: "Bitoque Kyveron", price: "€12.00" },
              { name: "Pastel de Nata", price: "€2.20" },
            ].map((item) => (
              <div
                key={item.name}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 ${
                  item.accent ? "bg-white/95 text-primary" : "bg-white/10 text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                      item.accent ? "bg-primary/10" : "bg-white/15"
                    }`}
                  >
                    <Utensils className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-medium">{item.name}</span>
                </div>
                <span className="text-xs font-semibold tabular-nums">{item.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-white/10 px-3 py-2">
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider opacity-80">
              <QrCode className="h-3.5 w-3.5" />
              kyveron.menu/casa-do-mar
            </div>
          </div>
        </div>

        {/* Floating AI chip */}
        <div className="absolute -right-2 top-6 hidden rounded-2xl border border-white/20 bg-white/95 px-3 py-2 text-primary shadow-lg backdrop-blur sm:flex sm:items-center sm:gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <div className="text-[11px] leading-tight">
            <div className="font-semibold">AI</div>
            <div className="text-[10px] text-primary/70">Menu gerado</div>
          </div>
        </div>
      </div>

      {/* Bottom — headline */}
      <div className="relative z-10 max-w-md">
        <p className="text-2xl font-semibold leading-snug tracking-tight">{t("auth.heroTitle")}</p>
        <p className="mt-3 text-sm leading-relaxed opacity-80">{t("auth.heroSubtitle")}</p>
      </div>
    </div>
  );
}
