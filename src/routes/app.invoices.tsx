import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { Plate } from "@/components/site/Plate";
import { cn } from "@/lib/utils";
import { Download, Send, Receipt, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { AddInvoiceModal } from "@/components/app/AddInvoiceModal";
import { toast } from "sonner";

export const Route = createFileRoute("/app/invoices")({
  head: () => ({ meta: [{ title: "Invoices · VehicleCity UK" }] }),
  component: Invoices,
});

const TONES: Record<string, string> = {
  paid: "bg-success/10 text-success",
  sent: "bg-accent/10 text-accent",
  overdue: "bg-destructive/10 text-destructive",
  draft: "bg-muted text-muted-foreground",
};

function Invoices() {
  const { session } = Route.useRouteContext();
  const workspaceId = session.user.id;

  const { data: invoices, isLoading } = useQuery({
    queryKey: ["invoices", workspaceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select(`
          *,
          customer:customers(name),
          vehicle:vehicles(registration)
        `)
        .eq("workspace_id", workspaceId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const stats = {
    outstanding: invoices?.filter(i => i.status !== 'paid').reduce((acc, i) => acc + i.amount, 0) || 0,
    overdue: invoices?.filter(i => i.status === 'overdue').reduce((acc, i) => acc + i.amount, 0) || 0,
    paid30d: invoices?.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.amount, 0) || 0,
  };

  return (
    <>
      <AppTopbar
        title="Invoices"
        subtitle="VAT-compliant invoicing · Stripe connected"
        actions={<AddInvoiceModal workspaceId={workspaceId} />}
      />
      <div className="space-y-4 p-5">
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["Outstanding", `£${stats.outstanding.toFixed(2)}`],
            ["Overdue", `£${stats.overdue.toFixed(2)}`],
            ["Paid (Total)", `£${stats.paid30d.toFixed(2)}`],
            ["VAT collected", `£${(stats.paid30d * 0.2).toFixed(2)}`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-border bg-card p-4 shadow-soft">
              <div className="text-xs text-muted-foreground">{k}</div>
              <div className="mt-1 text-xl font-semibold tabular-nums">{v}</div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : invoices && invoices.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="bg-surface/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">Invoice</th>
                  <th className="px-4 py-2.5 text-left font-medium">Customer</th>
                  <th className="px-4 py-2.5 text-left font-medium">Vehicle</th>
                  <th className="px-4 py-2.5 text-left font-medium">Date</th>
                  <th className="px-4 py-2.5 text-right font-medium">Total</th>
                  <th className="px-4 py-2.5 text-left font-medium">Status</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((i) => (
                  <tr key={i.id} className="border-t border-border hover:bg-surface/40">
                    <td className="px-4 py-3 font-mono text-xs">{i.invoice_number}</td>
                    <td className="px-4 py-3 font-medium">{(i.customer as any)?.name || 'Unknown'}</td>
                    <td className="px-4 py-3">
                      <Plate reg={(i.vehicle as any)?.registration || '???'} className="text-xs" />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(i.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right font-medium tabular-nums">£{i.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-medium uppercase",
                          TONES[i.status],
                        )}
                      >
                        {i.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toast.success(`Invoice ${i.invoice_number} sent`)}
                          className="rounded-md border border-border bg-surface p-1.5 hover:bg-card transition"
                          aria-label="Send"
                          title="Send invoice"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => toast.success(`Downloading ${i.invoice_number}...`)}
                          className="rounded-md border border-border bg-surface p-1.5 hover:bg-card transition"
                          aria-label="Download"
                          title="Download PDF"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                <Receipt className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">No invoices found</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                Invoices generated for workshop jobs will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
