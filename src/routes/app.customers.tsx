import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/app/customers")({
  head: () => ({ meta: [{ title: "Customers · VehicleCity UK" }] }),
  component: Customers,
});

const CUSTOMERS = [
  {
    name: "Imran Khan",
    email: "imran.khan@gmail.com",
    phone: "07700 900 421",
    vehicles: 3,
    spend: "£1,840",
    tag: "Regular",
  },
  {
    name: "Sarah Mitchell",
    email: "s.mitchell@me.com",
    phone: "07700 900 118",
    vehicles: 1,
    spend: "£620",
    tag: "Active",
  },
  {
    name: "Aisha Begum",
    email: "aisha@northgate.co",
    phone: "07700 900 552",
    vehicles: 12,
    spend: "£14,210",
    tag: "Fleet",
  },
  {
    name: "Daniel O'Connor",
    email: "dan.oc@outlook.com",
    phone: "07700 900 904",
    vehicles: 2,
    spend: "£3,420",
    tag: "VIP",
  },
  {
    name: "Olivia Hart",
    email: "o.hart@gmail.com",
    phone: "07700 900 030",
    vehicles: 1,
    spend: "£185",
    tag: "New",
  },
  {
    name: "Marcus Webb",
    email: "marcus@webb.dev",
    phone: "07700 900 712",
    vehicles: 1,
    spend: "£940",
    tag: "Regular",
  },
];

function Customers() {
  return (
    <>
      <AppTopbar
        title="Customers"
        subtitle="643 active customers · 12 added this week"
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
            <Plus className="h-3.5 w-3.5" /> Add customer
          </button>
        }
      />
      <div className="p-5">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-surface/60 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Customer</th>
                <th className="px-4 py-2.5 text-left font-medium">Contact</th>
                <th className="px-4 py-2.5 text-left font-medium">Vehicles</th>
                <th className="px-4 py-2.5 text-left font-medium">Lifetime spend</th>
                <th className="px-4 py-2.5 text-left font-medium">Tag</th>
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((c) => (
                <tr key={c.email} className="border-t border-border hover:bg-surface/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground">
                        {c.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </div>
                      <span className="font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">{c.email}</div>
                    <div className="text-xs text-muted-foreground">{c.phone}</div>
                  </td>
                  <td className="px-4 py-3 tabular-nums">{c.vehicles}</td>
                  <td className="px-4 py-3 tabular-nums font-medium">{c.spend}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {c.tag}
                    </span>
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
