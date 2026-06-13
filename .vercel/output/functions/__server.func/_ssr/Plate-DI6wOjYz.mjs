import { W as jsxRuntimeExports } from "./server-B6_Oiuea.mjs";
import { c as cn } from "./button-CBWnG0WW.mjs";
function Plate({
  reg,
  variant = "front",
  className
}) {
  const bg = variant === "front" ? "bg-[#f5f5f0]" : "bg-[#f4d03f]";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-stretch overflow-hidden rounded-[6px] border border-black/15 shadow-soft select-none",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex w-5 flex-col items-center justify-center bg-[#0a3d91] text-[8px] font-bold text-yellow-300 leading-none px-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "UK" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("plate-font text-black px-2.5 py-1 text-base", bg), children: reg })
      ]
    }
  );
}
export {
  Plate as P
};
