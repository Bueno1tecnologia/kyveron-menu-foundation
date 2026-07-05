import { Link, useRouterState } from "@tanstack/react-router";
import {
  Building2,
  CreditCard,
  LayoutDashboard,
  LayoutTemplate,
  LifeBuoy,
  Settings,
  Sparkles,
  UserCircle,
  UtensilsCrossed,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo";

export function AppSidebar() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const items = [
    { title: t("nav.dashboard"), url: "/app", icon: LayoutDashboard },
    { title: t("nav.createWithAI"), url: "/app/create", icon: Sparkles, highlight: true },
    { title: t("nav.menus"), url: "/app/menus", icon: UtensilsCrossed },
    { title: t("nav.establishments"), url: "/app/establishments", icon: Building2 },
    { title: t("nav.subscription"), url: "/app/subscription", icon: CreditCard },
    { title: t("nav.support"), url: "/app/support", icon: LifeBuoy },
    { title: t("nav.settings"), url: "/app/settings", icon: Settings },
    { title: t("nav.profile"), url: "/app/profile", icon: UserCircle },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-3">
        <Logo to="/app" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active =
                  item.url === "/app" ? pathname === "/app" : pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className={
                        item.highlight
                          ? "data-[active=false]:text-primary data-[active=false]:hover:bg-primary/10"
                          : undefined
                      }
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3">
        <div className="rounded-xl border border-border/70 bg-gradient-soft p-3 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">Kyveron · Beta</p>
          <p className="mt-0.5">Versão 0.1</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
