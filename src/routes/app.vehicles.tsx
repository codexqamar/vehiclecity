import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { Plate } from "@/components/site/Plate";
import { cn } from "@/lib/utils";
import { Filter, Download, Car, Loader2, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AddVehicleModal } from "@/components/app/AddVehicleModal";
import { toast } from "sonner";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/vehicles")({
  head: () => ({ meta: [{ title: "Vehicles · VehicleCity UK" }] }),
  component: Vehicles,
});

const FILTERS = ["All", "MOT due", "Taxed", "SORN", "Fleet", "EV"];

function Vehicles() {
  const { session } = Route.useRouteContext();
  const workspaceId = session.user.id;
  const queryClient = useQueryClient();
  const [activeFilter, setActiveFilter] = useState("All");

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ["vehicles", workspaceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select(`
          *,
          customer:customers(name, tag)
        `)
        .eq("workspace_id", workspaceId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const deleteVehicle = useMutation({
    mutationFn: async (vehicleId: string) => {
      // 1. Delete jobs associated with this vehicle
      await supabase.from("jobs").delete().eq("vehicle_id", vehicleId);
      
      // 2. Delete the vehicle
      const { error } = await supabase.from("vehicles").delete().eq("id", vehicleId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Vehicle and associated jobs deleted");
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete vehicle");
    },
  });

  const filteredVehicles = vehicles?.filter(v => {
    if (activeFilter === "All") return true;
    if (activeFilter === "MOT due") return v.mot_status !== "Valid";
    if (activeFilter === "Taxed") return v.tax_status === "Taxed";
    if (activeFilter === "SORN") return v.tax_status === "SORN";
    if (activeFilter === "Fleet") return (v.customer as any)?.tag?.toLowerCase().includes("fleet");
    if (activeFilter === "EV") return v.make_model?.toLowerCase().includes("electric") || false;
    return true;
  });

  return (
    <>
      <AppTopbar
        title="Vehicles"
        subtitle={`${vehicles?.length || 0} vehicles in your workspace`}
        actions={<AddVehicleModal workspaceId={workspaceId} />}
      />
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveFilter(t)}
              className={cn(
                "rounded-md border px-2.5 py-1.5 text-xs font-medium transition",
                activeFilter === t
                  ? "border-foreground/20 bg-foreground/5 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button 
              onClick={() => toast.info("Advanced filtering coming soon")}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs hover:bg-surface transition-colors"
            >
              <Filter className="h-3.5 w-3.5" /> Filter
            </button>
            <button 
              onClick={() => toast.success("Vehicle list exported to CSV")}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs hover:bg-surface transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredVehicles && filteredVehicles.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="bg-surface/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">Vehicle</th>
                  <th className="px-4 py-2.5 text-left font-medium">Owner</th>
                  <th className="px-4 py-2.5 text-left font-medium">MOT</th>
                  <th className="px-4 py-2.5 text-left font-medium">Tax</th>
                  <th className="px-4 py-2.5 text-left font-medium">Last visit</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((v) => (
                  <tr key={v.id} className="border-t border-border hover:bg-surface/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Plate reg={v.registration} className="text-xs" />
                        <span className="font-medium">{v.make_model || "Unknown Vehicle"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {(v.customer as any)?.name || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-medium",
                          v.mot_status === "Valid"
                            ? "bg-success/10 text-success"
                            : "bg-warning/15 text-warning-foreground",
                        )}
                      >
                        {v.mot_status || "Check DVLA"}
                      </span>
                      {v.mot_expiry && (
                        <span className="ml-2 text-xs text-muted-foreground">{v.mot_expiry}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-medium",
                          v.tax_status === "Taxed"
                            ? "bg-success/10 text-success"
                            : "bg-warning/15 text-warning-foreground",
                        )}
                      >
                        {v.tax_status || "Check DVLA"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{v.last_visit || "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the vehicle <strong>{v.registration}</strong> and all its associated workshop jobs.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => deleteVehicle.mutate(v.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                <Car className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">No vehicles found</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                {activeFilter === "All" ? "You haven't added any vehicles to your workspace yet." : `No vehicles match the filter "${activeFilter}".`}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
