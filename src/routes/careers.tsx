import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [{ title: "Careers · VehicleCity UK" }],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Careers</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          We're building the operating system for the UK's automotive industry. Join us in
          Manchester or remotely.
        </p>
        <div className="mt-12 rounded-xl border border-border bg-surface/50 p-8 text-center">
          <h2 className="text-xl font-semibold">No open roles right now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We're always looking for talented engineers and product thinkers. Send your CV to
            hello@vehiclecity.co.uk
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
});
