import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { Plate } from "@/components/site/Plate";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/fleet")({
  head: () => ({ meta: [{ title: "Fleet · GarageFlow UK" }] }),
  component: Fleet,
});

const FLEETS = [
  { name: "Northgate Fleet", vehicles: 42, motDue: 4, taxDue: 2, health: 92 },
  { name: "Pennine Recovery", vehicles: 18, motDue: 1, taxDue: 0, health: 96 },
  { name: "EV Specialists Co.", vehicles: 9, motDue: 0, taxDue: 1, health: 99 },
];

const VEHICLES = [
  { reg: "TS70 EVA", car: "Tesla Model Y", driver: "M. Reilly", mot: "09 Nov 2026", tax: "OK", mileage: "24,820" },
  { reg: "BD22 LRY", car: "Mercedes Sprinter", driver: "K. Otieno", mot: "12 Aug 2026", tax: "OK", mileage: "118,402" },
  { reg: "FN19 TRN", car: "Ford Transit Custom", driver: "P. Singh", mot: "02 Jun 2026", tax: "Due 30d", mileage: "94,310" },
  { reg: "VW70 CAD", car: "VW Caddy Cargo", driver: "L. Adamou", mot: "18 Mar 2026", tax: "OK", mileage: "61,005" },
];

function Fleet() {
  return (
    <>
      <AppTopbar title="Fleet" subtitle="3 fleets · 69 vehicles · 5 alerts" />
      <div className="space-y-5 p-5">
        <div className="grid gap-3 lg:grid-cols-3">
          {FLEETS.map((f) => (
            <div key={f.name} className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <div className="font-semibold tracking-tight">{f.name}</div>
                <span className="text-xs text-muted-foreground tabular-nums">{f.vehicles} vehicles</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-success" style={{ width: `${f.health}%` }} />
                </div>
                <span className="text-xs font-medium tabular-nums">{f.health}%</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-md border border-border bg-surface/40 p-2.5">
                  <div className="text-muted-foreground">MOT due</div>
                  <div className="mt-0.5 text-base font-semibold tabular-nums">{f.motDue}</div>
                </div>
                <div className="rounded-md border border-border bg-surface/40 p-2.5">
                  <div className="text-muted-foreground">Tax due</div>
                  <div className="mt-0.5 text-base font-semibold tabular-nums">{f.taxDue}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          <div className="border-b border-border px-5 py-3 text-sm font-semibold tracking-tight">Vehicles — Northgate Fleet</div>
          <table className="w-full text-sm">
            <thead className="bg-surface/60 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Vehicle</th>
                <th className="px-4 py-2.5 text-left font-medium">Driver</th>
                <th className="px-4 py-2.5 text-left font-medium">MOT expires</th>
                <th className="px-4 py-2.5 text-left font-medium">Tax</th>
                <th className="px-4 py-2.5 text-right font-medium">Mileage</th>
              </tr>
            </thead>
            <tbody>
              {VEHICLES.map((v) => (
                <tr key={v.reg} className="border-t border-border hover:bg-surface/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Plate reg={v.reg} className="text-xs" />
                      <span className="font-medium">{v.car}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{v.driver}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.mot}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-medium",
                      v.tax === "OK" ? "bg-success/10 text-success" : "bg-warning/15 text-warning-foreground",
                    )}>{v.tax}</span>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{v.mileage} mi</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
