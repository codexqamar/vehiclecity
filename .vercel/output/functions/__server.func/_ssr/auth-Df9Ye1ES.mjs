import { r as reactExports, W as jsxRuntimeExports } from "./server-B6_Oiuea.mjs";
import { u as useNavigate, L as Link, t as toast, s as supabase } from "./router-DvedLIcD.mjs";
import { L as Logo } from "./Logo-C74eFnKH.mjs";
import { B as Button, c as cn, a as createLucideIcon } from "./button-CBWnG0WW.mjs";
import { I as Input } from "./input-CQWJZSou.mjs";
import { L as Label } from "./label-BG98R_ZY.mjs";
import { L as LoaderCircle } from "./loader-circle-B0RJ0UPi.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
function AuthPage() {
  const [isLogin, setIsLogin] = reactExports.useState(true);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [businessName, setBusinessName] = reactExports.useState("");
  const navigate = useNavigate();
  const handleForgotPassword = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address first");
      return;
    }
    setIsLoading(true);
    try {
      const {
        error
      } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth?reset=true`
      });
      if (error) throw error;
      toast.success("Password reset link sent to your email");
    } catch (error) {
      toast.error(error.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail || !trimmedPassword) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!isLogin && !businessName.trim()) {
      toast.error("Business name is required");
      return;
    }
    setIsLoading(true);
    try {
      if (isLogin) {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password: trimmedPassword
        });
        if (error) {
          console.error("Login error:", error);
          if (error.message === "Invalid login credentials") {
            throw new Error("Incorrect email or password. Please try again.");
          }
          if (error.message.includes("Email not confirmed")) {
            throw new Error("Please confirm your email address before logging in.");
          }
          throw error;
        }
        toast.success("Signed in successfully");
        navigate({
          to: "/app"
        });
      } else {
        if (trimmedPassword.length < 6) {
          throw new Error("Password must be at least 6 characters long");
        }
        const {
          error
        } = await supabase.auth.signUp({
          email: trimmedEmail,
          password: trimmedPassword,
          options: {
            data: {
              business_name: businessName.trim()
            }
          }
        });
        if (error) {
          console.error("Signup error:", error);
          if (error.message.includes("User already registered")) {
            throw new Error("This email is already registered. Please sign in instead.");
          }
          throw error;
        }
        toast.success("Check your email for the confirmation link");
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during authentication");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col items-center justify-center bg-surface/30 px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 flex flex-col items-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center gap-2 hover:opacity-90 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md shadow-elevated border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-semibold tracking-tight text-center", children: isLogin ? "Sign in to your account" : "Create an account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-center", children: isLogin ? "Enter your email below to access your workshop" : "Start your 14-day free trial. No card required." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "grid gap-4", children: [
          !isLogin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "business", children: "Business Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "business", placeholder: "Reliable Motors", value: businessName, onChange: (e) => setBusinessName(e.target.value), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", placeholder: "name@example.com", value: email, onChange: (e) => setEmail(e.target.value), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
              isLogin && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleForgotPassword, className: "text-xs text-accent hover:underline disabled:opacity-50", disabled: isLoading, children: "Forgot password?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "w-full", disabled: isLoading, children: [
            isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
            isLogin ? "Sign in" : "Create account"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-full border-t border-border" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card px-2 text-muted-foreground", children: "Or continue with" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", type: "button", className: "w-full", disabled: isLoading, children: "Single Sign-On (SSO)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-sm text-muted-foreground", children: [
          isLogin ? "Don't have an account?" : "Already have an account?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsLogin(!isLogin), className: "text-accent hover:underline font-medium", children: isLogin ? "Sign up" : "Log in" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
          "By clicking continue, you agree to our",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "underline underline-offset-4 hover:text-foreground", children: "Terms of Service" }),
          " ",
          "and",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "underline underline-offset-4 hover:text-foreground", children: "Privacy Policy" }),
          "."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to homepage"
    ] })
  ] });
}
export {
  AuthPage as component
};
