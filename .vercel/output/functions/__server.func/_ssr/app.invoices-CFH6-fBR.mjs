import { W as jsxRuntimeExports, r as reactExports } from "./server-B6_Oiuea.mjs";
import { u as useQuery, A as AppTopbar } from "./AppTopbar-B2N-utjh.mjs";
import { P as Plate } from "./Plate-DI6wOjYz.mjs";
import { c as cn, B as Button, a as createLucideIcon } from "./button-CBWnG0WW.mjs";
import { f as Route$4, t as toast, b as useQueryClient, s as supabase } from "./router-DvedLIcD.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-CDCitZBe.mjs";
import { I as Input } from "./input-CQWJZSou.mjs";
import { L as Label } from "./label-BG98R_ZY.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BOMdvC5a.mjs";
import { P as Popover, a as PopoverTrigger, f as format, b as PopoverContent, C as Calendar$1 } from "./popover-DTBEW-e7.mjs";
import { P as Plus } from "./plus-D-HN2_wc.mjs";
import { C as Calendar } from "./calendar-D69TJAaR.mjs";
import { L as LoaderCircle } from "./loader-circle-B0RJ0UPi.mjs";
import { D as Download } from "./download-CsWpImE1.mjs";
import { R as Receipt } from "./receipt-CNO6oohU.mjs";
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
import "./chevron-right-Bp1KjpvA.mjs";
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function AddInvoiceModal({ workspaceId }) {
  const [open, setOpen] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [customerId, setCustomerId] = reactExports.useState("");
  const [vehicleId, setVehicleId] = reactExports.useState("none");
  const [invoiceNumber, setInvoiceNumber] = reactExports.useState("");
  const [amount, setAmount] = reactExports.useState("");
  const [dueDate, setDueDate] = reactExports.useState(/* @__PURE__ */ new Date());
  const [customers, setCustomers] = reactExports.useState([]);
  const [vehicles, setVehicles] = reactExports.useState([]);
  const queryClient = useQueryClient();
  reactExports.useEffect(() => {
    if (open) {
      const fetchData = async () => {
        const [custRes, vehRes] = await Promise.all([
          supabase.from("customers").select("id, name").eq("workspace_id", workspaceId).order("name"),
          supabase.from("vehicles").select("id, registration, make_model, customer_id").eq("workspace_id", workspaceId).order("registration")
        ]);
        if (custRes.data) setCustomers(custRes.data);
        if (vehRes.data) setVehicles(vehRes.data);
        if (!invoiceNumber) {
          const rand = Math.floor(1e3 + Math.random() * 9e3);
          setInvoiceNumber(`INV-${rand}`);
        }
      };
      fetchData();
    }
  }, [open, workspaceId]);
  const filteredVehicles = customerId ? vehicles.filter((v) => v.customer_id === customerId) : vehicles;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dueDate) {
      toast.error("Please select a due date");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.from("invoices").insert({
        workspace_id: workspaceId,
        customer_id: customerId || null,
        vehicle_id: vehicleId === "none" ? null : vehicleId,
        invoice_number: invoiceNumber,
        amount: parseFloat(amount),
        status: "sent",
        due_date: format(dueDate, "yyyy-MM-dd")
      });
      if (error) throw error;
      toast.success("Invoice created successfully");
      setOpen(false);
      setCustomerId("");
      setVehicleId("none");
      setAmount("");
      setInvoiceNumber("");
      setDueDate(/* @__PURE__ */ new Date());
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    } catch (error) {
      toast.error(error.message || "Failed to create invoice");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
      " New invoice"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "sm:max-w-[425px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "New Invoice" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Create a new invoice for a customer." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "invoiceNumber", children: "Invoice Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "invoiceNumber",
              value: invoiceNumber,
              onChange: (e) => setInvoiceNumber(e.target.value),
              placeholder: "INV-1234",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "customer", children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: customerId, onValueChange: setCustomerId, required: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a customer" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              customers.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id)),
              customers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", disabled: true, children: "No customers found." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "vehicle", children: "Vehicle (Optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: vehicleId, onValueChange: setVehicleId, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a vehicle" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "None" }),
              filteredVehicles.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: v.id, children: [
                v.registration,
                " ",
                v.make_model ? `(${v.make_model})` : ""
              ] }, v.id))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "amount", children: "Amount (£)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "amount",
              type: "number",
              step: "0.01",
              value: amount,
              onChange: (e) => setAmount(e.target.value),
              placeholder: "0.00",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Due Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: cn(
                  "w-full justify-start text-left font-normal",
                  !dueDate && "text-muted-foreground"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mr-2 h-4 w-4" }),
                  dueDate ? format(dueDate, "PPP") : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pick a date" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Calendar$1,
              {
                mode: "single",
                selected: dueDate,
                onSelect: setDueDate,
                initialFocus: true
              }
            ) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: isLoading || !customerId || !amount, children: isLoading ? "Creating..." : "Create invoice" }) })
    ] }) })
  ] });
}
const TONES = {
  paid: "bg-success/10 text-success",
  sent: "bg-accent/10 text-accent",
  overdue: "bg-destructive/10 text-destructive",
  draft: "bg-muted text-muted-foreground"
};
function Invoices() {
  const {
    session
  } = Route$4.useRouteContext();
  const workspaceId = session.user.id;
  const {
    data: invoices,
    isLoading
  } = useQuery({
    queryKey: ["invoices", workspaceId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("invoices").select(`
          *,
          customer:customers(name),
          vehicle:vehicles(registration)
        `).eq("workspace_id", workspaceId).order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  const stats = {
    outstanding: invoices?.filter((i) => i.status !== "paid").reduce((acc, i) => acc + i.amount, 0) || 0,
    overdue: invoices?.filter((i) => i.status === "overdue").reduce((acc, i) => acc + i.amount, 0) || 0,
    paid30d: invoices?.filter((i) => i.status === "paid").reduce((acc, i) => acc + i.amount, 0) || 0
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppTopbar, { title: "Invoices", subtitle: "VAT-compliant invoicing · Stripe connected", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(AddInvoiceModal, { workspaceId }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-4", children: [["Outstanding", `£${stats.outstanding.toFixed(2)}`], ["Overdue", `£${stats.overdue.toFixed(2)}`], ["Paid (Total)", `£${stats.paid30d.toFixed(2)}`], ["VAT collected", `£${(stats.paid30d * 0.2).toFixed(2)}`]].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: k }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xl font-semibold tabular-nums", children: v })
      ] }, k)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-soft", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }) : invoices && invoices.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-surface/60 text-[11px] uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Invoice" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Vehicle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right font-medium", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: invoices.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border hover:bg-surface/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs", children: i.invoice_number }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: i.customer?.name || "Unknown" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plate, { reg: i.vehicle?.registration || "???", className: "text-xs" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: new Date(i.created_at).toLocaleDateString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-medium tabular-nums", children: [
            "£",
            i.amount.toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded-full px-2 py-0.5 text-[11px] font-medium uppercase", TONES[i.status]), children: i.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toast.success(`Invoice ${i.invoice_number} sent`), className: "rounded-md border border-border bg-surface p-1.5 hover:bg-card transition", "aria-label": "Send", title: "Send invoice", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toast.success(`Downloading ${i.invoice_number}...`), className: "rounded-md border border-border bg-surface p-1.5 hover:bg-card transition", "aria-label": "Download", title: "Download PDF", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }) })
          ] }) })
        ] }, i.id)) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-64 text-center p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-6 w-6 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "No invoices found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "Invoices generated for workshop jobs will appear here." })
      ] }) })
    ] })
  ] });
}
export {
  Invoices as component
};
