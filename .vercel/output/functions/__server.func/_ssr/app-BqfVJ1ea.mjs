import { W as jsxRuntimeExports, a1 as Outlet, r as reactExports, O as useRouter } from "./server-B6_Oiuea.mjs";
import { u as useNavigate, t as toast, L as Link, s as supabase } from "./router-DvedLIcD.mjs";
import { L as Logo } from "./Logo-C74eFnKH.mjs";
import { c as cn, B as Button, a as createLucideIcon, b as cva } from "./button-CBWnG0WW.mjs";
import { S as Search } from "./search-D_lFFk0a.mjs";
import { C as Car } from "./car-Bs7snJGz.mjs";
import { U as Users } from "./users-D1_Jut2C.mjs";
import { C as ClipboardList, a as ChartColumn } from "./clipboard-list-BV41Lbqk.mjs";
import { C as Calendar } from "./calendar-D69TJAaR.mjs";
import { R as Receipt } from "./receipt-CNO6oohU.mjs";
import { T as Truck } from "./truck-B0pOtq9F.mjs";
import { L as LogOut } from "./log-out-CRr-r-B_.mjs";
import { R as Root, T as Trigger, P as Portal, C as Content, a as Close, X, O as Overlay, b as Title, D as Description } from "./index-CPhrW7pK.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-4JqtvOL4.mjs";
function useRouterState(opts) {
  const contextRouter = useRouter({ warn: opts?.router === void 0 });
  const router = opts?.router || contextRouter;
  {
    const state = router.stores.__store.get();
    return opts?.select ? opts.select(state) : state;
  }
}
const __iconNode$3 = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
];
const ChevronsUpDown = createLucideIcon("chevrons-up-down", __iconNode$3);
const __iconNode$2 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode);
const NAV$1 = [
  {
    group: "Workspace",
    items: [
      { to: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
      { to: "/app/lookup", label: "DVLA Lookup", icon: Search, kbd: "L" },
      { to: "/app/vehicles", label: "Vehicles", icon: Car },
      { to: "/app/customers", label: "Customers", icon: Users }
    ]
  },
  {
    group: "Operations",
    items: [
      { to: "/app/workshop", label: "Workshop", icon: ClipboardList },
      { to: "/app/calendar", label: "Calendar", icon: Calendar },
      { to: "/app/invoices", label: "Invoices", icon: Receipt },
      { to: "/app/fleet", label: "Fleet", icon: Truck }
    ]
  },
  {
    group: "Insights",
    items: [
      { to: "/app/analytics", label: "Analytics", icon: ChartColumn },
      { to: "/app/settings", label: "Settings", icon: Settings }
    ]
  }
];
function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [user, setUser] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const getUser = async () => {
      const { data: { user: user2 } } = await supabase.auth.getUser();
      setUser(user2);
    };
    getUser();
  }, []);
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out successfully");
      navigate({ to: "/auth" });
    } catch (error) {
      toast.error(error.message || "Error signing out");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => toast.info("Workspace switching coming soon"),
        className: "flex items-center gap-2 border-b border-sidebar-border px-3 py-3 text-left hover:bg-sidebar-accent/60 transition",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { variant: "light" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, { className: "ml-auto h-3.5 w-3.5 text-sidebar-foreground/60" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => toast.info("Press ⌘K to open search"),
        className: "flex w-full items-center gap-2 rounded-md bg-sidebar-accent px-2.5 py-1.5 text-[13px] text-sidebar-foreground/80 hover:bg-sidebar-accent/80 transition",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Search or jump to…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "ml-auto rounded border border-sidebar-border px-1.5 py-0.5 text-[10px] font-mono text-sidebar-foreground/60", children: "⌘K" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 overflow-y-auto px-2 pb-4", children: NAV$1.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40", children: g.group }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-0.5", children: g.items.map((it) => {
        const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: it.to,
            className: cn(
              "group flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] transition",
              active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-4 w-4 opacity-80" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: it.label }),
              it.kbd && /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "ml-auto rounded border border-sidebar-border px-1.5 py-0.5 text-[10px] font-mono text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70", children: it.kbd })
            ]
          }
        ) }, it.to);
      }) })
    ] }, g.group)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-sidebar-border p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-foreground uppercase", children: user?.email?.[0] || "U" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 text-[13px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-medium text-sidebar-foreground", children: user?.user_metadata?.business_name || "Workspace User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[11px] text-sidebar-foreground/60", children: user?.email || "user@example.com" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleSignOut,
          className: "ml-auto rounded-md p-1.5 text-sidebar-foreground/60 hover:bg-destructive/10 hover:text-destructive transition-colors",
          "aria-label": "Sign out",
          title: "Sign out",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" })
        }
      )
    ] }) })
  ] });
}
const Sheet = Root;
const SheetTrigger = Trigger;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
const NAV = [
  { to: "/app", label: "Overview", icon: LayoutDashboard },
  { to: "/app/lookup", label: "DVLA Lookup", icon: Search },
  { to: "/app/vehicles", label: "Vehicles", icon: Car },
  { to: "/app/customers", label: "Customers", icon: Users },
  { to: "/app/workshop", label: "Workshop", icon: ClipboardList },
  { to: "/app/calendar", label: "Calendar", icon: Calendar },
  { to: "/app/invoices", label: "Invoices", icon: Receipt },
  { to: "/app/fleet", label: "Fleet", icon: Truck },
  { to: "/app/analytics", label: "Analytics", icon: ChartColumn },
  { to: "/app/settings", label: "Settings", icon: Settings }
];
function MobileNav() {
  const [open, setOpen] = reactExports.useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "icon", className: "md:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Toggle menu" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { side: "left", className: "w-72 p-0 bg-sidebar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { variant: "light" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 overflow-y-auto p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: NAV.map((it) => {
        const active = it.to === "/app" ? pathname === it.to : pathname.startsWith(it.to);
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: it.to,
            onClick: () => setOpen(false),
            className: cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
              active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-4 w-4" }),
              it.label
            ]
          }
        ) }, it.to);
      }) }) })
    ] }) })
  ] });
}
function AppLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen w-full bg-background text-foreground overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppSidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex h-14 items-center border-b border-border bg-background px-4 md:hidden shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-4 font-semibold text-sm tracking-tight", children: "VehicleCity UK" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto min-h-0 bg-surface/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
export {
  AppLayout as component
};
