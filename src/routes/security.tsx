import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [{ title: "Security · VehicleCity UK" }],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Security</h1>
        <div className="mt-8 prose prose-sm prose-slate max-w-none text-muted-foreground space-y-6">
          <p>VehicleCity is built with security as a core principle.</p>
          <h2 className="text-xl font-semibold text-foreground">Infrastructure</h2>
          <p>
            Our platform runs on tier-1 cloud providers with ISO 27001, SOC 2, and PCI DSS
            compliance.
          </p>
          <h2 className="text-xl font-semibold text-foreground">Encryption</h2>
          <p>All data is encrypted at rest using AES-256 and in transit using TLS 1.3.</p>
          <h2 className="text-xl font-semibold text-foreground">Compliance</h2>
          <p>
            We are currently progressing through ISO 27001 certification and are fully GDPR
            compliant.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
});
