import { W as jsxRuntimeExports } from "./server-B6_Oiuea.mjs";
import { c as cn } from "./button-CBWnG0WW.mjs";
function Logo({
  className,
  variant = "default"
}) {
  const fg = variant === "light" ? "text-sidebar-foreground" : "text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-2", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-8 w-8 items-center justify-center shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/Light.png",
          alt: "VehicleCity Logo",
          className: cn(
            "h-full w-full object-contain transition-opacity duration-300",
            variant === "light" ? "hidden" : "dark:hidden"
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/Dark.png",
          alt: "VehicleCity Logo",
          className: cn(
            "h-full w-full object-contain transition-opacity duration-300",
            variant === "light" ? "block" : "hidden dark:block"
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("font-semibold tracking-tight", fg), children: [
      "VehicleCity",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: " UK" })
    ] })
  ] });
}
export {
  Logo as L
};
