import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/dpa")({
  head: () => ({
    meta: [{ title: "Data Processing Agreement · VehicleCity UK" }],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Data Processing Agreement
        </h1>
        <div className="mt-8 prose prose-sm prose-slate max-w-none text-muted-foreground space-y-6">
          <p>
            This Data Processing Agreement ("DPA") forms part of the Terms of Service between
            VehicleCity and our customers.
          </p>
          <h2 className="text-xl font-semibold text-foreground">1. Processing of Personal Data</h2>
          <p>
            We process personal data only as instructed by our customers to provide garage
            management services.
          </p>
          <h2 className="text-xl font-semibold text-foreground">2. Security Measures</h2>
          <p>
            We implement appropriate technical and organizational measures to ensure a level of
            security appropriate to the risk.
          </p>
          <h2 className="text-xl font-semibold text-foreground">3. GDPR Compliance</h2>
          <p>
            Our processing operations are fully compliant with the UK GDPR and Data Protection Act
            2018.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
});
