import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LayoutDashboard, Search, Car, Users, ClipboardList, Calendar, Receipt, Truck, BarChart3, Settings } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/app", label: "Overview", icon: LayoutDashboard },
  { to: "/app/lookup", label: "DVLA Lookup", icon: Search },
  { to: "/app/vehicles", label: "Vehicles", icon: Car },
  { to: "/app/customers", label: "Customers", icon: Users },
  { to: "/app/workshop", label: "Workshop", icon: ClipboardList },
  { to: "/app/calendar", label: "Calendar", icon: Calendar },
  { to: "/app/invoices", label: "Invoices", icon: Receipt },
  { to: "/app/fleet", label: "Fleet", icon: Truck },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-sidebar">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-sidebar-border">
            <Logo variant="light" />
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {NAV.map((it) => {
                const active = it.to === "/app" ? pathname === it.to : pathname.startsWith(it.to);
                return (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )}
                    >
                      <it.icon className="h-4 w-4" />
                      {it.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
