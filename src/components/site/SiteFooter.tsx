import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-5">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            The operating system for British workshops. Built in the UK, designed around how garages really work.
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> All systems operational
            </span>
            <span>ISO 27001 in progress</span>
          </div>
        </div>
        <Col title="Product" links={[
          ["DVLA Lookup", "/dvla"], ["Features", "/features"], ["Pricing", "/pricing"], ["Changelog", "#"],
        ]} />
        <Col title="Company" links={[
          ["Customers", "/customers"], ["Careers", "#"], ["Contact", "#"], ["Press", "#"],
        ]} />
        <Col title="Legal" links={[
          ["Privacy", "#"], ["Terms", "#"], ["DPA", "#"], ["Security", "#"],
        ]} />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:px-6">
          <p>© {new Date().getFullYear()} GarageFlow UK Ltd. Registered in England & Wales. Company no. 14820917.</p>
          <p>Made in Manchester · VAT GB 421 8830 12</p>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</div>
      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
        {links.map(([label, href]) => (
          <li key={label}>
            {href.startsWith("/") ? <Link to={href} className="hover:text-foreground transition">{label}</Link> : <a href={href} className="hover:text-foreground transition">{label}</a>}
          </li>
        ))}
      </ul>
    </div>
  );
}
