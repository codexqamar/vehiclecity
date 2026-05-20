import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  const fg = variant === "light" ? "text-sidebar-foreground" : "text-foreground";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex h-8 w-8 items-center justify-center shrink-0">
        {/* Light Mode Logo */}
        <img
          src="/Light.png"
          alt="VehicleCity Logo"
          className={cn(
            "h-full w-full object-contain transition-opacity duration-300",
            variant === "light" ? "hidden" : "dark:hidden",
          )}
        />
        {/* Dark Mode Logo */}
        <img
          src="/Dark.png"
          alt="VehicleCity Logo"
          className={cn(
            "h-full w-full object-contain transition-opacity duration-300",
            variant === "light" ? "block" : "hidden dark:block",
          )}
        />
      </div>
      <span className={cn("font-semibold tracking-tight", fg)}>
        VehicleCity<span className="text-muted-foreground font-normal"> UK</span>
      </span>
    </div>
  );
}
