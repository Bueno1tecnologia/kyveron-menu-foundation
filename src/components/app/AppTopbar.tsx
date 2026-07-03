import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, LogOut, Search, Settings, UserCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";

export function AppTopbar() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const initials = (user?.name ?? "U")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border/60 bg-background/80 px-3 backdrop-blur-md sm:gap-3 sm:px-5">
      <SidebarTrigger />
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("common.search")}
          className="h-9 rounded-lg border-border/70 bg-muted/40 pl-9"
        />
      </div>
      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <LanguageSwitcher />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 rounded-lg"
              aria-label={t("common.notifications")}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gradient-brand shadow-glow" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="border-b border-border/60 px-4 py-3">
              <p className="text-sm font-semibold text-foreground">
                {t("common.notifications")}
              </p>
            </div>
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              {t("dashboard.noNotifications")}
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 pl-1.5 pr-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-gradient-brand text-[11px] font-semibold text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left leading-tight md:block">
                <span className="block text-sm font-medium">{user?.name ?? "—"}</span>
                <span className="block text-[11px] text-muted-foreground">
                  {t("common.myPlan")}: Starter
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-60">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                <Badge
                  variant="secondary"
                  className="mt-2 w-fit bg-primary/10 text-[10px] font-medium text-primary"
                >
                  {t("common.myPlan")}: Starter
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="gap-2">
              <Link to="/app/profile">
                <UserCircle className="h-4 w-4" />
                {t("nav.profile")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="gap-2">
              <Link to="/app/settings">
                <Settings className="h-4 w-4" />
                {t("nav.settings")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await signOut();
                navigate({ to: "/" });
              }}
              className="gap-2 text-destructive focus:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              {t("common.signOut")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
