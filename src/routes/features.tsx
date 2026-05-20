import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features · VehicleCity UK" },
      {
        name: "description",
        content:
          "DVLA lookup, MOT tracking, workshop kanban, CRM, invoicing, fleet and analytics — built for UK garages.",
      },
      { property: "og:url", content: "/features" },
    ],
    links: [{ rel: "canonical", href: "/features" }],
  }),
  component: Features,
});

const SECTIONS = [
  {
    t: "DVLA Vehicle Lookup",
    b: "Live, cached lookups against the official DVLA Vehicle Enquiry Service. Search history, saved vehicles, rate limit handling and full audit trail.",
  },
  {
    t: "MOT & Tax tracking",
    b: "Per-vehicle MOT and tax dates with intelligent reminders. SMS and email with quiet hours, deliverability tracking and unsubscribe handling.",
  },
  {
    t: "Customer CRM",
    b: "One profile per customer. Vehicles, history, notes, tags and communication threads — never lose context between visits.",
  },
  {
    t: "Workshop kanban",
    b: "Booked → Diagnostics → In bay → Awaiting parts → Ready. Drag, drop, assign mechanic, gate on parts arrival.",
  },
  {
    t: "Calendar & scheduling",
    b: "Day, week and month views with bay capacity, mechanic availability and drag-and-drop rebooking.",
  },
  {
    t: "Invoicing & payments",
    b: "UK VAT-compliant invoices generated from job lines. Stripe payment links, PDF download, accountant exports.",
  },
  {
    t: "Fleet management",
    b: "Group vehicles into fleets. Bulk MOT and tax tracking, driver assignments, mileage logging and renewal alerts.",
  },
  {
    t: "Analytics",
    b: "Bay utilisation, technician throughput, conversion, revenue mix and lookup volume — without leaving the app.",
  },
];

function Features() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Features</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Every tool a UK garage actually needs.
          </h1>
          <p className="mt-4 text-muted-foreground">
            No bloat. No spreadsheets. One operating system for vehicles, customers, jobs and money.
          </p>
        </header>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
          {SECTIONS.map((s) => (
            <article key={s.t} className="bg-card p-6">
              <h2 className="font-semibold tracking-tight">{s.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/auth"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
          >
            Open the app →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
