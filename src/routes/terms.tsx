import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms of Service · VehicleCity UK" }],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Terms of Service</h1>
        <div className="mt-8 prose prose-sm prose-slate max-w-none text-muted-foreground space-y-6">
          <p>Last updated: May 20, 2026</p>
          <p>By using VehicleCity, you agree to the following terms and conditions.</p>
          <h2 className="text-xl font-semibold text-foreground">1. Account Responsibilities</h2>
          <p>
            You are responsible for maintaining the security of your account and ensuring all users
            comply with these terms.
          </p>
          <h2 className="text-xl font-semibold text-foreground">2. Usage Limits</h2>
          <p>
            Usage must remain within the limits defined by your selected plan, particularly
            regarding DVLA lookup volumes.
          </p>
          <h2 className="text-xl font-semibold text-foreground">3. Termination</h2>
          <p>
            You may cancel your subscription at any time. We reserve the right to suspend accounts
            that violate these terms.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
});
