import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { Plate } from "@/components/site/Plate";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/calendar")({
  head: () => ({ meta: [{ title: "Calendar · VehicleCity UK" }] }),
  component: CalendarPage,
});

const HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];
const DAYS = ["Mon 20", "Tue 21", "Wed 22", "Thu 23", "Fri 24", "Sat 25"];

const EVENTS: Array<{
  day: number;
  start: number;
  end: number;
  reg: string;
  svc: string;
  tone: string;
}> = [
  {
    day: 0,
    start: 1,
    end: 3,
    reg: "MK67 TYR",
    svc: "MOT + service",
    tone: "bg-accent/15 text-accent border-accent/30",
  },
  {
    day: 0,
    start: 4,
    end: 6,
    reg: "AB12 CDE",
    svc: "Diagnostics",
    tone: "bg-warning/15 text-warning-foreground border-warning/30",
  },
  {
    day: 1,
    start: 2,
    end: 4,
    reg: "LX21 KZV",
    svc: "Brake replacement",
    tone: "bg-accent/15 text-accent border-accent/30",
  },
  {
    day: 2,
    start: 0,
    end: 2,
    reg: "EV70 BYD",
    svc: "Annual EV check",
    tone: "bg-success/15 text-success border-success/30",
  },
  {
    day: 3,
    start: 5,
    end: 7,
    reg: "FG19 PLM",
    svc: "Clutch replacement",
    tone: "bg-accent/15 text-accent border-accent/30",
  },
  {
    day: 4,
    start: 1,
    end: 3,
    reg: "BV21 RKE",
    svc: "MOT",
    tone: "bg-warning/15 text-warning-foreground border-warning/30",
  },
  {
    day: 5,
    start: 3,
    end: 5,
    reg: "TS70 EVA",
    svc: "Fleet inspection",
    tone: "bg-success/15 text-success border-success/30",
  },
];

function CalendarPage() {
  return (
    <>
      <AppTopbar title="Calendar" subtitle="Week of 20 May 2026 · Manchester branch" />
      <div className="p-5">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          <div
            className="grid border-b border-border"
            style={{ gridTemplateColumns: `64px repeat(${DAYS.length}, 1fr)` }}
          >
            <div />
            {DAYS.map((d) => (
              <div
                key={d}
                className="border-l border-border px-3 py-2 text-xs font-medium text-muted-foreground"
              >
                {d}
              </div>
            ))}
          </div>
          <div
            className="relative grid"
            style={{ gridTemplateColumns: `64px repeat(${DAYS.length}, 1fr)` }}
          >
            <div className="border-r border-border">
              {HOURS.map((h) => (
                <div
                  key={h}
                  className="h-16 border-b border-border px-2 pt-1 text-[10px] tabular-nums text-muted-foreground"
                >
                  {h}
                </div>
              ))}
            </div>
            {DAYS.map((_, di) => (
              <div key={di} className="relative border-l border-border">
                {HOURS.map((h) => (
                  <div key={h} className="h-16 border-b border-border" />
                ))}
                {EVENTS.filter((e) => e.day === di).map((e, i) => (
                  <div
                    key={i}
                    className={cn(
                      "absolute left-1 right-1 rounded-md border p-2 text-xs shadow-soft",
                      e.tone,
                    )}
                    style={{
                      top: `${e.start * 64 + 2}px`,
                      height: `${(e.end - e.start) * 64 - 4}px`,
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <Plate reg={e.reg} className="text-[10px]" />
                    </div>
                    <div className="mt-1 font-medium">{e.svc}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
