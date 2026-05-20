import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
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

function Analytics() {
  const { session } = Route.useRouteContext();
  const workspaceId = session.user.id;

  const { data: revenueData, isLoading: isRevLoading } = useQuery({
    queryKey: ["analytics-revenue", workspaceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select("amount, created_at, status")
        .eq("workspace_id", workspaceId)
        .eq("status", "paid");

      if (error) throw error;

      // Group by month
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const grouped = data.reduce((acc: any, inv) => {
        const month = months[new Date(inv.created_at).getMonth()];
        acc[month] = (acc[month] || 0) + inv.amount;
        return acc;
      }, {});

      return months.map(m => ({ m, v: grouped[m] || 0 })).filter((item, idx) => {
         const currentMonth = new Date().getMonth();
         return idx <= currentMonth && idx >= currentMonth - 5;
      });
    },
  });

  const { data: jobStats, isLoading: isJobsLoading } = useQuery({
    queryKey: ["analytics-jobs", workspaceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("created_at, service_type")
        .eq("workspace_id", workspaceId);

      if (error) throw error;

      // Logic for job trend (simplified)
      return [
        { d: "W1", v: data.length, mot: data.filter(j => j.service_type?.toLowerCase().includes('mot')).length },
      ];
    },
  });

  const totalRevenue = revenueData?.reduce((acc, curr) => acc + curr.v, 0) || 0;

  return (
    <>
      <AppTopbar title="Analytics" subtitle="Operational insight across your workspace" />
      <div className="grid gap-5 p-5 lg:grid-cols-2">
        <Card title="Revenue · last 6 months" total={`£${totalRevenue.toLocaleString()}`}>
          {isRevLoading ? (
            <div className="h-[260px] flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={revenueData} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
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
                  tickFormatter={(v) => `£${v >= 1000 ? (v / 1000) + 'k' : v}`}
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
          )}
        </Card>

        <Card title="Job Volume Trend" total={jobStats?.[0]?.v.toString() || "0"}>
          {isJobsLoading ? (
            <div className="h-[260px] flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={jobStats} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
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
                  name="Total Jobs"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="mot"
                  name="MOTs"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
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
