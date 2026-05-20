import { createFileRoute, Link } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { Plate } from "@/components/site/Plate";
import { cn } from "@/lib/utils";
import {
  Plus,
  Wrench,
  Search,
  Loader2,
  Users,
  Car,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Overview · VehicleCity UK" }] }),
  component: Overview,
});

function Overview() {
  const { session } = Route.useRouteContext();
  const workspaceId = session.user.id;

  const { data: metrics, isLoading } = useQuery({
    queryKey: ["dashboard-metrics", workspaceId],
    queryFn: async () => {
      const [customers, vehicles, jobs] = await Promise.all([
        supabase.from("customers").select("*", { count: "exact", head: true }).eq("workspace_id", workspaceId),
        supabase.from("vehicles").select("*", { count: "exact", head: true }).eq("workspace_id", workspaceId),
        supabase.from("jobs").select("*", { count: "exact", head: true }).eq("workspace_id", workspaceId).neq("status", "ready"),
      ]);

      return {
        customers: customers.count || 0,
        vehicles: vehicles.count || 0,
        activeJobs: jobs.count || 0,
      };
    },
  });

  const { data: recentJobs } = useQuery({
    queryKey: ["recent-jobs", workspaceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select(`
          *,
          vehicle:vehicles(registration, make_model)
        `)
        .eq("workspace_id", workspaceId)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const KPIS = [
    { k: "Active jobs", v: metrics?.activeJobs.toString() || "0", icon: Wrench, tone: "text-accent" },
    { k: "Total vehicles", v: metrics?.vehicles.toString() || "0", icon: Car, tone: "text-success" },
    { k: "Total customers", v: metrics?.customers.toString() || "0", icon: Users, tone: "text-success" },
    { k: "Jobs this month", v: "0", icon: Search, tone: "text-muted-foreground" },
  ];

  return (
    <>
      <AppTopbar
        title="Workshop overview"
        subtitle={`${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })} · ${session.user.user_metadata.business_name || "Workspace"}`}
        actions={
          <Link
            to="/app/workshop"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
          >
            <Plus className="h-3.5 w-3.5" /> Go to Workshop
          </Link>
        }
      />

      <div className="space-y-5 p-4 sm:p-5">
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <div className="text-sm font-semibold tracking-tight">Recent workshop jobs</div>
              <Link to="/app/workshop" className="text-xs text-accent hover:underline">View all</Link>
            </div>
            <div className="overflow-x-auto">
              {recentJobs && recentJobs.length > 0 ? (
                <ul className="divide-y divide-border min-w-[300px]">
                  {recentJobs.map((j) => (
                    <li key={j.id} className="flex items-center gap-4 px-5 py-3">
                      <Plate reg={j.vehicle?.registration || "???"} className="text-xs shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="truncate text-sm font-medium">{j.vehicle?.make_model || "Unknown"}</div>
                        <div className="truncate text-xs text-muted-foreground">{j.service_type}</div>
                      </div>
                      <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border uppercase shrink-0">
                        {j.status}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center text-sm text-muted-foreground">
                  No recent jobs found.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-soft p-8 flex flex-col items-center justify-center text-center">
             <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-muted-foreground" />
             </div>
             <h3 className="text-sm font-semibold">Start building your workshop</h3>
             <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
                Add your first customer and vehicle to start tracking jobs.
             </p>
             <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Link to="/app/customers" className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md">Add Customer</Link>
                <Link to="/app/vehicles" className="text-xs border border-border px-3 py-1.5 rounded-md">Add Vehicle</Link>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
