import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [{ title: "Contact · VehicleCity UK" }],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Contact Us</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Have questions about VehicleCity? Our team is here to help.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="font-semibold">Email</div>
                <p className="text-sm text-muted-foreground">hello@vehiclecity.co.uk</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                <Phone className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="font-semibold">Phone</div>
                <p className="text-sm text-muted-foreground">+44 (0) 161 123 4567</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="font-semibold">Office</div>
                <p className="text-sm text-muted-foreground">Manchester, United Kingdom</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  type="email"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  className="h-24 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="How can we help?"
                />
              </div>
              <button className="w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
                Send message
              </button>
            </form>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
});
