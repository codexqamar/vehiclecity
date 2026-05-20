import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { VehicleLookup } from "@/components/site/VehicleLookup";
import { Plate } from "@/components/site/Plate";
import { Bookmark, History, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/app/lookup")({
  head: () => ({ meta: [{ title: "DVLA Lookup · VehicleCity UK" }] }),
  component: Lookup,
});

function Lookup() {
  const { session } = Route.useRouteContext();
  const workspaceId = session.user.id;

  const { data: recentVehicles, isLoading } = useQuery({
    queryKey: ["recent-lookups", workspaceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("workspace_id", workspaceId)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <AppTopbar
        title="DVLA Vehicle Lookup"
        subtitle="Real-time data from the DVLA Vehicle Enquiry Service"
      />
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_300px]">
        <div>
          <VehicleLookup />
          <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold tracking-tight">API status</div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> Operational
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                ["Avg. response", "412 ms"],
                ["Lookups today", recentVehicles?.length.toString() || "0"],
                ["Cache hit rate", "100%"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-md border border-border bg-surface/40 p-3">
                  <div className="text-[11px] text-muted-foreground">{k}</div>
                  <div className="mt-1 text-sm font-semibold tabular-nums">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-xl border border-border bg-card shadow-soft">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3 text-sm font-semibold tracking-tight">
              <History className="h-4 w-4 text-muted-foreground" /> Recent additions
            </div>
            <div className="max-h-[400px] overflow-y-auto divide-y divide-border">
              {isLoading ? (
                <div className="p-4 flex justify-center">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              ) : recentVehicles && recentVehicles.length > 0 ? (
                recentVehicles.map((r) => (
                  <div key={r.id} className="flex items-center gap-3 px-4 py-2.5">
                    <Plate reg={r.registration} className="text-xs" />
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-sm font-medium">{r.make_model || "Vehicle"}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-muted-foreground">
                  No vehicles found.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-soft">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3 text-sm font-semibold tracking-tight">
              <Bookmark className="h-4 w-4 text-muted-foreground" /> Saved
            </div>
            <div className="p-4 text-center text-xs text-muted-foreground italic">
              Use "Add vehicle" to save a lookup to your workspace.
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
