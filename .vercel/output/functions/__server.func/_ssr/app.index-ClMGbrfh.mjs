import { W as jsxRuntimeExports } from "./server-B6_Oiuea.mjs";
import { R as Route$9, L as Link, s as supabase } from "./router-DvedLIcD.mjs";
import { u as useQuery, A as AppTopbar } from "./AppTopbar-B2N-utjh.mjs";
import { P as Plate } from "./Plate-DI6wOjYz.mjs";
import { L as LoaderCircle } from "./loader-circle-B0RJ0UPi.mjs";
import { W as Wrench } from "./wrench-10XiLTKW.mjs";
import { C as Car } from "./car-Bs7snJGz.mjs";
import { U as Users } from "./users-D1_Jut2C.mjs";
import { S as Search } from "./search-D_lFFk0a.mjs";
import { P as Plus } from "./plus-D-HN2_wc.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./ThemeToggle-DL_hqj43.mjs";
import "./button-CBWnG0WW.mjs";
import "./bell-D3M_u7N_.mjs";
function Overview() {
  const {
    session
  } = Route$9.useRouteContext();
  const workspaceId = session.user.id;
  const {
    data: metrics,
    isLoading
  } = useQuery({
    queryKey: ["dashboard-metrics", workspaceId],
    queryFn: async () => {
      const [customers, vehicles, jobs] = await Promise.all([supabase.from("customers").select("*", {
        count: "exact",
        head: true
      }).eq("workspace_id", workspaceId), supabase.from("vehicles").select("*", {
        count: "exact",
        head: true
      }).eq("workspace_id", workspaceId), supabase.from("jobs").select("*", {
        count: "exact",
        head: true
      }).eq("workspace_id", workspaceId).neq("status", "ready")]);
      return {
        customers: customers.count || 0,
        vehicles: vehicles.count || 0,
        activeJobs: jobs.count || 0
      };
    }
  });
  const {
    data: recentJobs
  } = useQuery({
    queryKey: ["recent-jobs", workspaceId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("jobs").select(`
          *,
          vehicle:vehicles(registration, make_model)
        `).eq("workspace_id", workspaceId).order("created_at", {
        ascending: false
      }).limit(5);
      if (error) throw error;
      return data;
    }
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  const KPIS = [{
    k: "Active jobs",
    v: metrics?.activeJobs.toString() || "0",
    icon: Wrench,
    tone: "text-accent"
  }, {
    k: "Total vehicles",
    v: metrics?.vehicles.toString() || "0",
    icon: Car,
    tone: "text-success"
  }, {
    k: "Total customers",
    v: metrics?.customers.toString() || "0",
    icon: Users,
    tone: "text-success"
  }, {
    k: "Jobs this month",
    v: "0",
    icon: Search,
    tone: "text-muted-foreground"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppTopbar, { title: "Workshop overview", subtitle: `${(/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long"
    })} · ${session.user.user_metadata.business_name || "Workspace"}`, actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/workshop", className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
      " Go to Workshop"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 p-4 sm:p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4", children: KPIS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-xl border border-border bg-card p-4 shadow-soft transition hover:border-foreground/15", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: k.k }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(k.icon, { className: "h-3.5 w-3.5 text-muted-foreground/60" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex items-baseline gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-semibold tracking-tight tabular-nums", children: k.v }) })
      ] }, k.k)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 grid-cols-1 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card shadow-soft overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-5 py-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold tracking-tight", children: "Recent workshop jobs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/workshop", className: "text-xs text-accent hover:underline", children: "View all" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: recentJobs && recentJobs.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border min-w-[300px]", children: recentJobs.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-4 px-5 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plate, { reg: j.vehicle?.registration || "???", className: "text-xs shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-medium", children: j.vehicle?.make_model || "Unknown" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-xs text-muted-foreground", children: j.service_type })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border uppercase shrink-0", children: j.status })
          ] }, j.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-sm text-muted-foreground", children: "No recent jobs found." }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card shadow-soft p-8 flex flex-col items-center justify-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-6 w-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "Start building your workshop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 max-w-[200px]", children: "Add your first customer and vehicle to start tracking jobs." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/customers", className: "text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md", children: "Add Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/vehicles", className: "text-xs border border-border px-3 py-1.5 rounded-md", children: "Add Vehicle" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Overview as component
};
