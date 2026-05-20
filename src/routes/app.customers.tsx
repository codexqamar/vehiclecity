import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AddCustomerModal } from "@/components/app/AddCustomerModal";
import { Loader2, Users, Trash2 } from "lucide-react";
import { toast } from "sonner";
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

export const Route = createFileRoute("/app/customers")({
  head: () => ({ meta: [{ title: "Customers · VehicleCity UK" }] }),
  component: Customers,
});

function Customers() {
  const { session } = Route.useRouteContext();
  const workspaceId = session.user.id;
  const queryClient = useQueryClient();

  const { data: customers, isLoading } = useQuery({
    queryKey: ["customers", workspaceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("workspace_id", workspaceId)
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  const deleteCustomer = useMutation({
    mutationFn: async (customerId: string) => {
      // Manual cascading delete: Jobs -> Vehicles -> Customer
      // 1. Delete jobs associated with this customer
      await supabase.from("jobs").delete().eq("customer_id", customerId);
      
      // 2. Delete vehicles associated with this customer
      await supabase.from("vehicles").delete().eq("customer_id", customerId);
      
      // 3. Delete the customer
      const { error } = await supabase.from("customers").delete().eq("id", customerId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Customer and associated data deleted");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete customer");
    },
  });

  return (
    <>
      <AppTopbar
        title="Customers"
        subtitle={`${customers?.length || 0} active customers`}
        actions={<AddCustomerModal workspaceId={workspaceId} />}
      />
      <div className="p-5">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : customers && customers.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="bg-surface/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">Customer</th>
                  <th className="px-4 py-2.5 text-left font-medium">Contact</th>
                  <th className="px-4 py-2.5 text-left font-medium">Lifetime spend</th>
                  <th className="px-4 py-2.5 text-left font-medium">Tag</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="border-t border-border hover:bg-surface/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground uppercase">
                          {c.name
                            .split(" ")
                            .map((w: string) => w[0])
                            .join("")}
                        </div>
                        <span className="font-medium">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">{c.email}</div>
                      <div className="text-xs text-muted-foreground">{c.phone}</div>
                    </td>
                    <td className="px-4 py-3 tabular-nums font-medium">£0.00</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                        {c.tag || "Regular"}
                      </span>
                    </td>
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
                              This will permanently delete <strong>{c.name}</strong> and all their associated vehicles and workshop jobs.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => deleteCustomer.mutate(c.id)}
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
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">No customers found</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                You haven't added any customers to your workspace yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

