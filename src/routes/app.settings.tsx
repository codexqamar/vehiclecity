import { createFileRoute, Link } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings · VehicleCity UK" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const handleLogout = () => {
    // Simulate logout logic
    window.location.href = "/auth";
  };

  return (
    <>
      <AppTopbar title="Settings" subtitle="Workspace, team, integrations" />
      <div className="grid gap-5 p-5 lg:grid-cols-3">
        <Card title="Workspace">
          <Field label="Name" value="Reliable Motors" />
          <Field label="Branch" value="Manchester · Trafford Park" />
          <Field label="VAT number" value="GB 421 8830 12" />
        </Card>
        <Card title="DVLA API">
          <Field label="API key" value="dvla_••••••••••••2841" mono />
          <Field label="Daily quota" value="2,500 lookups" />
          <Field label="Rotation" value="Every 90 days" />
        </Card>
        <Card title="Integrations">
          <Row label="Stripe" status="Connected" tone="success" />
          <Row label="Xero" status="Connected" tone="success" />
          <Row label="DVSA MOT history" status="Coming soon" tone="muted" />
          <Row label="Twilio SMS" status="Connected" tone="success" />
        </Card>
        <Card title="Team & roles">
          <Row label="Sarah Patel" status="Owner" tone="accent" />
          <Row label="James Wright" status="Mechanic" tone="muted" />
          <Row label="Priya Sandhu" status="Mechanic" tone="muted" />
          <Row label="Naomi Clarke" status="Service advisor" tone="muted" />
        </Card>
        <Card title="Notifications">
          <Field label="MOT reminders" value="30 / 14 / 3 days before expiry" />
          <Field label="SMS quiet hours" value="20:00 – 08:00" />
          <Field label="Daily digest" value="07:30 to owners" />
        </Card>
        <Card title="Security & Session">
          <Field label="Two-factor" value="Enforced for all admins" />
          <Field label="Data region" value="UK South" />
          <div className="p-4 pt-2">
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/20 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out of VehicleCity
            </button>
          </div>
        </Card>
      </div>
    </>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-soft">
      <div className="border-b border-border px-5 py-3 text-sm font-semibold tracking-tight">
        {title}
      </div>
      <div className="divide-y divide-border">{children}</div>
    </div>
  );
}
function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={mono ? "font-mono text-xs" : "font-medium"}>{value}</span>
    </div>
  );
}
function Row({
  label,
  status,
  tone,
}: {
  label: string;
  status: string;
  tone: "success" | "muted" | "accent";
}) {
  const toneCls =
    tone === "success"
      ? "bg-success/10 text-success"
      : tone === "accent"
        ? "bg-accent/10 text-accent"
        : "bg-muted text-muted-foreground";
  return (
    <div className="flex items-center justify-between px-5 py-3 text-sm">
      <span className="font-medium">{label}</span>
      <span className={"rounded-full px-2 py-0.5 text-[11px] font-medium " + toneCls}>
        {status}
      </span>
    </div>
  );
}
