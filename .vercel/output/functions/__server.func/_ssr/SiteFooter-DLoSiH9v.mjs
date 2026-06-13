import { W as jsxRuntimeExports } from "./server-B6_Oiuea.mjs";
import { L as Link } from "./router-DvedLIcD.mjs";
import { L as Logo } from "./Logo-C74eFnKH.mjs";
import { T as ThemeToggle } from "./ThemeToggle-DL_hqj43.mjs";
function SiteHeader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-6 text-sm text-muted-foreground md:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/features", className: "hover:text-foreground transition", children: "Features" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", className: "hover:text-foreground transition", children: "Pricing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customers", className: "hover:text-foreground transition", children: "Customers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dvla", className: "hover:text-foreground transition", children: "DVLA Lookup" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/faq", className: "hover:text-foreground transition", children: "FAQ" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/auth",
            className: "hidden text-sm text-muted-foreground hover:text-foreground sm:inline",
            children: "Sign in"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/auth",
            className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground shadow-soft hover:bg-primary/90 transition",
            children: [
              "Open app",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "→" })
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-border bg-surface/60", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xs text-sm text-muted-foreground", children: "The operating system for British workshops. Built in the UK, designed around how garages really work." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-success" }),
            " All systems operational"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ISO 27001 in progress" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Col,
        {
          title: "Product",
          links: [
            ["DVLA Lookup", "/dvla"],
            ["Features", "/features"],
            ["Pricing", "/pricing"],
            ["FAQ", "/faq"]
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Col,
        {
          title: "Company",
          links: [
            ["Customers", "/customers"],
            ["Careers", "/careers"],
            ["Contact", "/contact"]
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Col,
        {
          title: "Legal",
          links: [
            ["Privacy", "/privacy"],
            ["Terms", "/terms"],
            ["DPA", "/dpa"],
            ["Security", "/security"]
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " VehicleCity UK Ltd. Registered in England & Wales. Company no. 14820917."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Made in Manchester · VAT GB 421 8830 12" })
    ] }) })
  ] });
}
function Col({ title, links }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wider text-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2.5 text-sm text-muted-foreground", children: links.map(([label, href]) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: href.startsWith("/") ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, className: "hover:text-foreground transition", children: label }) : /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, className: "hover:text-foreground transition", children: label }) }, label)) })
  ] });
}
export {
  SiteHeader as S,
  SiteFooter as a
};
