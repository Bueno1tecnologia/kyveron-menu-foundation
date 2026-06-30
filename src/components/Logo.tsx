import { Link } from "@tanstack/react-router";

export function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="group flex items-center gap-2.5">
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
        <span className="text-sm font-bold text-primary-foreground">K</span>
        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          Kyveron
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Menu
        </span>
      </span>
    </Link>
  );
}
