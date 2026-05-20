import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers · VehicleCity UK" },
      {
        name: "description",
        content: "Garages, MOT centres, fleets and dealerships running on VehicleCity.",
      },
      { property: "og:url", content: "/customers" },
    ],
    links: [{ rel: "canonical", href: "/customers" }],
  }),
  component: CustomersPage,
});

const STORIES = [
  {
    co: "Reliable Motors",
    loc: "Manchester",
    stat: "−48% admin time",
    body: "Sarah cut her front-desk admin in half and her team adopted the kanban in a week.",
  },
  {
    co: "Halton MOT Centre",
    loc: "Liverpool",
    stat: "+22% rebookings",
    body: "Automatic MOT reminders pulled lapsed customers back into the diary on day one.",
  },
  {
    co: "Northgate Fleet",
    loc: "Birmingham",
    stat: "69 vehicles managed",
    body: "A multi-fleet view that drivers actually use — without an SAP-style learning curve.",
  },
];

function CustomersPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Customers</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            UK garages, in their own words.
          </h1>
        </header>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STORIES.map((s) => (
            <article
              key={s.co}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="text-sm font-semibold">{s.co}</div>
              <div className="text-xs text-muted-foreground">{s.loc}</div>
              <div className="mt-6 text-2xl font-semibold tracking-tight">{s.stat}</div>
              <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
