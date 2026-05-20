import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy Policy · VehicleCity UK" }],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Privacy Policy</h1>
        <div className="mt-8 prose prose-sm prose-slate max-w-none text-muted-foreground space-y-6">
          <p>Last updated: May 20, 2026</p>
          <p>
            At VehicleCity, we take your privacy seriously. This policy explains how we collect,
            use, and protect your data.
          </p>
          <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
          <p>
            We collect information necessary to provide our garage management services, including
            business details, customer contact information, and vehicle data.
          </p>
          <h2 className="text-xl font-semibold text-foreground">2. How We Use Data</h2>
          <p>
            Data is used exclusively to facilitate your workshop operations, process DVLA lookups,
            and improve our platform's performance.
          </p>
          <h2 className="text-xl font-semibold text-foreground">3. Data Security</h2>
          <p>
            All customer data is hosted in UK regions on tier-1 infrastructure. We use
            industry-standard encryption and security protocols.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
});
