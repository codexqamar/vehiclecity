import { W as jsxRuntimeExports } from "./server-B6_Oiuea.mjs";
import { u as useQuery, A as AppTopbar } from "./AppTopbar-B2N-utjh.mjs";
import { P as Plate } from "./Plate-DI6wOjYz.mjs";
import { c as cn } from "./button-CBWnG0WW.mjs";
import { g as Route$3, s as supabase } from "./router-DvedLIcD.mjs";
import { L as LoaderCircle } from "./loader-circle-B0RJ0UPi.mjs";
import { T as Truck } from "./truck-B0pOtq9F.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./ThemeToggle-DL_hqj43.mjs";
import "./search-D_lFFk0a.mjs";
import "./bell-D3M_u7N_.mjs";
function Fleet() {
  const {
    session
  } = Route$3.useRouteContext();
  const workspaceId = session.user.id;
  const {
    data: fleetData,
    isLoading
  } = useQuery({
    queryKey: ["fleet-customers", workspaceId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("customers").select(`
          id,
          name,
          tag,
          vehicles(*)
        `).eq("workspace_id", workspaceId).eq("tag", "Fleet");
      if (error) throw error;
      return data;
    }
  });
  const allFleetVehicles = fleetData?.flatMap((f) => f.vehicles.map((v) => ({
    ...v,
    fleetName: f.name
  }))) || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppTopbar, { title: "Fleet", subtitle: `${fleetData?.length || 0} fleets · ${allFleetVehicles.length} vehicles` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 lg:grid-cols-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full flex justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }) : fleetData && fleetData.length > 0 ? fleetData.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold tracking-tight", children: f.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground tabular-nums", children: [
            f.vehicles.length,
            " vehicles"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 flex-1 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-success", style: {
            width: `100%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium tabular-nums", children: "100%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-surface/40 p-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "MOT due" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-base font-semibold tabular-nums", children: f.vehicles.filter((v) => v.mot_status !== "Valid").length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-surface/40 p-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Tax due" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-base font-semibold tabular-nums", children: f.vehicles.filter((v) => v.tax_status !== "Taxed").length })
          ] })
        ] })
      ] }, f.id)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-full rounded-xl border border-dashed border-border p-12 text-center bg-card/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-8 w-8 text-muted-foreground/30 mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'No fleet customers found. Tag a customer as "Fleet" to see them here.' })
      ] }) }),
      allFleetVehicles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-5 py-3 text-sm font-semibold tracking-tight", children: "All Fleet Vehicles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-surface/60 text-[11px] uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Vehicle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Fleet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "MOT expires" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Tax" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right font-medium", children: "Last visit" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: allFleetVehicles.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border hover:bg-surface/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plate, { reg: v.registration, className: "text-xs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: v.make_model || "Unknown" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: v.fleetName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: v.mot_expiry || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded-full px-2 py-0.5 text-[11px] font-medium", v.tax_status === "Taxed" ? "bg-success/10 text-success" : "bg-warning/15 text-warning-foreground"), children: v.tax_status || "Check DVLA" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums", children: v.last_visit || "—" })
          ] }, v.id)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  Fleet as component
};
