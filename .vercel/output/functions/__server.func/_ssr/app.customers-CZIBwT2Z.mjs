import { W as jsxRuntimeExports, r as reactExports } from "./server-B6_Oiuea.mjs";
import { u as useQuery, A as AppTopbar } from "./AppTopbar-B2N-utjh.mjs";
import { h as Route$2, b as useQueryClient, t as toast, s as supabase } from "./router-DvedLIcD.mjs";
import { u as useMutation } from "./useMutation-o548g_bv.mjs";
import { B as Button } from "./button-CBWnG0WW.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-CDCitZBe.mjs";
import { I as Input } from "./input-CQWJZSou.mjs";
import { L as Label } from "./label-BG98R_ZY.mjs";
import { P as Plus } from "./plus-D-HN2_wc.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, T as Trash2, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-DqHzQyH2.mjs";
import { L as LoaderCircle } from "./loader-circle-B0RJ0UPi.mjs";
import { U as Users } from "./users-D1_Jut2C.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./ThemeToggle-DL_hqj43.mjs";
import "./search-D_lFFk0a.mjs";
import "./bell-D3M_u7N_.mjs";
import "./index-CPhrW7pK.mjs";
import "./index-4JqtvOL4.mjs";
function AddCustomerModal({ workspaceId }) {
  const [open, setOpen] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [tag, setTag] = reactExports.useState("New");
  const queryClient = useQueryClient();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.from("customers").insert({
        workspace_id: workspaceId,
        name,
        email,
        phone,
        tag
      });
      if (error) throw error;
      toast.success("Customer added successfully");
      setOpen(false);
      setName("");
      setEmail("");
      setPhone("");
      setTag("New");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    } catch (error) {
      toast.error(error.message || "Failed to add customer");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
      " Add customer"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "sm:max-w-[425px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Create a new customer profile for your workspace." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Full Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "John Doe",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "email",
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "john@example.com"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "phone",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              placeholder: "07700 900 000"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tag", children: "Tag" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "tag",
              value: tag,
              onChange: (e) => setTag(e.target.value),
              placeholder: "Regular, Fleet, VIP..."
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: isLoading, children: isLoading ? "Adding..." : "Add customer" }) })
    ] }) })
  ] });
}
function Customers() {
  const {
    session
  } = Route$2.useRouteContext();
  const workspaceId = session.user.id;
  const queryClient = useQueryClient();
  const {
    data: customers,
    isLoading
  } = useQuery({
    queryKey: ["customers", workspaceId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("customers").select("*").eq("workspace_id", workspaceId).order("name");
      if (error) throw error;
      return data;
    }
  });
  const deleteCustomer = useMutation({
    mutationFn: async (customerId) => {
      await supabase.from("jobs").delete().eq("customer_id", customerId);
      await supabase.from("vehicles").delete().eq("customer_id", customerId);
      const {
        error
      } = await supabase.from("customers").delete().eq("id", customerId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Customer and associated data deleted");
      queryClient.invalidateQueries({
        queryKey: ["customers"]
      });
      queryClient.invalidateQueries({
        queryKey: ["vehicles"]
      });
      queryClient.invalidateQueries({
        queryKey: ["jobs"]
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete customer");
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppTopbar, { title: "Customers", subtitle: `${customers?.length || 0} active customers`, actions: /* @__PURE__ */ jsxRuntimeExports.jsx(AddCustomerModal, { workspaceId }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-soft", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }) : customers && customers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-surface/60 text-[11px] uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Lifetime spend" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Tag" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: customers.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border hover:bg-surface/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground uppercase", children: c.name.split(" ").map((w) => w[0]).join("") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: c.name })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: c.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: c.phone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 tabular-nums font-medium", children: "£0.00" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground", children: c.tag || "Regular" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Are you absolutely sure?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                "This will permanently delete ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: c.name }),
                " and all their associated vehicles and workshop jobs."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => deleteCustomer.mutate(c.id), className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Delete" })
            ] })
          ] })
        ] }) })
      ] }, c.id)) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-64 text-center p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-6 w-6 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "No customers found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "You haven't added any customers to your workspace yet." })
    ] }) }) })
  ] });
}
export {
  Customers as component
};
