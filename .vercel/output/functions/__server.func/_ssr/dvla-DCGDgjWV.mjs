import { W as jsxRuntimeExports } from "./server-B6_Oiuea.mjs";
import { S as SiteHeader, a as SiteFooter } from "./SiteFooter-DLoSiH9v.mjs";
import { V as VehicleLookup } from "./VehicleLookup-DdMXDl_4.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-DvedLIcD.mjs";
import "./Logo-C74eFnKH.mjs";
import "./button-CBWnG0WW.mjs";
import "./ThemeToggle-DL_hqj43.mjs";
import "./Plate-DI6wOjYz.mjs";
import "./search-D_lFFk0a.mjs";
import "./loader-circle-B0RJ0UPi.mjs";
import "./shield-check-B3J_NglM.mjs";
import "./calendar-D69TJAaR.mjs";
function DvlaPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-3xl px-4 py-16 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-accent", children: "DVLA Vehicle Enquiry Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl", children: "Free UK vehicle lookup" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-xl text-muted-foreground", children: "Enter any UK registration to see tax status, MOT status, fuel, engine and CO₂ data — pulled live from the official DVLA API." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VehicleLookup, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  DvlaPage as component
};
