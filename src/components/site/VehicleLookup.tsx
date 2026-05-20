import { useState } from "react";
import { lookupVehicle, type DvlaVehicle } from "@/lib/dvla";
import { Plate } from "./Plate";
import { cn } from "@/lib/utils";
import { Search, Loader2, CheckCircle2, AlertTriangle, Fuel, Calendar, Gauge, Palette, Hash, ShieldCheck } from "lucide-react";

const SUGGESTIONS = ["AB12 CDE", "LX21 KZV", "EV70 BYD", "RV68 OMG"];

export function VehicleLookup({ embedded = false }: { embedded?: boolean }) {
  const [reg, setReg] = useState("");
  const [data, setData] = useState<DvlaVehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(input?: string) {
    const value = (input ?? reg).trim();
    if (!value) return;
    setLoading(true); setError(null);
    try {
      const v = await lookupVehicle(value);
      setData(v);
      setReg(value);
    } catch (e: any) {
      setError(e.message ?? "Lookup failed");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("w-full", embedded && "max-w-none")}>
      <form
        onSubmit={(e) => { e.preventDefault(); void run(); }}
        className="group relative flex items-center gap-2 rounded-xl border border-border bg-card p-2 shadow-elevated"
      >
        <div className="flex items-center gap-2 pl-2 text-muted-foreground">
          <Search className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-wider">DVLA</span>
        </div>
        <div className="h-6 w-px bg-border" />
        <input
          value={reg}
          onChange={(e) => setReg(e.target.value.toUpperCase())}
          placeholder="Enter UK registration  e.g. AB12 CDE"
          className="plate-font flex-1 bg-transparent px-2 py-2 text-base outline-none placeholder:font-sans placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-muted-foreground"
          maxLength={8}
          autoCorrect="off" autoCapitalize="characters" spellCheck={false}
        />
        <button
          type="submit"
          disabled={loading || !reg}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Look up
        </button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>Try:</span>
        {SUGGESTIONS.map((s) => (
          <button key={s} onClick={() => void run(s)} className="rounded-md border border-border bg-surface px-2 py-1 font-mono tracking-wider hover:border-accent/40 hover:text-foreground transition">
            {s}
          </button>
        ))}
      </div>

      {/* Result */}
      <div className="mt-5">
        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
            <AlertTriangle className="mt-0.5 h-4 w-4 text-destructive" />
            <div>
              <div className="font-medium text-destructive">Lookup failed</div>
              <div className="text-muted-foreground">{error}</div>
            </div>
          </div>
        )}

        {loading && <LookupSkeleton />}

        {data && !loading && <VehicleCard v={data} />}

        {!data && !loading && !error && (
          <div className="rounded-xl border border-dashed border-border bg-surface/40 p-8 text-center text-sm text-muted-foreground">
            Enter a registration to retrieve DVLA vehicle data.
          </div>
        )}
      </div>
    </div>
  );
}

function LookupSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="h-2 shimmer" />
      <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-card p-4">
            <div className="h-3 w-16 rounded bg-muted shimmer" />
            <div className="mt-2 h-4 w-24 rounded bg-muted shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}

function VehicleCard({ v }: { v: DvlaVehicle }) {
  const taxOk = v.taxStatus === "Taxed";
  const motOk = v.motStatus === "Valid";
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-elevated">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface/60 px-5 py-4">
        <div className="flex items-center gap-3">
          <Plate reg={v.registrationNumber} />
          <div>
            <div className="font-semibold tracking-tight">{titleCase(v.make)} {v.model}</div>
            <div className="text-xs text-muted-foreground">First registered {fmtMonth(v.monthOfFirstRegistration)} · {v.yearOfManufacture}</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill ok={taxOk} okLabel={`Tax · ${v.taxStatus}`} badLabel={`Tax · ${v.taxStatus}`} />
          <StatusPill ok={motOk} okLabel={`MOT · ${v.motStatus}`} badLabel={`MOT · ${v.motStatus}`} />
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
        <Field icon={Fuel} label="Fuel" value={titleCase(v.fuelType)} />
        <Field icon={Gauge} label="Engine" value={v.engineCapacity ? `${v.engineCapacity} cc` : "—"} />
        <Field icon={Palette} label="Colour" value={v.colour} />
        <Field icon={Hash} label="CO₂" value={`${v.co2Emissions} g/km`} />
        <Field icon={ShieldCheck} label="Euro status" value={v.euroStatus} />
        <Field icon={Calendar} label="MOT expires" value={fmtDate(v.motExpiryDate)} />
        <Field icon={Calendar} label="Tax due" value={fmtDate(v.taxDueDate)} />
        <Field icon={Hash} label="Type approval" value={v.typeApproval} />
      </dl>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-surface/40 px-5 py-3 text-xs text-muted-foreground">
        <span>Source: DVLA Vehicle Enquiry Service · cached for 24h</span>
        <span className="font-mono">{v.wheelplan}</span>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-card p-4">
      <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}

function StatusPill({ ok, okLabel, badLabel }: { ok: boolean; okLabel: string; badLabel: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
      ok ? "border-success/30 bg-success/10 text-success" : "border-destructive/30 bg-destructive/10 text-destructive",
    )}>
      {ok ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
      {ok ? okLabel : badLabel}
    </span>
  );
}

function titleCase(s: string) {
  return s.toLowerCase().replace(/(^|[\s-])\w/g, (m) => m.toUpperCase());
}
function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtMonth(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}
