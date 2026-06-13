import { W as jsxRuntimeExports } from "./server-B6_Oiuea.mjs";
import { u as useQuery, A as AppTopbar } from "./AppTopbar-B2N-utjh.mjs";
import { V as VehicleLookup } from "./VehicleLookup-DdMXDl_4.mjs";
import { P as Plate } from "./Plate-DI6wOjYz.mjs";
import { e as Route$5, s as supabase } from "./router-DvedLIcD.mjs";
import { a as createLucideIcon } from "./button-CBWnG0WW.mjs";
import { L as LoaderCircle } from "./loader-circle-B0RJ0UPi.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./ThemeToggle-DL_hqj43.mjs";
import "./search-D_lFFk0a.mjs";
import "./bell-D3M_u7N_.mjs";
import "./shield-check-B3J_NglM.mjs";
import "./calendar-D69TJAaR.mjs";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
      key: "oz39mx"
    }
  ]
];
const Bookmark = createLucideIcon("bookmark", __iconNode$1);
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode);
function Lookup() {
  const {
    session
  } = Route$5.useRouteContext();
  const workspaceId = session.user.id;
  const {
    data: recentVehicles,
    isLoading
  } = useQuery({
    queryKey: ["recent-lookups", workspaceId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("vehicles").select("*").eq("workspace_id", workspaceId).order("created_at", {
        ascending: false
      }).limit(10);
      if (error) throw error;
      return data;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppTopbar, { title: "DVLA Vehicle Lookup", subtitle: "Real-time data from the DVLA Vehicle Enquiry Service" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 p-5 lg:grid-cols-[1fr_300px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(VehicleLookup, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-xl border border-border bg-card p-5 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold tracking-tight", children: "API status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-success" }),
              " Operational"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-3 gap-3 text-center", children: [["Avg. response", "412 ms"], ["Lookups today", recentVehicles?.length.toString() || "0"], ["Cache hit rate", "100%"]].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-surface/40 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: k }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm font-semibold tabular-nums", children: v })
          ] }, k)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-border px-4 py-3 text-sm font-semibold tracking-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-4 w-4 text-muted-foreground" }),
            " Recent additions"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[400px] overflow-y-auto divide-y divide-border", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" }) }) : recentVehicles && recentVehicles.length > 0 ? recentVehicles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plate, { reg: r.registration, className: "text-xs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-medium", children: r.make_model || "Vehicle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: new Date(r.created_at).toLocaleDateString() })
            ] })
          ] }, r.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center text-xs text-muted-foreground", children: "No vehicles found." }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-border px-4 py-3 text-sm font-semibold tracking-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-4 w-4 text-muted-foreground" }),
            " Saved"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center text-xs text-muted-foreground italic", children: 'Use "Add vehicle" to save a lookup to your workspace.' })
        ] })
      ] })
    ] })
  ] });
}
export {
  Lookup as component
};
