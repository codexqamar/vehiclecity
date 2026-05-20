import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { Plate } from "@/components/site/Plate";
import { cn } from "@/lib/utils";
import { Filter, Download, Plus } from "lucide-react";

export const Route = createFileRoute("/app/vehicles")({
  head: () => ({ meta: [{ title: "Vehicles · VehicleCity UK" }] }),
  component: Vehicles,
});

const ROWS = [
  {
    reg: "AB12 CDE",
    car: "Ford Focus ST-Line",
    owner: "Imran Khan",
    mot: { s: "Valid", d: "12 Apr 2026" },
    tax: "Taxed",
    last: "12 May 2026",
  },
  {
    reg: "LX21 KZV",
    car: "Volkswagen Golf GTI",
    owner: "Sarah Mitchell",
    mot: { s: "Valid", d: "15 Jul 2026" },
    tax: "Taxed",
    last: "09 May 2026",
  },
  {
    reg: "EV70 BYD",
    car: "Tesla Model 3 LR",
    owner: "Aisha Begum",
    mot: { s: "Valid", d: "22 Oct 2026" },
    tax: "Taxed",
    last: "30 Apr 2026",
  },
  {
    reg: "RV68 OMG",
    car: "Range Rover Sport HSE",
    owner: "Daniel O'Connor",
    mot: { s: "Not valid", d: "04 Oct 2025" },
    tax: "SORN",
    last: "01 Sep 2025",
  },
  {
    reg: "MK67 TYR",
    car: "BMW 320d M Sport",
    owner: "Olivia Hart",
    mot: { s: "Valid", d: "18 Mar 2026" },
    tax: "Taxed",
    last: "11 Mar 2026",
  },
  {
    reg: "FG19 PLM",
    car: "Audi A4 40 TFSI",
    owner: "Marcus Webb",
    mot: { s: "Valid", d: "02 Jun 2026" },
    tax: "Taxed",
    last: "20 Apr 2026",
  },
  {
    reg: "BV21 RKE",
    car: "Vauxhall Astra SRi",
    owner: "Imran Khan",
    mot: { s: "Valid", d: "28 Feb 2026" },
    tax: "Taxed",
    last: "28 Feb 2026",
  },
  {
    reg: "TS70 EVA",
    car: "Tesla Model Y",
    owner: "Northgate Fleet",
    mot: { s: "Valid", d: "09 Nov 2026" },
    tax: "Taxed",
    last: "15 May 2026",
  },
];

function Vehicles() {
  return (
    <>
      <AppTopbar
        title="Vehicles"
        subtitle="2,841 vehicles in your workspace"
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
            <Plus className="h-3.5 w-3.5" /> Add vehicle
          </button>
        }
      />
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          {["All", "MOT due", "Taxed", "SORN", "Fleet", "EV"].map((t, i) => (
            <button
              key={t}
              className={cn(
                "rounded-md border px-2.5 py-1.5 text-xs font-medium transition",
                i === 0
                  ? "border-foreground/20 bg-foreground/5 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs">
              <Filter className="h-3.5 w-3.5" /> Filter
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
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
              {ROWS.map((r) => (
                <tr key={r.reg} className="border-t border-border hover:bg-surface/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Plate reg={r.reg} className="text-xs" />
                      <span className="font-medium">{r.car}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.owner}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-medium",
                        r.mot.s === "Valid"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive",
                      )}
                    >
                      {r.mot.s}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">{r.mot.d}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-medium",
                        r.tax === "Taxed"
                          ? "bg-success/10 text-success"
                          : "bg-warning/15 text-warning-foreground",
                      )}
                    >
                      {r.tax}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.last}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded-md border border-border bg-surface px-2 py-1 text-xs hover:bg-card transition">
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
            <span>Showing 8 of 2,841</span>
            <div className="flex items-center gap-1">
              <button className="rounded border border-border bg-card px-2 py-1 hover:bg-surface">
                Prev
              </button>
              <button className="rounded border border-border bg-card px-2 py-1 hover:bg-surface">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
