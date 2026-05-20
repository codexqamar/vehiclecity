import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [{ title: "Sign in · VehicleCity UK" }, { name: "robots", content: "noindex" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth and redirect
    setTimeout(() => {
      window.location.href = "/app";
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface/30 px-4 py-12">
      <div className="mb-8 flex flex-col items-center gap-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition">
          <Logo />
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-elevated border-border">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold tracking-tight text-center">
            {isLogin ? "Sign in to your account" : "Create an account"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin
              ? "Enter your email below to access your workshop"
              : "Start your 14-day free trial. No card required."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit} className="grid gap-4">
            {!isLogin && (
              <div className="grid gap-2">
                <Label htmlFor="business">Business Name</Label>
                <Input id="business" placeholder="Reliable Motors" required />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="name@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <button type="button" className="text-xs text-accent hover:underline">
                    Forgot password?
                  </button>
                )}
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLogin ? "Sign in" : "Create account"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" type="button" className="w-full" disabled={isLoading}>
            Single Sign-On (SSO)
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent hover:underline font-medium"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-foreground">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-foreground">
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft className="h-4 w-4" /> Back to homepage
      </Link>
    </div>
  );
}
