import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { VehicleLookup } from "@/components/site/VehicleLookup";
import { Plate } from "@/components/site/Plate";
import { cn } from "@/lib/utils";
import {
  ArrowRight, Check, Search, ClipboardList, Calendar, Receipt, Users,
  Truck, ShieldCheck, Bell, Wrench, BarChart3, KeyRound, Sparkles,
  Plus, ChevronRight, MapPin, Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GarageFlow UK — Garage management software with DVLA vehicle lookup" },
      { name: "description", content: "Run your UK garage on one calm, fast platform. Instant DVLA lookups, MOT reminders, workshop scheduling, invoicing and CRM — purpose-built for British workshops, MOT centres and fleets." },
      { property: "og:title", content: "GarageFlow UK — Garage management software" },
      { property: "og:description", content: "Instant DVLA lookups, MOT reminders, workshop scheduling, invoicing and CRM. Built for UK garages." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "GarageFlow UK",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", priceCurrency: "GBP", price: "49" },
        description: "Garage management software with DVLA vehicle lookup, MOT tracking, workshop scheduling, invoicing and CRM for UK workshops.",
      }),
    }],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <TrustedBy />
        <FeatureGrid />
        <LookupSection />
        <ProductShowcase />
        <WorkflowSection />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ───────────────────────────── Hero ───────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground shadow-soft backdrop-blur">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            Now live · DVLA Vehicle Enquiry Service integration
          </div>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            The operating system for{" "}
            <span className="relative">
              British workshops
              <svg viewBox="0 0 200 8" className="absolute -bottom-2 left-0 h-2 w-full text-accent/60" fill="none" preserveAspectRatio="none">
                <path d="M2 5 Q 50 1, 100 4 T 198 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
            GarageFlow brings DVLA lookups, MOT tracking, workshop scheduling, customer CRM and invoicing into one calm interface — designed for the way UK garages actually work.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/app" className="group inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-elevated hover:bg-primary/90 transition">
              Start 14-day trial
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a href="#lookup" className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium hover:border-accent/40 transition">
              Try the DVLA lookup
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">No card required · UK-hosted · GDPR compliant</p>
        </div>

        {/* Dashboard mock */}
        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="absolute -inset-x-12 -top-8 -bottom-8 -z-10 rounded-[2rem] bg-gradient-to-b from-accent/10 via-transparent to-transparent blur-2xl" aria-hidden />
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}

