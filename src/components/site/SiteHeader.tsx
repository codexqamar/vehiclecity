import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link to="/"><Logo /></Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link to="/features" className="hover:text-foreground transition">Features</Link>
            <Link to="/pricing" className="hover:text-foreground transition">Pricing</Link>
            <Link to="/customers" className="hover:text-foreground transition">Customers</Link>
            <Link to="/dvla" className="hover:text-foreground transition">DVLA Lookup</Link>
            <a href="#faq" className="hover:text-foreground transition">FAQ</a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/app" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline">Sign in</Link>
          <Link to="/app" className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground shadow-soft hover:bg-primary/90 transition">
            Open app
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
