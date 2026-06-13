import { W as jsxRuntimeExports } from "./server-B6_Oiuea.mjs";
import { L as Link } from "./router-DvedLIcD.mjs";
import { S as SiteHeader, a as SiteFooter } from "./SiteFooter-DLoSiH9v.mjs";
import { c as cn } from "./button-CBWnG0WW.mjs";
import { C as Check } from "./check-hP7kZg1H.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./Logo-C74eFnKH.mjs";
import "./ThemeToggle-DL_hqj43.mjs";
function PricingPage() {
  const plans = [{
    name: "Starter",
    price: "£49",
    per: "/mo",
    desc: "For independents and single-bay garages getting organised.",
    features: ["1 location, 3 users", "500 DVLA lookups / mo", "Invoicing & MOT reminders", "Email support"],
    cta: "Start trial",
    highlight: false
  }, {
    name: "Professional",
    price: "£129",
    per: "/mo",
    desc: "The full operating system for busy multi-bay workshops.",
    features: ["1 location, 15 users", "Unlimited DVLA lookups", "Workshop kanban & calendar", "Stripe payments, SMS reminders", "Priority support"],
    cta: "Start trial",
    highlight: true
  }, {
    name: "Enterprise",
    price: "Custom",
    per: "",
    desc: "Multi-location groups, dealerships and fleet operators.",
    features: ["Unlimited locations & users", "SSO, audit logs, SLA", "Fleet management module", "Dedicated success manager"],
    cta: "Talk to sales",
    highlight: false
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-accent", children: "Pricing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-3xl font-semibold tracking-tight sm:text-5xl", children: "Honest pricing in pounds" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "No setup fees. No per-DVLA-lookup gouging on Professional. Cancel anytime." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-5 lg:grid-cols-3", children: plans.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative rounded-2xl border bg-card p-8 transition", p.highlight ? "border-primary shadow-elevated ring-1 ring-primary/10" : "border-border shadow-soft hover:border-foreground/15"), children: [
        p.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-5 top-5 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent ring-1 ring-accent/20", children: "Most popular" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold tracking-tight", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-semibold tracking-tight", children: p.price }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            p.per,
            " + VAT"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: p.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 space-y-3.5 text-sm", children: p.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mt-0.5 h-4 w-4 text-success" }),
          " ",
          f
        ] }, f)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: cn("mt-10 inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition", p.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border bg-surface hover:bg-card"), children: p.cta })
      ] }, p.name)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 rounded-2xl border border-border bg-surface/50 p-8 text-center md:p-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Need something else?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "We offer custom migration plans and multi-site discounts." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "mt-6 inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-surface transition", children: "Contact our team" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  PricingPage as component
};
