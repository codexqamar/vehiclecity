import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing · VehicleCity UK" },
      {
        name: "description",
        content: "Honest pricing in pounds. Starter from £49/mo. Cancel anytime.",
      },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "£49",
      per: "/mo",
      desc: "For independents and single-bay garages getting organised.",
      features: [
        "1 location, 3 users",
        "500 DVLA lookups / mo",
        "Invoicing & MOT reminders",
        "Email support",
      ],
      cta: "Start trial",
      highlight: false,
    },
    {
      name: "Professional",
      price: "£129",
      per: "/mo",
      desc: "The full operating system for busy multi-bay workshops.",
      features: [
        "1 location, 15 users",
        "Unlimited DVLA lookups",
        "Workshop kanban & calendar",
        "Stripe payments, SMS reminders",
        "Priority support",
      ],
      cta: "Start trial",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      per: "",
      desc: "Multi-location groups, dealerships and fleet operators.",
      features: [
        "Unlimited locations & users",
        "SSO, audit logs, SLA",
        "Fleet management module",
        "Dedicated success manager",
      ],
      cta: "Talk to sales",
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Pricing</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Honest pricing in pounds
          </h1>
          <p className="mt-4 text-muted-foreground">
            No setup fees. No per-DVLA-lookup gouging on Professional. Cancel anytime.
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={cn(
                "relative rounded-2xl border bg-card p-8 transition",
                p.highlight
                  ? "border-primary shadow-elevated ring-1 ring-primary/10"
                  : "border-border shadow-soft hover:border-foreground/15",
              )}
            >
              {p.highlight && (
                <span className="absolute right-5 top-5 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent ring-1 ring-accent/20">
                  Most popular
                </span>
              )}
              <div className="text-sm font-semibold tracking-tight">{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.per} + VAT</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-8 space-y-3.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/auth"
                className={cn(
                  "mt-10 inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition",
                  p.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border bg-surface hover:bg-card",
                )}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-2xl border border-border bg-surface/50 p-8 text-center md:p-12">
          <h2 className="text-2xl font-semibold tracking-tight">Need something else?</h2>
          <p className="mt-2 text-muted-foreground">
            We offer custom migration plans and multi-site discounts.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-surface transition"
          >
            Contact our team
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
