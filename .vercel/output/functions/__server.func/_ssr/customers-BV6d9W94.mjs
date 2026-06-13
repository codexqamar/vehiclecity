import { W as jsxRuntimeExports } from "./server-B6_Oiuea.mjs";
import { S as SiteHeader, a as SiteFooter } from "./SiteFooter-DLoSiH9v.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-DvedLIcD.mjs";
import "./Logo-C74eFnKH.mjs";
import "./button-CBWnG0WW.mjs";
import "./ThemeToggle-DL_hqj43.mjs";
const STORIES = [{
  co: "Reliable Motors",
  loc: "Manchester",
  stat: "−48% admin time",
  body: "Sarah cut her front-desk admin in half and her team adopted the kanban in a week."
}, {
  co: "Halton MOT Centre",
  loc: "Liverpool",
  stat: "+22% rebookings",
  body: "Automatic MOT reminders pulled lapsed customers back into the diary on day one."
}, {
  co: "Northgate Fleet",
  loc: "Birmingham",
  stat: "69 vehicles managed",
  body: "A multi-fleet view that drivers actually use — without an SAP-style learning curve."
}];
function CustomersPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl px-4 py-20 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-accent", children: "Customers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-4xl font-semibold tracking-tight sm:text-5xl", children: "UK garages, in their own words." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-5 md:grid-cols-3", children: STORIES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: s.co }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.loc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-2xl font-semibold tracking-tight", children: s.stat }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: s.body })
      ] }, s.co)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  CustomersPage as component
};
