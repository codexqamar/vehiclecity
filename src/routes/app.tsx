import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app/AppSidebar";
import { MobileNav } from "@/components/app/MobileNav";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/app")({
  beforeLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw redirect({
        to: "/auth",
      });
    }
    return { session };
  },
  head: () => ({
    meta: [{ title: "Workspace · VehicleCity UK" }, { name: "robots", content: "noindex" }],
  }),
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground overflow-hidden">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col h-screen">
        {/* Mobile Header */}
        <header className="flex h-14 items-center border-b border-border bg-background px-4 md:hidden shrink-0">
          <MobileNav />
          <div className="ml-4 font-semibold text-sm tracking-tight">VehicleCity UK</div>
        </header>
        
        <main className="flex-1 overflow-y-auto min-h-0 bg-surface/10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
