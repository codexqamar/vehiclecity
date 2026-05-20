import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { Plate } from "@/components/site/Plate";
import { cn } from "@/lib/utils";
import { Download, Send } from "lucide-react";

export const Route = createFileRoute("/app/invoices")({
  head: () => ({ meta: [{ title: "Invoices · VehicleCity UK" }] }),
  component: Invoices,
});

const INVOICES = [
  {
    id: "INV-2026-0421",
    reg: "AB12 CDE",
    customer: "Imran Khan",
    total: "£412.40",
    status: "Paid",
    date: "12 May 2026",
  },
  {
    id: "INV-2026-0420",
    reg: "LX21 KZV",
    customer: "Sarah Mitchell",
    total: "£284.00",
    status: "Sent",
    date: "11 May 2026",
  },
  {
    id: "INV-2026-0419",
    reg: "EV70 BYD",
    customer: "Aisha Begum",
    total: "£1,240.00",
    status: "Overdue",
    date: "02 May 2026",
  },
  {
    id: "INV-2026-0418",
    reg: "RV68 OMG",
    customer: "Daniel O'Connor",
    total: "£860.50",
    status: "Paid",
    date: "28 Apr 2026",
  },
  {
    id: "INV-2026-0417",
    reg: "MK67 TYR",
    customer: "Olivia Hart",
    total: "£185.00",
    status: "Draft",
    date: "20 Apr 2026",
  },
];

const TONES: Record<string, string> = {
  Paid: "bg-success/10 text-success",
  Sent: "bg-accent/10 text-accent",
  Overdue: "bg-destructive/10 text-destructive",
  Draft: "bg-muted text-muted-foreground",
};

function Invoices() {
  return (
    <>
      <AppTopbar
        title="Invoices"
        subtitle="VAT-compliant invoicing · Stripe connected"
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
            New invoice
          </button>
        }
      />
      <div className="space-y-4 p-5">
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["Outstanding", "£3,420.00"],
            ["Overdue", "£1,240.00"],
            ["Paid (30d)", "£18,640.00"],
            ["VAT collected", "£3,107.00"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-border bg-card p-4 shadow-soft">
              <div className="text-xs text-muted-foreground">{k}</div>
              <div className="mt-1 text-xl font-semibold tabular-nums">{v}</div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
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
              {INVOICES.map((i) => (
                <tr key={i.id} className="border-t border-border hover:bg-surface/40">
                  <td className="px-4 py-3 font-mono text-xs">{i.id}</td>
                  <td className="px-4 py-3 font-medium">{i.customer}</td>
                  <td className="px-4 py-3">
                    <Plate reg={i.reg} className="text-xs" />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{i.date}</td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums">{i.total}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-medium",
                        TONES[i.status],
                      )}
                    >
                      {i.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="rounded-md border border-border bg-surface p-1.5 hover:bg-card transition"
                        aria-label="Send"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </button>
                      <button
                        className="rounded-md border border-border bg-surface p-1.5 hover:bg-card transition"
                        aria-label="Download"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
