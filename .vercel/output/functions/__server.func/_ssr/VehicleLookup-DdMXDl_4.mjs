import { r as reactExports, W as jsxRuntimeExports } from "./server-B6_Oiuea.mjs";
import { P as Plate } from "./Plate-DI6wOjYz.mjs";
import { c as cn, a as createLucideIcon } from "./button-CBWnG0WW.mjs";
import { S as Search } from "./search-D_lFFk0a.mjs";
import { L as LoaderCircle } from "./loader-circle-B0RJ0UPi.mjs";
import { S as ShieldCheck } from "./shield-check-B3J_NglM.mjs";
import { C as Calendar } from "./calendar-D69TJAaR.mjs";
const __iconNode$5 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    { d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5", key: "1wtuz0" }
  ],
  ["path", { d: "M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16", key: "e09ifn" }],
  ["path", { d: "M2 21h13", key: "1x0fut" }],
  ["path", { d: "M3 9h11", key: "1p7c0w" }]
];
const Fuel = createLucideIcon("fuel", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
];
const Gauge = createLucideIcon("gauge", __iconNode$3);
const __iconNode$2 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
const Hash = createLucideIcon("hash", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
];
const Palette = createLucideIcon("palette", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const FIXTURES = {
  AB12CDE: {
    make: "FORD",
    model: "Focus ST-Line",
    colour: "Magnetic Grey",
    fuelType: "PETROL",
    engineCapacity: 1499,
    yearOfManufacture: 2019,
    monthOfFirstRegistration: "2019-03",
    taxStatus: "Taxed",
    taxDueDate: "2026-02-28",
    motStatus: "Valid",
    motExpiryDate: "2026-04-12",
    co2Emissions: 122,
    euroStatus: "EURO 6",
    markedForExport: false,
    typeApproval: "M1",
    wheelplan: "2 AXLE RIGID BODY"
  },
  LX21KZV: {
    make: "VOLKSWAGEN",
    model: "Golf GTI",
    colour: "Pure White",
    fuelType: "PETROL",
    engineCapacity: 1984,
    yearOfManufacture: 2021,
    monthOfFirstRegistration: "2021-07",
    taxStatus: "Taxed",
    taxDueDate: "2026-07-31",
    motStatus: "Valid",
    motExpiryDate: "2026-07-15",
    co2Emissions: 168,
    euroStatus: "EURO 6",
    markedForExport: false,
    typeApproval: "M1",
    wheelplan: "2 AXLE RIGID BODY"
  },
  EV70BYD: {
    make: "TESLA",
    model: "Model 3 Long Range",
    colour: "Midnight Silver",
    fuelType: "ELECTRICITY",
    engineCapacity: 0,
    yearOfManufacture: 2020,
    monthOfFirstRegistration: "2020-11",
    taxStatus: "Taxed",
    taxDueDate: "2026-11-30",
    motStatus: "Valid",
    motExpiryDate: "2026-10-22",
    co2Emissions: 0,
    euroStatus: "EURO 6",
    markedForExport: false,
    typeApproval: "M1",
    wheelplan: "2 AXLE RIGID BODY"
  },
  RV68OMG: {
    make: "LAND ROVER",
    model: "Range Rover Sport HSE",
    colour: "Santorini Black",
    fuelType: "DIESEL",
    engineCapacity: 2993,
    yearOfManufacture: 2018,
    monthOfFirstRegistration: "2018-09",
    taxStatus: "SORN",
    taxDueDate: "2025-09-01",
    motStatus: "Not valid",
    motExpiryDate: "2025-10-04",
    co2Emissions: 198,
    euroStatus: "EURO 6",
    markedForExport: false,
    typeApproval: "M1",
    wheelplan: "2 AXLE RIGID BODY"
  }
};
function normalise(reg) {
  return reg.replace(/\s+/g, "").toUpperCase();
}
const UK_PLATE = /^[A-Z]{1,3}[0-9]{1,4}[A-Z]{0,3}$/;
function isValidUkPlate(reg) {
  return UK_PLATE.test(normalise(reg));
}
async function lookupVehicle(reg) {
  const key = normalise(reg);
  if (!isValidUkPlate(key)) {
    throw new Error("Enter a valid UK registration (e.g. AB12 CDE).");
  }
  await new Promise((r) => setTimeout(r, 850 + Math.random() * 600));
  const fixture = FIXTURES[key];
  if (fixture) return { registrationNumber: key, ...fixture };
  const makes = ["BMW", "AUDI", "MERCEDES-BENZ", "TOYOTA", "VAUXHALL", "NISSAN", "KIA"];
  const models = {
    BMW: "3 Series 320d M Sport",
    AUDI: "A4 40 TFSI S line",
    "MERCEDES-BENZ": "C220d AMG Line",
    TOYOTA: "Corolla Hybrid Excel",
    VAUXHALL: "Astra SRi Turbo",
    NISSAN: "Qashqai N-Connecta",
    KIA: "Sportage GT-Line"
  };
  const seed = [...key].reduce((a, c) => a + c.charCodeAt(0), 0);
  const make = makes[seed % makes.length];
  return {
    registrationNumber: key,
    make,
    model: models[make],
    colour: ["Silver", "Black", "Grey", "White", "Blue"][seed % 5],
    fuelType: seed % 4 === 0 ? "DIESEL" : "PETROL",
    engineCapacity: 1598 + seed % 4 * 200,
    yearOfManufacture: 2017 + seed % 8,
    monthOfFirstRegistration: `${2017 + seed % 8}-0${1 + seed % 9}`,
    taxStatus: seed % 7 === 0 ? "Untaxed" : "Taxed",
    taxDueDate: "2026-05-31",
    motStatus: seed % 11 === 0 ? "Not valid" : "Valid",
    motExpiryDate: "2026-03-18",
    co2Emissions: 110 + seed % 80,
    euroStatus: "EURO 6",
    markedForExport: false,
    typeApproval: "M1",
    wheelplan: "2 AXLE RIGID BODY"
  };
}
const SUGGESTIONS = ["AB12 CDE", "LX21 KZV", "EV70 BYD", "RV68 OMG"];
function VehicleLookup({ embedded = false }) {
  const [reg, setReg] = reactExports.useState("");
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  async function run(input) {
    const value = (input ?? reg).trim();
    if (!value) return;
    setLoading(true);
    setError(null);
    try {
      const v = await lookupVehicle(value);
      setData(v);
      setReg(value);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lookup failed");
      setData(null);
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("w-full", embedded && "max-w-none"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          void run();
        },
        className: "group relative flex items-center gap-2 rounded-xl border border-border bg-card p-2 shadow-elevated",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pl-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider", children: "DVLA" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: reg,
              onChange: (e) => setReg(e.target.value.toUpperCase()),
              placeholder: "Enter UK registration  e.g. AB12 CDE",
              className: "plate-font flex-1 bg-transparent px-2 py-2 text-base outline-none placeholder:font-sans placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-muted-foreground",
              maxLength: 8,
              autoCorrect: "off",
              autoCapitalize: "characters",
              spellCheck: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              disabled: loading || !reg,
              className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50",
              children: [
                loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }),
                "Look up"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Try:" }),
      SUGGESTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => void run(s),
          className: "rounded-md border border-border bg-surface px-2 py-1 font-mono tracking-wider hover:border-accent/40 hover:text-foreground transition",
          children: s
        },
        s
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 h-4 w-4 text-destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-destructive", children: "Lookup failed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: error })
        ] })
      ] }),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LookupSkeleton, {}),
      data && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx(VehicleCard, { v: data }),
      !data && !loading && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-dashed border-border bg-surface/40 p-8 text-center text-sm text-muted-foreground", children: "Enter a registration to retrieve DVLA vehicle data." })
    ] })
  ] });
}
function LookupSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 shimmer" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-px bg-border md:grid-cols-4", children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-16 rounded bg-muted shimmer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-4 w-24 rounded bg-muted shimmer" })
    ] }, i)) })
  ] });
}
function VehicleCard({ v }) {
  const taxOk = v.taxStatus === "Taxed";
  const motOk = v.motStatus === "Valid";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-elevated", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface/60 px-5 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plate, { reg: v.registrationNumber }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold tracking-tight", children: [
            titleCase(v.make),
            " ",
            v.model
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "First registered ",
            fmtMonth(v.monthOfFirstRegistration),
            " · ",
            v.yearOfManufacture
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatusPill,
          {
            ok: taxOk,
            okLabel: `Tax · ${v.taxStatus}`,
            badLabel: `Tax · ${v.taxStatus}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatusPill,
          {
            ok: motOk,
            okLabel: `MOT · ${v.motStatus}`,
            badLabel: `MOT · ${v.motStatus}`
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-px bg-border md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: Fuel, label: "Fuel", value: titleCase(v.fuelType) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Field,
        {
          icon: Gauge,
          label: "Engine",
          value: v.engineCapacity ? `${v.engineCapacity} cc` : "—"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: Palette, label: "Colour", value: v.colour }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: Hash, label: "CO₂", value: `${v.co2Emissions} g/km` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: ShieldCheck, label: "Euro status", value: v.euroStatus }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: Calendar, label: "MOT expires", value: fmtDate(v.motExpiryDate) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: Calendar, label: "Tax due", value: fmtDate(v.taxDueDate) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: Hash, label: "Type approval", value: v.typeApproval })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-t border-border bg-surface/40 px-5 py-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Source: DVLA Vehicle Enquiry Service · cached for 24h" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: v.wheelplan })
    ] })
  ] });
}
function Field({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
      " ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm font-medium", children: value })
  ] });
}
function StatusPill({ ok, okLabel, badLabel }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        ok ? "border-success/30 bg-success/10 text-success" : "border-destructive/30 bg-destructive/10 text-destructive"
      ),
      children: [
        ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5" }),
        ok ? okLabel : badLabel
      ]
    }
  );
}
function titleCase(s) {
  return s.toLowerCase().replace(/(^|[\s-])\w/g, (m) => m.toUpperCase());
}
function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtMonth(ym) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}
export {
  VehicleLookup as V
};
