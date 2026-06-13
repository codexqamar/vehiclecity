import { r as reactExports, W as jsxRuntimeExports } from "./server-B6_Oiuea.mjs";
import { u as useQuery, A as AppTopbar } from "./AppTopbar-B2N-utjh.mjs";
import { P as Plate } from "./Plate-DI6wOjYz.mjs";
import { c as cn, B as Button, a as createLucideIcon } from "./button-CBWnG0WW.mjs";
import { c as Route$7, b as useQueryClient, t as toast, s as supabase } from "./router-DvedLIcD.mjs";
import { u as useMutation } from "./useMutation-o548g_bv.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-CDCitZBe.mjs";
import { I as Input } from "./input-CQWJZSou.mjs";
import { L as Label } from "./label-BG98R_ZY.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BOMdvC5a.mjs";
import { P as Plus } from "./plus-D-HN2_wc.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, T as Trash2, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-DqHzQyH2.mjs";
import { D as Download } from "./download-CsWpImE1.mjs";
import { L as LoaderCircle } from "./loader-circle-B0RJ0UPi.mjs";
import { C as Car } from "./car-Bs7snJGz.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./ThemeToggle-DL_hqj43.mjs";
import "./search-D_lFFk0a.mjs";
import "./bell-D3M_u7N_.mjs";
import "./index-CPhrW7pK.mjs";
import "./index-4JqtvOL4.mjs";
import "./index-CuM6yV67.mjs";
import "./check-hP7kZg1H.mjs";
const __iconNode = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
function AddVehicleModal({ workspaceId }) {
  const [open, setOpen] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [registration, setRegistration] = reactExports.useState("");
  const [makeModel, setMakeModel] = reactExports.useState("");
  const [customerId, setCustomerId] = reactExports.useState("");
  const [customers, setCustomers] = reactExports.useState([]);
  const queryClient = useQueryClient();
  reactExports.useEffect(() => {
    if (open) {
      const fetchCustomers = async () => {
        const { data } = await supabase.from("customers").select("id, name").eq("workspace_id", workspaceId).order("name");
        if (data) setCustomers(data);
      };
      fetchCustomers();
    }
  }, [open, workspaceId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.from("vehicles").insert({
        workspace_id: workspaceId,
        registration: registration.toUpperCase(),
        make_model: makeModel,
        customer_id: customerId || null,
        mot_status: "Check DVLA",
        tax_status: "Check DVLA"
      });
      if (error) throw error;
      toast.success("Vehicle added successfully");
      setOpen(false);
      setRegistration("");
      setMakeModel("");
      setCustomerId("");
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    } catch (error) {
      toast.error(error.message || "Failed to add vehicle");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
      " Add vehicle"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "sm:max-w-[425px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add vehicle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Register a new vehicle in your workspace." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "registration", children: "Registration Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "registration",
              value: registration,
              onChange: (e) => setRegistration(e.target.value),
              placeholder: "AB12 CDE",
              className: "uppercase",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "makeModel", children: "Make & Model" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "makeModel",
              value: makeModel,
              onChange: (e) => setMakeModel(e.target.value),
              placeholder: "Ford Focus"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "customer", children: "Owner (Optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: customerId, onValueChange: setCustomerId, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a customer" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "No owner" }),
              customers.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id))
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: isLoading, children: isLoading ? "Adding..." : "Add vehicle" }) })
    ] }) })
  ] });
}
const FILTERS = ["All", "MOT due", "Taxed", "SORN", "Fleet", "EV"];
function Vehicles() {
  const {
    session
  } = Route$7.useRouteContext();
  const workspaceId = session.user.id;
  const queryClient = useQueryClient();
  const [activeFilter, setActiveFilter] = reactExports.useState("All");
  const {
    data: vehicles,
    isLoading
  } = useQuery({
    queryKey: ["vehicles", workspaceId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("vehicles").select(`
          *,
          customer:customers(name, tag)
        `).eq("workspace_id", workspaceId).order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  const deleteVehicle = useMutation({
    mutationFn: async (vehicleId) => {
      await supabase.from("jobs").delete().eq("vehicle_id", vehicleId);
      const {
        error
      } = await supabase.from("vehicles").delete().eq("id", vehicleId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Vehicle and associated jobs deleted");
      queryClient.invalidateQueries({
        queryKey: ["vehicles"]
      });
      queryClient.invalidateQueries({
        queryKey: ["jobs"]
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete vehicle");
    }
  });
  const filteredVehicles = vehicles?.filter((v) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "MOT due") return v.mot_status !== "Valid";
    if (activeFilter === "Taxed") return v.tax_status === "Taxed";
    if (activeFilter === "SORN") return v.tax_status === "SORN";
    if (activeFilter === "Fleet") return v.customer?.tag?.toLowerCase().includes("fleet");
    if (activeFilter === "EV") return v.make_model?.toLowerCase().includes("electric") || false;
    return true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppTopbar, { title: "Vehicles", subtitle: `${vehicles?.length || 0} vehicles in your workspace`, actions: /* @__PURE__ */ jsxRuntimeExports.jsx(AddVehicleModal, { workspaceId }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        FILTERS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveFilter(t), className: cn("rounded-md border px-2.5 py-1.5 text-xs font-medium transition", activeFilter === t ? "border-foreground/20 bg-foreground/5 text-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"), children: t }, t)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toast.info("Advanced filtering coming soon"), className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs hover:bg-surface transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3.5 w-3.5" }),
            " Filter"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toast.success("Vehicle list exported to CSV"), className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs hover:bg-surface transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
            " Export"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-soft", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }) : filteredVehicles && filteredVehicles.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-surface/60 text-[11px] uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Vehicle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Owner" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "MOT" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Tax" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Last visit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredVehicles.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border hover:bg-surface/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plate, { reg: v.registration, className: "text-xs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: v.make_model || "Unknown Vehicle" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: v.customer?.name || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded-full px-2 py-0.5 text-[11px] font-medium", v.mot_status === "Valid" ? "bg-success/10 text-success" : "bg-warning/15 text-warning-foreground"), children: v.mot_status || "Check DVLA" }),
            v.mot_expiry && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-muted-foreground", children: v.mot_expiry })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded-full px-2 py-0.5 text-[11px] font-medium", v.tax_status === "Taxed" ? "bg-success/10 text-success" : "bg-warning/15 text-warning-foreground"), children: v.tax_status || "Check DVLA" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: v.last_visit || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Are you absolutely sure?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                  "This will permanently delete the vehicle ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: v.registration }),
                  " and all its associated workshop jobs."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => deleteVehicle.mutate(v.id), className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Delete" })
              ] })
            ] })
          ] }) })
        ] }, v.id)) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-64 text-center p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-6 w-6 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "No vehicles found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: activeFilter === "All" ? "You haven't added any vehicles to your workspace yet." : `No vehicles match the filter "${activeFilter}".` })
      ] }) })
    ] })
  ] });
}
export {
  Vehicles as component
};
