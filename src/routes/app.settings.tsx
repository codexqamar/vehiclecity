import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { LogOut, Loader2, Save, Link2, Bell, ShieldCheck, Globe, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings · VehicleCity UK" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { session } = Route.useRouteContext();
  const workspaceId = session.user.id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Profile fields
  const [businessName, setBusinessName] = useState("");
  const [branch, setBranch] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [dvlaApiKey, setDvlaApiKey] = useState("");
  
  // Integrations
  const [stripeConnected, setStripeConnected] = useState(false);
  const [xeroConnected, setXeroConnected] = useState(false);
  const [twilioSid, setTwilioSid] = useState("");
  const [twilioToken, setTwilioToken] = useState("");
  const [twilioNumber, setTwilioNumber] = useState("");
  const [twilioEnabled, setTwilioEnabled] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", workspaceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", workspaceId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (profile) {
      const p = profile as any;
      setBusinessName(p.business_name || "");
      setBranch(p.branch || "");
      setVatNumber(p.vat_number || "");
      setDvlaApiKey(p.dvla_api_key || "");
      setStripeConnected(!!p.stripe_connected);
      setXeroConnected(!!p.xero_connected);
      setTwilioSid(p.twilio_sid || "");
      setTwilioToken(p.twilio_token || "");
      setTwilioNumber(p.twilio_number || "");
      setTwilioEnabled(!!p.twilio_enabled);
    }
  }, [profile]);

  const updateProfile = useMutation({
    mutationFn: async (updates: any) => {
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", workspaceId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Settings updated");
      queryClient.invalidateQueries({ queryKey: ["profile", workspaceId] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update settings");
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate({ to: "/auth" });
  };

  return (
    <>
      <AppTopbar title="Settings" subtitle="Manage your workspace integrations and preferences" />
      <div className="grid gap-5 p-5 lg:grid-cols-3">
        {/* Workspace Card */}
        <Card title="Workspace" icon={<Globe className="h-4 w-4" />}>
          {isLoading ? (
            <div className="p-4 flex justify-center">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Business Name</label>
                <div className="flex gap-2">
                  <Input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Reliable Motors"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => updateProfile.mutate({ business_name: businessName })}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Branch</label>
                <div className="flex gap-2">
                  <Input
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="Manchester · Trafford Park"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => updateProfile.mutate({ branch })}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">VAT Number</label>
                <div className="flex gap-2">
                  <Input
                    value={vatNumber}
                    onChange={(e) => setVatNumber(e.target.value)}
                    placeholder="GB 421 8830 12"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => updateProfile.mutate({ vat_number: vatNumber })}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Integrations Card */}
        <Card title="Integrations" icon={<Link2 className="h-4 w-4" />}>
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Stripe Payments</div>
                <div className="text-xs text-muted-foreground">Accept card payments on invoices</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-full", stripeConnected ? "bg-success/10 text-success" : "bg-muted text-muted-foreground")}>
                  {stripeConnected ? "Connected" : "Disconnected"}
                </span>
                <Switch 
                  checked={stripeConnected} 
                  onCheckedChange={(val) => {
                    setStripeConnected(val);
                    updateProfile.mutate({ stripe_connected: val });
                  }} 
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-5 py-4">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Xero Accounting</div>
                <div className="text-xs text-muted-foreground">Sync invoices and customers</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-full", xeroConnected ? "bg-success/10 text-success" : "bg-muted text-muted-foreground")}>
                  {xeroConnected ? "Connected" : "Disconnected"}
                </span>
                <Switch 
                  checked={xeroConnected} 
                  onCheckedChange={(val) => {
                    setXeroConnected(val);
                    updateProfile.mutate({ xero_connected: val });
                  }} 
                />
              </div>
            </div>

            <div className="p-5 space-y-4 bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Twilio SMS</div>
                <Switch 
                  checked={twilioEnabled} 
                  onCheckedChange={(val) => {
                    setTwilioEnabled(val);
                    updateProfile.mutate({ twilio_enabled: val });
                  }} 
                />
              </div>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Account SID</label>
                  <Input 
                    size="sm"
                    className="h-8 text-xs"
                    value={twilioSid}
                    onChange={(e) => setTwilioSid(e.target.value)}
                    placeholder="AC..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Auth Token</label>
                  <Input 
                    size="sm"
                    type="password"
                    className="h-8 text-xs"
                    value={twilioToken}
                    onChange={(e) => setTwilioToken(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Sender Number/ID</label>
                  <div className="flex gap-2">
                    <Input 
                      size="sm"
                      className="h-8 text-xs"
                      value={twilioNumber}
                      onChange={(e) => setTwilioNumber(e.target.value)}
                      placeholder="+44..."
                    />
                    <Button 
                      size="sm" 
                      className="h-8 px-2"
                      variant="secondary"
                      onClick={() => updateProfile.mutate({ 
                        twilio_sid: twilioSid,
                        twilio_token: twilioToken,
                        twilio_number: twilioNumber
                      })}
                    >
                      <Save className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* DVLA API Card */}
        <Card title="DVLA API" icon={<Link2 className="h-4 w-4" />}>
          <div className="p-5 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">API Key</label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value={dvlaApiKey}
                  onChange={(e) => setDvlaApiKey(e.target.value)}
                  placeholder="dvla_••••••••••••"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateProfile.mutate({ dvla_api_key: dvlaApiKey })}
                >
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Field label="Daily quota" value="2,500 lookups" />
            <Field label="Rotation" value="Every 90 days" />
          </div>
        </Card>

        <Card title="Notifications" icon={<Bell className="h-4 w-4" />}>
          <div className="divide-y divide-border">
            <Field label="MOT reminders" value="30 / 14 / 3 days" />
            <Field label="SMS quiet hours" value="20:00 – 08:00" />
            <div className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="text-muted-foreground">Daily digest</span>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card title="Security & Session" icon={<ShieldCheck className="h-4 w-4" />}>
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="text-muted-foreground">Two-factor auth</span>
              <span className="text-[10px] font-bold uppercase bg-warning/10 text-warning px-2 py-0.5 rounded-full">Recommended</span>
            </div>
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
          </div>
        </Card>

        <Card title="Team & roles" icon={<Globe className="h-4 w-4" />}>
          <div className="divide-y divide-border">
            <Row label={session.user.email || "User"} status="Owner" tone="accent" />
            <div className="p-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-2"
                onClick={() => toast.success("Invitation link copied to clipboard")}
              >
                <Plus className="h-3.5 w-3.5" /> Invite team member
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

function Card({ title, children, icon }: { title: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
      <div className="border-b border-border px-5 py-3 text-sm font-semibold tracking-tight flex items-center gap-2 bg-muted/20">
        {icon}
        {title}
      </div>
      <div>{children}</div>
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
      <span className="font-medium truncate">{label}</span>
      <span className={"rounded-full px-2 py-0.5 text-[11px] font-medium shrink-0 " + toneCls}>
        {status}
      </span>
    </div>
  );
}
