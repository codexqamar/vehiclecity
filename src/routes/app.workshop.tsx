import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { Plate } from "@/components/site/Plate";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/app/workshop")({
  head: () => ({ meta: [{ title: "Workshop · GarageFlow UK" }] }),
  component: Workshop,
});

const COLS = [
  { id: "queue", title: "Booked", tone: "bg-muted text-muted-foreground" },
  { id: "diag", title: "Diagnostics", tone: "bg-warning/15 text-warning-foreground" },
  { id: "bay", title: "In bay", tone: "bg-accent/15 text-accent" },
  { id: "parts", title: "Awaiting parts", tone: "bg-muted text-muted-foreground" },
  { id: "ready", title: "Ready", tone: "bg-success/15 text-success" },
];

const CARDS: Record<string, Array<{ reg: string; car: string; who: string; svc: string; eta: string }>> = {
  queue: [
    { reg: "MK67 TYR", car: "BMW 320d", who: "—", svc: "MOT + service", eta: "Today 14:00" },
    { reg: "FG19 PLM", car: "Audi A4", who: "—", svc: "Diagnostic", eta: "Today 15:30" },
  ],
  diag: [
    { reg: "AB12 CDE", car: "Ford Focus", who: "James", svc: "Misfire investigation", eta: "11:40" },
  ],
  bay: [
    { reg: "LX21 KZV", car: "VW Golf GTI", who: "Priya", svc: "Brake replacement", eta: "13:10" },
    { reg: "BV21 RKE", car: "Vauxhall Astra", who: "Naomi", svc: "Clutch", eta: "16:00" },
  ],
  parts: [
    { reg: "EV70 BYD", car: "Tesla Model 3", who: "Sam", svc: "12V battery", eta: "16:20" },
  ],
  ready: [
    { reg: "RV68 OMG", car: "Range Rover Sport", who: "Naomi", svc: "Full service", eta: "Collected" },
    { reg: "TS70 EVA", car: "Tesla Model Y", who: "Sam", svc: "Annual check", eta: "Collected" },
  ],
};

function Workshop() {
  return (
    <>
      <AppTopbar
        title="Workshop"
        subtitle="Live status across 5 bays · 4 mechanics on shift"
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
            <Plus className="h-3.5 w-3.5" /> New job
          </button>
        }
      />
      <div className="overflow-x-auto p-5">
        <div className="flex min-w-max gap-4">
          {COLS.map((c) => (
            <div key={c.id} className="w-72 shrink-0">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", c.tone)}>{c.title}</span>
                  <span className="text-xs text-muted-foreground">{CARDS[c.id].length}</span>
                </div>
                <button className="text-muted-foreground hover:text-foreground"><Plus className="h-3.5 w-3.5" /></button>
              </div>
              <div className="mt-2 space-y-2">
                {CARDS[c.id].map((card) => (
                  <div key={card.reg} className="cursor-grab rounded-lg border border-border bg-card p-3 shadow-soft transition hover:border-foreground/15">
                    <div className="flex items-center justify-between">
                      <Plate reg={card.reg} className="text-xs" />
                      <span className="text-[11px] text-muted-foreground tabular-nums">{card.eta}</span>
                    </div>
                    <div className="mt-2 text-sm font-medium">{card.car}</div>
                    <div className="text-xs text-muted-foreground">{card.svc}</div>
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
                      <div className="text-[11px] text-muted-foreground">Bay {Math.ceil(Math.random()*4)+1}</div>
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium">
                        {card.who === "—" ? "?" : card.who[0]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
