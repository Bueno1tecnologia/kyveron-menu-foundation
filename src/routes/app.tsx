import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/AppSidebar";
import { AppTopbar } from "@/components/app/AppTopbar";

export const Route = createFileRoute("/app")({
  // Route guard scaffold — real auth check is wired into AuthProvider.
  // On the published app this will validate the session before the route loads.
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    // Placeholder: hook real auth state here once backend is connected.
    // if (!isAuthenticated) throw redirect({ to: "/login" });
    void redirect; // keep import for future use
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          <AppTopbar />
          <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
