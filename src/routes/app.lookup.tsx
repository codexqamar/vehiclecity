import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { VehicleLookup } from "@/components/site/VehicleLookup";
import { Plate } from "@/components/site/Plate";
import { Bookmark, History } from "lucide-react";

export const Route = createFileRoute("/app/lookup")({
  head: () => ({ meta: [{ title: "DVLA Lookup · GarageFlow UK" }] }),
  component: Lookup,
});

const RECENT = [
  { reg: "AB12 CDE", car: "Ford Focus ST-Line", when: "2 min ago", who: "James" },
  { reg: "LX21 KZV", car: "VW Golf GTI", when: "14 min ago", who: "Priya" },
  { reg: "EV70 BYD", car: "Tesla Model 3 LR", when: "1 h ago", who: "Sam" },
  { reg: "MK67 TYR", car: "BMW 320d", when: "Today, 09:32", who: "Sarah" },
  { reg: "RV68 OMG", car: "Range Rover Sport", when: "Yesterday", who: "Naomi" },
];

const SAVED = [
  { reg: "TS70 EVA", car: "Tesla Model Y", tag: "Fleet · Northgate" },
  { reg: "BV21 RKE", car: "Vauxhall Astra", tag: "Customer · I. Khan" },
];

function Lookup() {
  return (
    <>
      <AppTopbar title="DVLA Vehicle Lookup" subtitle="Real-time data from the DVLA Vehicle Enquiry Service" />
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
              {[["Avg. response", "412 ms"], ["Lookups today", "47"], ["Cache hit rate", "68%"]].map(([k,v]) => (
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
              <History className="h-4 w-4 text-muted-foreground" /> Recent searches
            </div>
            <ul className="divide-y divide-border">
              {RECENT.map((r) => (
                <li key={r.reg} className="flex items-center gap-3 px-4 py-2.5">
                  <Plate reg={r.reg} className="text-xs" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate text-sm font-medium">{r.car}</div>
                    <div className="text-[11px] text-muted-foreground">{r.when} · {r.who}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-soft">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3 text-sm font-semibold tracking-tight">
              <Bookmark className="h-4 w-4 text-muted-foreground" /> Saved
            </div>
            <ul className="divide-y divide-border">
              {SAVED.map((r) => (
                <li key={r.reg} className="px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <Plate reg={r.reg} className="text-xs" />
                    <div className="text-sm font-medium">{r.car}</div>
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{r.tag}</div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
