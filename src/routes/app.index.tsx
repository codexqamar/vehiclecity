import { createFileRoute, Link } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { Plate } from "@/components/site/Plate";
import { cn } from "@/lib/utils";
import {
  Plus,
  ArrowUpRight,
  Search,
  Bell,
  Activity,
  Wrench,
  Calendar,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Overview · VehicleCity UK" }] }),
  component: Overview,
});

const REVENUE = [
  { d: "Mon", v: 2840 },
  { d: "Tue", v: 3120 },
  { d: "Wed", v: 2960 },
  { d: "Thu", v: 4180 },
  { d: "Fri", v: 5240 },
  { d: "Sat", v: 3680 },
  { d: "Sun", v: 1980 },
];

function Overview() {
  return (
    <>
      <AppTopbar
        title="Workshop overview"
        subtitle="Tuesday, 20 May 2026 · Reliable Motors · Manchester"
        actions={
          <Link
            to="/app/lookup"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
          >
            <Plus className="h-3.5 w-3.5" /> New job
          </Link>
        }
      />

      <div className="space-y-5 p-5">
        <KpiGrid />

        <div className="grid gap-5 lg:grid-cols-3">
          <RevenueCard />
          <ActivityFeed />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <UpcomingJobs />
          <MotAlerts />
        </div>
      </div>
    </>
  );
}

const KPIS = [
  { k: "Jobs today", v: "18", d: "+3 vs yesterday", icon: Wrench, tone: "text-success" },
  { k: "Vehicles checked", v: "47", d: "+12 vs yesterday", icon: Search, tone: "text-success" },
  { k: "MOTs due (7 days)", v: "42", d: "11 unbooked", icon: Bell, tone: "text-warning" },
  { k: "Revenue MTD", v: "£24,820", d: "+12% MoM", icon: TrendingUp, tone: "text-success" },
];

function KpiGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {KPIS.map((k) => (
        <div
          key={k.k}
          className="group rounded-xl border border-border bg-card p-4 shadow-soft transition hover:border-foreground/15"
        >
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">{k.k}</div>
            <k.icon className="h-3.5 w-3.5 text-muted-foreground/60" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <div className="text-2xl font-semibold tracking-tight tabular-nums">{k.v}</div>
            <div className={cn("text-xs", k.tone)}>{k.d}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RevenueCard() {
  return (
    <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div>
          <div className="text-sm font-semibold tracking-tight">Revenue · last 7 days</div>
          <div className="text-xs text-muted-foreground">Excluding VAT · all bays</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Total</div>
          <div className="text-lg font-semibold tabular-nums">£24,000</div>
        </div>
      </div>
      <div className="h-64 p-3">
        <ResponsiveContainer>
          <AreaChart data={REVENUE} margin={{ top: 12, right: 16, left: 0, bottom: 4 }}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="d"
              tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              width={42}
              tickFormatter={(v) => `£${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(v: number) => [`£${v.toLocaleString()}`, "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke="var(--color-accent)"
              strokeWidth={2}
              fill="url(#rev)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ActivityFeed() {
  const items = [
    { who: "James", what: "completed", on: "Full service on AB12 CDE", t: "12 min ago" },
    { who: "Priya", what: "started", on: "Diagnostics on LX21 KZV", t: "28 min ago" },
    { who: "Naomi", what: "invoiced", on: "£412.40 — RV68 OMG", t: "1 h ago" },
    { who: "Sam", what: "ordered parts", on: "Brake pads — Tesla Model 3", t: "2 h ago" },
    { who: "System", what: "sent MOT reminder", on: "12 customers", t: "08:00" },
  ];
  return (
    <div className="rounded-xl border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div className="text-sm font-semibold tracking-tight">Live activity</div>
        <Activity className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <ul className="divide-y divide-border">
        {items.map((i, idx) => (
          <li key={idx} className="flex items-start gap-3 px-5 py-3">
            <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-muted text-[11px] font-medium">
              {i.who
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="flex-1 text-sm">
              <div>
                <span className="font-medium">{i.who}</span>{" "}
                <span className="text-muted-foreground">{i.what}</span>
              </div>
              <div className="text-xs text-muted-foreground">{i.on}</div>
            </div>
            <div className="text-[11px] text-muted-foreground tabular-nums">{i.t}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UpcomingJobs() {
  const jobs = [
    { time: "09:30", reg: "MK67 TYR", car: "BMW 320d", svc: "MOT + service", bay: "Bay 1" },
    { time: "11:00", reg: "FG19 PLM", car: "Audi A4", svc: "Diagnostic — EML", bay: "Bay 3" },
    {
      time: "13:15",
      reg: "BV21 RKE",
      car: "Vauxhall Astra",
      svc: "Brake replacement",
      bay: "Bay 2",
    },
    { time: "15:45", reg: "TS70 EVA", car: "Tesla Model Y", svc: "Annual check", bay: "EV bay" },
  ];
  return (
    <div className="rounded-xl border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div className="text-sm font-semibold tracking-tight">Upcoming jobs</div>
        <Link
          to="/app/calendar"
          className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5"
        >
          Calendar <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      <ul className="divide-y divide-border">
        {jobs.map((j) => (
          <li key={j.reg} className="flex items-center gap-4 px-5 py-3">
            <div className="w-12 text-sm font-medium tabular-nums">{j.time}</div>
            <Plate reg={j.reg} className="text-xs" />
            <div className="flex-1 min-w-0">
              <div className="truncate text-sm font-medium">{j.car}</div>
              <div className="truncate text-xs text-muted-foreground">{j.svc}</div>
            </div>
            <span className="rounded-md border border-border bg-surface px-2 py-0.5 text-[11px] text-muted-foreground">
              {j.bay}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MotAlerts() {
  const alerts = [
    { reg: "AB12 CDE", car: "Ford Focus", owner: "Imran Khan", days: 6 },
    { reg: "LX21 KZV", car: "VW Golf GTI", owner: "Sarah Mitchell", days: 12 },
    { reg: "RV68 OMG", car: "Range Rover Sport", owner: "Daniel O'Connor", days: 18 },
    { reg: "EV70 BYD", car: "Tesla Model 3", owner: "Aisha Begum", days: 22 },
  ];
  return (
    <div className="rounded-xl border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div className="text-sm font-semibold tracking-tight">MOTs expiring soon</div>
        <button className="text-xs text-accent hover:underline">Send reminders</button>
      </div>
      <ul className="divide-y divide-border">
        {alerts.map((a) => (
          <li key={a.reg} className="flex items-center gap-3 px-5 py-3">
            <Plate reg={a.reg} className="text-xs" />
            <div className="flex-1 min-w-0">
              <div className="truncate text-sm font-medium">{a.car}</div>
              <div className="truncate text-xs text-muted-foreground">{a.owner}</div>
            </div>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px] font-medium",
                a.days <= 7
                  ? "bg-destructive/10 text-destructive"
                  : a.days <= 14
                    ? "bg-warning/15 text-warning-foreground"
                    : "bg-muted text-muted-foreground",
              )}
            >
              {a.days} days
            </span>
            <button className="rounded-md border border-border bg-surface px-2 py-1 text-xs hover:bg-card transition">
              Book
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
