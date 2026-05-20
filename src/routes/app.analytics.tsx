import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  LineChart,
  Legend,
} from "recharts";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Analytics · VehicleCity UK" }] }),
  component: Analytics,
});

const REVENUE_MONTHLY = [
  { m: "Dec", v: 18200 },
  { m: "Jan", v: 21400 },
  { m: "Feb", v: 19800 },
  { m: "Mar", v: 24600 },
  { m: "Apr", v: 26200 },
  { m: "May", v: 24820 },
];
const LOOKUPS = [
  { d: "W1", v: 312, mot: 84 },
  { d: "W2", v: 410, mot: 102 },
  { d: "W3", v: 388, mot: 92 },
  { d: "W4", v: 472, mot: 118 },
];

function Analytics() {
  return (
    <>
      <AppTopbar title="Analytics" subtitle="Operational insight across your workspace" />
      <div className="grid gap-5 p-5 lg:grid-cols-2">
        <Card title="Revenue · last 6 months" total="£135,020">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={REVENUE_MONTHLY} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="m"
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `£${v / 1000}k`}
                width={42}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(v: number) => [`£${v.toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="v" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="DVLA lookups vs MOT bookings" total="1,582">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={LOOKUPS} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="d"
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                axisLine={false}
                tickLine={false}
                width={36}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line
                dataKey="v"
                name="Lookups"
                stroke="var(--color-accent)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="mot"
                name="MOT booked"
                stroke="var(--color-chart-2)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );
}

function Card({
  title,
  total,
  children,
}: {
  title: string;
  total: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div className="text-sm font-semibold tracking-tight">{title}</div>
        <div className="text-sm font-semibold tabular-nums">{total}</div>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
}
