import { cn } from "@/lib/utils";

export function Logo({ className, variant = "default" }: { className?: string; variant?: "default" | "light" }) {
  const fg = variant === "light" ? "text-sidebar-foreground" : "text-foreground";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-soft">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path d="M4 13l1.6-4.5A3 3 0 0 1 8.4 6.5h7.2a3 3 0 0 1 2.8 2L20 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="3" y="13" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="7.5" cy="19.5" r="1.5" fill="currentColor" />
          <circle cx="16.5" cy="19.5" r="1.5" fill="currentColor" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
      </span>
      <span className={cn("font-semibold tracking-tight", fg)}>
        GarageFlow<span className="text-muted-foreground font-normal"> UK</span>
      </span>
    </div>
  );
}
