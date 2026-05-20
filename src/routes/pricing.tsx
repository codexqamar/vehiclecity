import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing · GarageFlow UK" },
      { name: "description", content: "Honest pricing in pounds. Starter from £49/mo. Cancel anytime." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Pricing</h1>
        <p className="mt-3 text-muted-foreground">See plan details and FAQ on the main page.</p>
        <a href="/#pricing" className="mt-8 inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">View plans →</a>
      </main>
      <SiteFooter />
    </div>
  ),
});