function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-elevated ring-1 ring-foreground/[0.02]">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-border bg-surface/60 px-3.5 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="hidden items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground sm:flex">
          <Search className="h-3 w-3" />
          app.garageflow.co.uk/workshop
        </div>
        <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">v2.4</div>
      </div>

      <div className="grid grid-cols-12 min-h-[420px]">
        {/* Sidebar */}
        <aside className="col-span-3 hidden border-r border-border bg-sidebar p-3 text-sidebar-foreground sm:block">
          <div className="flex items-center gap-2 px-1 py-1.5">
            <span className="h-6 w-6 rounded bg-accent/90" />
            <span className="text-sm font-medium text-sidebar-foreground">Reliable Motors</span>
            <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-50" />
          </div>
          <div className="mt-3 space-y-0.5 text-[13px]">
            {[
              ["Overview", true], ["DVLA Lookup", false], ["Vehicles", false],
              ["Customers", false], ["Workshop", false], ["Calendar", false],
              ["Invoices", false], ["Fleet", false], ["Analytics", false],
            ].map(([label, active]) => (
              <div key={label as string} className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5",
                active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:text-sidebar-foreground",
              )}>
                <span className="h-1 w-1 rounded-full bg-current opacity-40" />
                {label}
              </div>
            ))}
          </div>
        </aside>

        {/* Main */}
        <div className="col-span-12 sm:col-span-9 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Tuesday, 20 May</div>
              <div className="text-base font-semibold tracking-tight">Workshop overview</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs">
                <Plus className="h-3.5 w-3.5" /> New job
              </button>
              <button className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1.5 text-xs text-primary-foreground">
                <Search className="h-3.5 w-3.5" /> Lookup
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Jobs today", "18", "+3"],
              ["MOTs due (7d)", "42", "+11"],
              ["Avg. bay time", "1h 48m", "−6m"],
              ["Revenue MTD", "£24,820", "+12%"],
            ].map(([k, v, d]) => (
              <div key={k} className="rounded-lg border border-border bg-surface/40 p-3">
                <div className="text-[11px] text-muted-foreground">{k}</div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <div className="text-lg font-semibold tracking-tight">{v}</div>
                  <div className={cn("text-[11px] font-medium", d.startsWith("−") ? "text-success" : "text-success")}>{d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Job table */}
          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 border-b border-border bg-surface/50 px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              <div>Vehicle</div><div>Stage</div><div>Mechanic</div><div>ETA</div>
            </div>
            {[
              { reg: "AB12 CDE", car: "Ford Focus", stage: "Diagnostics", who: "James", eta: "11:40", tone: "bg-warning/15 text-warning-foreground border-warning/30" },
              { reg: "LX21 KZV", car: "VW Golf GTI", stage: "In bay 2", who: "Priya", eta: "13:10", tone: "bg-accent/15 text-accent border-accent/30" },
              { reg: "EV70 BYD", car: "Tesla Model 3", stage: "Awaiting parts", who: "Sam", eta: "16:20", tone: "bg-muted text-muted-foreground border-border" },
              { reg: "RV68 OMG", car: "Range Rover Sport", stage: "Ready for collection", who: "Naomi", eta: "—", tone: "bg-success/15 text-success border-success/30" },
            ].map((r) => (
              <div key={r.reg} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 border-b border-border px-3 py-2.5 last:border-0">
                <div className="flex items-center gap-2.5">
                  <Plate reg={r.reg} className="text-xs" />
                  <span className="text-sm">{r.car}</span>
                </div>
                <span className={cn("rounded-full border px-2 py-0.5 text-[11px] font-medium", r.tone)}>{r.stage}</span>
                <span className="text-xs text-muted-foreground">{r.who}</span>
                <span className="text-xs tabular-nums">{r.eta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── Trusted by ───────────────────────────── */

function TrustedBy() {
  const logos = ["Reliable Motors", "Halton MOT Centre", "Northgate Fleet", "Bramley Garage", "Pennine Recovery", "EV Specialists Co.", "Cotswold Servicing", "Wirral Vehicles"];
  return (
    <section className="border-b border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Trusted by 1,200+ UK garages, MOT centres, dealerships and fleet operators
        </p>
        <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4 lg:grid-cols-8">
          {logos.map((l) => (
            <div key={l} className="text-center text-sm font-medium tracking-tight text-muted-foreground/80">{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Features ───────────────────────────── */

const FEATURES = [
  { icon: Search, title: "DVLA vehicle lookup", body: "Pull tax, MOT, fuel, engine and CO₂ from the DVLA Vehicle Enquiry Service in under a second. Cached, audited, rate-limited." },
  { icon: ShieldCheck, title: "MOT & tax tracking", body: "Every customer vehicle monitored automatically. Reminders go out the moment expiry windows open." },
  { icon: Users, title: "Customer CRM", body: "One profile per customer with vehicles, history, notes and conversations — never lose context again." },
  { icon: Receipt, title: "Invoicing with VAT", body: "Generate compliant UK invoices with parts, labour and VAT. Email, download or take payment with Stripe." },
  { icon: ClipboardList, title: "Workshop workflow", body: "Kanban-style jobs board with bays, mechanics, stages and parts gating. Drag, drop, done." },
  { icon: Truck, title: "Fleet management", body: "Operate multi-vehicle fleets with bulk MOT, tax and service tracking, driver notes and renewal alerts." },
  { icon: KeyRound, title: "Roles & permissions", body: "Owners, managers, mechanics, advisors — fine-grained access by branch, bay and module." },
  { icon: Bell, title: "Smart reminders", body: "SMS and email reminders that respect quiet hours, deliverability and opt-outs." },
  { icon: Wrench, title: "Service history", body: "A canonical service timeline per vehicle, signed off by the mechanic who did the work." },
  { icon: BarChart3, title: "Operational analytics", body: "Bay utilisation, technician throughput, conversion, revenue mix — without exporting to a spreadsheet." },
];

function FeatureGrid() {
  return (
    <section id="features" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Everything in one place</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Built for the way garages actually run</h2>
          <p className="mt-3 text-muted-foreground">Stop juggling diary books, spreadsheets and four different tools. GarageFlow replaces them with one fast, calm workspace your whole team can use.</p>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="group bg-card p-6 transition hover:bg-surface/60">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground transition group-hover:border-accent/40 group-hover:text-accent">
                <f.icon className="h-4.5 w-4.5" />
              </div>
              <h3 className="mt-4 font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Lookup Demo ───────────────────────────── */

function LookupSection() {
  return (
    <section id="lookup" className="border-b border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">DVLA Vehicle Enquiry Service</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Type a plate. Know the vehicle.</h2>
            <p className="mt-3 text-muted-foreground">Connected directly to the official UK DVLA API. Validate registrations, check MOT and tax status, and start a job with the full vehicle profile pre-filled.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Sub-second response with intelligent caching", "Validates UK plate formats client-side", "Audit-logged with API key rotation", "Falls back gracefully on rate limits"].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-success" /> <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-lg border border-border bg-card p-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span className="font-medium">Coming next</span>
              </div>
              <p className="mt-1.5">DVSA MOT history, insurance checks, mileage verification and HPI-style provenance — all surfaced inline on the same card.</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <VehicleLookup />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Product showcase ───────────────────────────── */

function ProductShowcase() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Vehicle profile</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Every vehicle, fully understood</h2>
            <p className="mt-3 text-muted-foreground">DVLA data, service history, documents and customer ownership in a single, calm record. The kind of profile your service advisor wishes they had.</p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
                ["MOT & tax timeline", Calendar],
                ["Parts & labour history", Wrench],
                ["Documents & MOT certs", ClipboardList],
                ["Owner & vehicle notes", Users],
              ].map(([t, Icon]: any) => (
                <div key={t} className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
                  <Icon className="h-4 w-4 text-muted-foreground" /> {t}
                </div>
              ))}
            </div>
          </div>

          <VehicleProfileMock />
        </div>
      </div>
    </section>
  );
}

function VehicleProfileMock() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-elevated">
      <div className="flex items-center justify-between border-b border-border bg-surface/60 px-5 py-4">
        <div className="flex items-center gap-3">
          <Plate reg="LX21 KZV" />
          <div>
            <div className="font-semibold tracking-tight">Volkswagen Golf GTI</div>
            <div className="text-xs text-muted-foreground">Owner · Imran Khan · 07700 900 421</div>
          </div>
        </div>
        <span className="rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-xs font-medium text-success">MOT valid · 15 Jul 2026</span>
      </div>
      <div className="grid grid-cols-4 gap-px bg-border">
        {[["Fuel", "Petrol"], ["Engine", "1984 cc"], ["Year", "2021"], ["Colour", "Pure White"]].map(([k, v]) => (
          <div key={k} className="bg-card p-3">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</div>
            <div className="mt-0.5 text-sm font-medium">{v}</div>
          </div>
        ))}
      </div>
      <div className="px-5 py-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Service timeline</div>
        <ol className="mt-3 space-y-3">
          {[
            ["12 May 2026", "Full service · brake pads (F)", "James W."],
            ["09 Jan 2026", "Diagnostics — EML cleared", "Priya S."],
            ["14 Jul 2025", "MOT passed · advisory: front tyres", "MOT bay 1"],
          ].map(([d, e, w]) => (
            <li key={d} className="flex items-start gap-3 text-sm">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-accent" />
              <div className="flex-1">
                <div className="font-medium">{e}</div>
                <div className="text-xs text-muted-foreground">{d} · {w}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ───────────────────────────── Workflow ───────────────────────────── */

function WorkflowSection() {
  const steps = [
    { n: "01", t: "Plate in", b: "A customer arrives or rings. Type their registration and pull the full DVLA record in under a second." },
    { n: "02", t: "Job created", b: "Convert the lookup into a job with bay, mechanic, parts and estimated duration. Customer auto-linked." },
    { n: "03", t: "Workshop runs", b: "The team works the kanban — diagnostics, in bay, awaiting parts, ready — with live status on shared screens." },
    { n: "04", t: "Invoice & follow-up", b: "VAT invoice generated from job lines. Stripe payment link sent. MOT reminder scheduled automatically." },
  ];
  return (
    <section className="border-b border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Workflow</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">From the phone to the invoice, without retyping anything</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-xl border border-border bg-card p-6">
              <div className="font-mono text-xs text-accent">{s.n}</div>
              <h3 className="mt-3 font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Pricing ───────────────────────────── */

function Pricing() {
  const plans = [
    {
      name: "Starter", price: "£49", per: "/mo", desc: "For independents and single-bay garages getting organised.",
      features: ["1 location, 3 users", "500 DVLA lookups / mo", "Invoicing & MOT reminders", "Email support"],
      cta: "Start trial", highlight: false,
    },
    {
      name: "Professional", price: "£129", per: "/mo", desc: "The full operating system for busy multi-bay workshops.",
      features: ["1 location, 15 users", "Unlimited DVLA lookups", "Workshop kanban & calendar", "Stripe payments, SMS reminders", "Priority support"],
      cta: "Start trial", highlight: true,
    },
    {
      name: "Enterprise", price: "Custom", per: "", desc: "Multi-location groups, dealerships and fleet operators.",
      features: ["Unlimited locations & users", "SSO, audit logs, SLA", "Fleet management module", "Dedicated success manager"],
      cta: "Talk to sales", highlight: false,
    },
  ];
  return (
    <section id="pricing" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Pricing</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Honest pricing in pounds</h2>
          <p className="mt-3 text-muted-foreground">No setup fees. No per-DVLA-lookup gouging on Professional. Cancel anytime.</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={cn(
              "relative rounded-2xl border bg-card p-6 transition",
              p.highlight ? "border-primary shadow-elevated ring-1 ring-primary/10" : "border-border shadow-soft hover:border-foreground/15",
            )}>
              {p.highlight && (
                <span className="absolute right-5 top-5 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent ring-1 ring-accent/20">Most popular</span>
              )}
              <div className="text-sm font-semibold tracking-tight">{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.per} + VAT</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/app" className={cn(
                "mt-8 inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition",
                p.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border bg-surface hover:bg-card",
              )}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Testimonials ───────────────────────────── */

function Testimonials() {
  const quotes = [
    { q: "We cut our front-desk admin in half. Plate in, job out — the team just gets it.", who: "Sarah Patel", role: "Owner, Reliable Motors", loc: "Manchester" },
    { q: "MOT reminders alone pay for the plan. Bookings rebooked themselves the first month.", who: "Daniel O'Connor", role: "Manager, Halton MOT Centre", loc: "Liverpool" },
    { q: "Finally a fleet view that doesn't feel like SAP. Our drivers actually use it.", who: "Aisha Begum", role: "Ops Lead, Northgate Fleet", loc: "Birmingham" },
  ];
  return (
    <section className="border-b border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {quotes.map((t) => (
            <figure key={t.who} className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex gap-0.5 text-warning">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground">"{t.q}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                  {t.who.split(" ").map(w => w[0]).join("")}
                </div>
                <div className="text-sm">
                  <div className="font-medium">{t.who}</div>
                  <div className="text-xs text-muted-foreground">{t.role} · <MapPin className="inline h-3 w-3" /> {t.loc}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── FAQ ───────────────────────────── */

function FAQ() {
  const faqs = [
    { q: "Is GarageFlow connected to the real DVLA API?", a: "Yes. Lookups hit the official DVLA Vehicle Enquiry Service. Responses are cached for 24 hours per registration to stay inside fair-use limits." },
    { q: "Do you handle MOT history from DVSA?", a: "MOT history via the DVSA API is rolling out to Professional plans this quarter. You can opt in from settings when it lands." },
    { q: "Where is my data hosted?", a: "All customer data is hosted in UK regions on tier-1 infrastructure. We're SOC 2 aligned and progressing through ISO 27001." },
    { q: "Can I import from my current system?", a: "We provide free white-glove migration from Garage Hive, GA4, Autowork and CSV exports during your trial." },
    { q: "Do you support VAT invoicing?", a: "Yes — UK VAT-compliant invoices with parts, labour, discounts and Stripe payment links out of the box." },
  ];
  return (
    <section id="faq" className="border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Questions, answered</h2>
          <p className="mt-3 text-muted-foreground">Couldn't find what you needed? <a className="text-foreground underline-offset-4 hover:underline" href="mailto:hello@garageflow.co.uk">Email the team</a>.</p>
        </div>
        <div className="lg:col-span-2 divide-y divide-border rounded-xl border border-border bg-card">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5 open:bg-surface/40">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium">
                {f.q}
                <span className="text-muted-foreground transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden bg-sidebar text-sidebar-foreground">
      <div className="dot-bg absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-sidebar-foreground sm:text-4xl">
          Run your workshop on something built for it.
        </h2>
        <p className="max-w-xl text-sidebar-foreground/70">14-day trial. No card. Bring your team and a plate.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/app" className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90 transition">
            Start free trial <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="#" className="inline-flex items-center gap-1.5 rounded-md border border-sidebar-border bg-sidebar-accent px-4 py-2.5 text-sm font-medium text-sidebar-accent-foreground hover:bg-sidebar-accent/70 transition">
            Book a demo
          </a>
        </div>
      </div>
    </section>
  );
}
