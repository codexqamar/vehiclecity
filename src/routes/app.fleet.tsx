import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { Plate } from "@/components/site/Plate";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Truck } from "lucide-react";

export const Route = createFileRoute("/app/fleet")({
  head: () => ({ meta: [{ title: "Fleet · VehicleCity UK" }] }),
  component: Fleet,
});

function Fleet() {
  const { session } = Route.useRouteContext();
  const workspaceId = session.user.id;

  const { data: fleetData, isLoading } = useQuery({
    queryKey: ["fleet-customers", workspaceId],
    queryFn: async () => {
      // Fetch customers with 'Fleet' tag and their vehicles
      const { data, error } = await supabase
        .from("customers")
        .select(`
          id,
          name,
          tag,
          vehicles(*)
        `)
        .eq("workspace_id", workspaceId)
        .eq("tag", "Fleet");

      if (error) throw error;
      return data;
    },
  });

  const allFleetVehicles = fleetData?.flatMap(f => f.vehicles.map(v => ({ ...v, fleetName: f.name }))) || [];

  return (
    <>
      <AppTopbar 
        title="Fleet" 
        subtitle={`${fleetData?.length || 0} fleets · ${allFleetVehicles.length} vehicles`} 
      />
      <div className="space-y-5 p-5">
        <div className="grid gap-3 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : fleetData && fleetData.length > 0 ? (
            fleetData.map((f) => (
              <div key={f.id} className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <div className="flex items-center justify-between">
                  <div className="font-semibold tracking-tight">{f.name}</div>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {f.vehicles.length} vehicles
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-success" style={{ width: `100%` }} />
                  </div>
                  <span className="text-xs font-medium tabular-nums">100%</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-md border border-border bg-surface/40 p-2.5">
                    <div className="text-muted-foreground">MOT due</div>
                    <div className="mt-0.5 text-base font-semibold tabular-nums">
                      {f.vehicles.filter((v: any) => v.mot_status !== 'Valid').length}
                    </div>
                  </div>
                  <div className="rounded-md border border-border bg-surface/40 p-2.5">
                    <div className="text-muted-foreground">Tax due</div>
                    <div className="mt-0.5 text-base font-semibold tabular-nums">
                      {f.vehicles.filter((v: any) => v.tax_status !== 'Taxed').length}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="col-span-full rounded-xl border border-dashed border-border p-12 text-center bg-card/30">
                <Truck className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No fleet customers found. Tag a customer as "Fleet" to see them here.</p>
             </div>
          )}
        </div>

        {allFleetVehicles.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
            <div className="border-b border-border px-5 py-3 text-sm font-semibold tracking-tight">
              All Fleet Vehicles
            </div>
            <table className="w-full text-sm">
              <thead className="bg-surface/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">Vehicle</th>
                  <th className="px-4 py-2.5 text-left font-medium">Fleet</th>
                  <th className="px-4 py-2.5 text-left font-medium">MOT expires</th>
                  <th className="px-4 py-2.5 text-left font-medium">Tax</th>
                  <th className="px-4 py-2.5 text-right font-medium">Last visit</th>
                </tr>
              </thead>
              <tbody>
                {allFleetVehicles.map((v) => (
                  <tr key={v.id} className="border-t border-border hover:bg-surface/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Plate reg={v.registration} className="text-xs" />
                        <span className="font-medium">{v.make_model || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{v.fleetName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{v.mot_expiry || '—'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-medium",
                          v.tax_status === "Taxed"
                            ? "bg-success/10 text-success"
                            : "bg-warning/15 text-warning-foreground",
                        )}
                      >
                        {v.tax_status || 'Check DVLA'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">{v.last_visit || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
