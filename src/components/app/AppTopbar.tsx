import { Bell, Search, HelpCircle } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "../ThemeToggle";
import { toast } from "sonner";

export function AppTopbar({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/85 px-5 py-3 backdrop-blur">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="truncate text-[15px] font-semibold tracking-tight">{title}</h1>
        </div>
        {subtitle && <div className="truncate text-xs text-muted-foreground">{subtitle}</div>}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button 
          onClick={() => toast.info("Press ⌘K to open search")}
          className="hidden items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground sm:flex hover:text-foreground transition-colors"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Plate, customer or job…</span>
          <kbd className="rounded border border-border px-1 py-0.5 font-mono text-[10px]">⌘K</kbd>
        </button>
        {actions}
        <ThemeToggle />
        <button
          onClick={() => toast.info("Help center opening soon")}
          className="rounded-md border border-border bg-card p-1.5 text-muted-foreground hover:text-foreground transition"
          aria-label="Help"
        >
          <HelpCircle className="h-4 w-4" />
        </button>
        <button
          onClick={() => toast.info("No new notifications")}
          className="relative rounded-md border border-border bg-card p-1.5 text-muted-foreground hover:text-foreground transition"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>
      </div>
    </header>
  );
}
