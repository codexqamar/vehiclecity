import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Search,
  Car,
  Users,
  ClipboardList,
  Calendar,
  Receipt,
  Truck,
  BarChart3,
  Settings,
  ChevronsUpDown,
  Plus,
  LogOut,
} from "lucide-react";

const NAV = [
  {
    group: "Workspace",
    items: [
      { to: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
      { to: "/app/lookup", label: "DVLA Lookup", icon: Search, kbd: "L" },
      { to: "/app/vehicles", label: "Vehicles", icon: Car },
      { to: "/app/customers", label: "Customers", icon: Users },
    ],
  },
  {
    group: "Operations",
    items: [
      { to: "/app/workshop", label: "Workshop", icon: ClipboardList },
      { to: "/app/calendar", label: "Calendar", icon: Calendar },
      { to: "/app/invoices", label: "Invoices", icon: Receipt },
      { to: "/app/fleet", label: "Fleet", icon: Truck },
    ],
  },
  {
    group: "Insights",
    items: [
      { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
      { to: "/app/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out successfully");
      navigate({ to: "/auth" });
    } catch (error: any) {
      toast.error(error.message || "Error signing out");
    }
  };

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
      {/* Workspace switcher */}
      <button 
        onClick={() => toast.info("Workspace switching coming soon")}
        className="flex items-center gap-2 border-b border-sidebar-border px-3 py-3 text-left hover:bg-sidebar-accent/60 transition"
      >
        <Logo variant="light" />
        <ChevronsUpDown className="ml-auto h-3.5 w-3.5 text-sidebar-foreground/60" />
      </button>

      <div className="px-3 py-3">
        <button 
          onClick={() => toast.info("Press ⌘K to open search")}
          className="flex w-full items-center gap-2 rounded-md bg-sidebar-accent px-2.5 py-1.5 text-[13px] text-sidebar-foreground/80 hover:bg-sidebar-accent/80 transition"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search or jump to…</span>
          <kbd className="ml-auto rounded border border-sidebar-border px-1.5 py-0.5 text-[10px] font-mono text-sidebar-foreground/60">
            ⌘K
          </kbd>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        {NAV.map((g) => (
          <div key={g.group} className="mt-2">
            <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
              {g.group}
            </div>
            <ul className="space-y-0.5">
              {g.items.map((it) => {
                const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
                return (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      className={cn(
                        "group flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] transition",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                      )}
                    >
                      <it.icon className="h-4 w-4 opacity-80" />
                      <span className="truncate">{it.label}</span>
                      {it.kbd && (
                        <kbd className="ml-auto rounded border border-sidebar-border px-1.5 py-0.5 text-[10px] font-mono text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70">
                          {it.kbd}
                        </kbd>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-foreground uppercase">
            {user?.email?.[0] || "U"}
          </div>
          <div className="min-w-0 text-[13px]">
            <div className="truncate font-medium text-sidebar-foreground">
              {user?.user_metadata?.business_name || "Workspace User"}
            </div>
            <div className="truncate text-[11px] text-sidebar-foreground/60">
              {user?.email || "user@example.com"}
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="ml-auto rounded-md p-1.5 text-sidebar-foreground/60 hover:bg-destructive/10 hover:text-destructive transition-colors"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
