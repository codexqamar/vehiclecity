import { W as jsxRuntimeExports } from "./server-B6_Oiuea.mjs";
import { L as Link } from "./router-DvedLIcD.mjs";
import { S as SiteHeader, a as SiteFooter } from "./SiteFooter-DLoSiH9v.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./Logo-C74eFnKH.mjs";
import "./button-CBWnG0WW.mjs";
import "./ThemeToggle-DL_hqj43.mjs";
const SECTIONS = [{
  t: "DVLA Vehicle Lookup",
  b: "Live, cached lookups against the official DVLA Vehicle Enquiry Service. Search history, saved vehicles, rate limit handling and full audit trail."
}, {
  t: "MOT & Tax tracking",
  b: "Per-vehicle MOT and tax dates with intelligent reminders. SMS and email with quiet hours, deliverability tracking and unsubscribe handling."
}, {
  t: "Customer CRM",
  b: "One profile per customer. Vehicles, history, notes, tags and communication threads — never lose context between visits."
}, {
  t: "Workshop kanban",
  b: "Booked → Diagnostics → In bay → Awaiting parts → Ready. Drag, drop, assign mechanic, gate on parts arrival."
}, {
  t: "Calendar & scheduling",
  b: "Day, week and month views with bay capacity, mechanic availability and drag-and-drop rebooking."
}, {
  t: "Invoicing & payments",
  b: "UK VAT-compliant invoices generated from job lines. Stripe payment links, PDF download, accountant exports."
}, {
  t: "Fleet management",
  b: "Group vehicles into fleets. Bulk MOT and tax tracking, driver assignments, mileage logging and renewal alerts."
}, {
  t: "Analytics",
  b: "Bay utilisation, technician throughput, conversion, revenue mix and lookup volume — without leaving the app."
}];
function Features() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl px-4 py-20 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-accent", children: "Features" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-4xl font-semibold tracking-tight sm:text-5xl", children: "Every tool a UK garage actually needs." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "No bloat. No spreadsheets. One operating system for vehicles, customers, jobs and money." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2", children: SECTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold tracking-tight", children: s.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: s.b })
      ] }, s.t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition", children: "Open the app →" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  Features as component
};
