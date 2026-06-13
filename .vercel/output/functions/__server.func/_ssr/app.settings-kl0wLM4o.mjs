import { r as reactExports, W as jsxRuntimeExports } from "./server-B6_Oiuea.mjs";
import { d as Route$6, u as useNavigate, b as useQueryClient, t as toast, s as supabase } from "./router-DvedLIcD.mjs";
import { u as useQuery, A as AppTopbar } from "./AppTopbar-B2N-utjh.mjs";
import { u as useMutation } from "./useMutation-o548g_bv.mjs";
import { B as Button, c as cn, a as createLucideIcon, u as useComposedRefs } from "./button-CBWnG0WW.mjs";
import { I as Input } from "./input-CQWJZSou.mjs";
import { u as useControllableState, P as Primitive, c as composeEventHandlers, b as createContextScope } from "./index-4JqtvOL4.mjs";
import { u as usePrevious, a as useSize } from "./index-CuM6yV67.mjs";
import { L as LoaderCircle } from "./loader-circle-B0RJ0UPi.mjs";
import { B as Bell } from "./bell-D3M_u7N_.mjs";
import { L as LogOut } from "./log-out-CRr-r-B_.mjs";
import { S as ShieldCheck } from "./shield-check-B3J_NglM.mjs";
import { P as Plus } from "./plus-D-HN2_wc.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./ThemeToggle-DL_hqj43.mjs";
import "./search-D_lFFk0a.mjs";
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
];
const Link2 = createLucideIcon("link-2", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Root.displayName;
function SettingsPage() {
  const {
    session
  } = Route$6.useRouteContext();
  const workspaceId = session.user.id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [businessName, setBusinessName] = reactExports.useState("");
  const [branch, setBranch] = reactExports.useState("");
  const [vatNumber, setVatNumber] = reactExports.useState("");
  const [dvlaApiKey, setDvlaApiKey] = reactExports.useState("");
  const [stripeConnected, setStripeConnected] = reactExports.useState(false);
  const [xeroConnected, setXeroConnected] = reactExports.useState(false);
  const [twilioSid, setTwilioSid] = reactExports.useState("");
  const [twilioToken, setTwilioToken] = reactExports.useState("");
  const [twilioNumber, setTwilioNumber] = reactExports.useState("");
  const [twilioEnabled, setTwilioEnabled] = reactExports.useState(false);
  const {
    data: profile,
    isLoading
  } = useQuery({
    queryKey: ["profile", workspaceId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("profiles").select("*").eq("id", workspaceId).single();
      if (error) throw error;
      return data;
    }
  });
  reactExports.useEffect(() => {
    if (profile) {
      const p = profile;
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
    mutationFn: async (updates) => {
      const {
        error
      } = await supabase.from("profiles").update(updates).eq("id", workspaceId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Settings updated");
      queryClient.invalidateQueries({
        queryKey: ["profile", workspaceId]
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update settings");
    }
  });
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate({
      to: "/auth"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppTopbar, { title: "Settings", subtitle: "Manage your workspace integrations and preferences" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 p-5 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Workspace", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }), children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Business Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: businessName, onChange: (e) => setBusinessName(e.target.value), placeholder: "Reliable Motors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "outline", onClick: () => updateProfile.mutate({
              business_name: businessName
            }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Branch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: branch, onChange: (e) => setBranch(e.target.value), placeholder: "Manchester · Trafford Park" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "outline", onClick: () => updateProfile.mutate({
              branch
            }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "VAT Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vatNumber, onChange: (e) => setVatNumber(e.target.value), placeholder: "GB 421 8830 12" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "outline", onClick: () => updateProfile.mutate({
              vat_number: vatNumber
            }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Integrations", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "h-4 w-4" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Stripe Payments" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Accept card payments on invoices" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-full", stripeConnected ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"), children: stripeConnected ? "Connected" : "Disconnected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: stripeConnected, onCheckedChange: (val) => {
              setStripeConnected(val);
              updateProfile.mutate({
                stripe_connected: val
              });
            } })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Xero Accounting" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Sync invoices and customers" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-full", xeroConnected ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"), children: xeroConnected ? "Connected" : "Disconnected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: xeroConnected, onCheckedChange: (val) => {
              setXeroConnected(val);
              updateProfile.mutate({
                xero_connected: val
              });
            } })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4 bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: "Twilio SMS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: twilioEnabled, onCheckedChange: (val) => {
              setTwilioEnabled(val);
              updateProfile.mutate({
                twilio_enabled: val
              });
            } })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground uppercase", children: "Account SID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { size: "sm", className: "h-8 text-xs", value: twilioSid, onChange: (e) => setTwilioSid(e.target.value), placeholder: "AC..." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground uppercase", children: "Auth Token" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { size: "sm", type: "password", className: "h-8 text-xs", value: twilioToken, onChange: (e) => setTwilioToken(e.target.value), placeholder: "••••••••" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground uppercase", children: "Sender Number/ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { size: "sm", className: "h-8 text-xs", value: twilioNumber, onChange: (e) => setTwilioNumber(e.target.value), placeholder: "+44..." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "h-8 px-2", variant: "secondary", onClick: () => updateProfile.mutate({
                  twilio_sid: twilioSid,
                  twilio_token: twilioToken,
                  twilio_number: twilioNumber
                }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3 w-3" }) })
              ] })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "DVLA API", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "h-4 w-4" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "API Key" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: dvlaApiKey, onChange: (e) => setDvlaApiKey(e.target.value), placeholder: "dvla_••••••••••••" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "outline", onClick: () => updateProfile.mutate({
              dvla_api_key: dvlaApiKey
            }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Daily quota", value: "2,500 lookups" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Rotation", value: "Every 90 days" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Notifications", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "MOT reminders", value: "30 / 14 / 3 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "SMS quiet hours", value: "20:00 – 08:00" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Daily digest" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Security & Session", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Two-factor auth" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase bg-warning/10 text-warning px-2 py-0.5 rounded-full", children: "Recommended" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Data region", value: "UK South" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleLogout, className: "flex w-full items-center justify-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/20 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          "Sign out of VehicleCity"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Team & roles", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: session.user.email || "User", status: "Owner", tone: "accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "w-full gap-2", onClick: () => toast.success("Invitation link copied to clipboard"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
          " Invite team member"
        ] }) })
      ] }) })
    ] })
  ] });
}
function Card({
  title,
  children,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card shadow-soft overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border px-5 py-3 text-sm font-semibold tracking-tight flex items-center gap-2 bg-muted/20", children: [
      icon,
      title
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children })
  ] });
}
function Field({
  label,
  value,
  mono
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 px-5 py-3 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: mono ? "font-mono text-xs" : "font-medium", children: value })
  ] });
}
function Row({
  label,
  status,
  tone
}) {
  const toneCls = tone === "success" ? "bg-success/10 text-success" : tone === "accent" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium truncate", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full px-2 py-0.5 text-[11px] font-medium shrink-0 " + toneCls, children: status })
  ] });
}
export {
  SettingsPage as component
};
