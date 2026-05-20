import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VehicleCity UK" },
      {
        name: "description",
        content: "VehicleCity UK is the modern garage management software built to excel",
      },
      { name: "author", content: "VehicleCity UK" },
      { property: "og:title", content: "VehicleCity UK" },
      {
        property: "og:description",
        content: "VehicleCity UK is the modern garage management software built to excel",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },

      { name: "twitter:title", content: "VehicleCity UK" },
      {
        name: "twitter:description",
        content: "VehicleCity UK is the modern garage management software built to excel",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6ad23261-d61b-4ed0-9db6-9163b538b9c1/id-preview-a829ae20--2f979767-df53-49cb-a5f1-6b418f057253.lovable.app-1779237227629.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6ad23261-d61b-4ed0-9db6-9163b538b9c1/id-preview-a829ae20--2f979767-df53-49cb-a5f1-6b418f057253.lovable.app-1779237227629.png",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/logo-white.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        rel: "icon",
        href: "/logo-white.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        href: "/logo-white.png",
        type: "image/png",
        sizes: "48x48",
      },
      {
        rel: "icon",
        href: "/logo-white.png",
        type: "image/png",
        sizes: "64x64",
      },
      {
        rel: "icon",
        href: "/logo-white.png",
        type: "image/png",
        sizes: "128x128",
      },
      {
        rel: "icon",
        href: "/logo-white.png",
        type: "image/png",
        sizes: "256x256",
      },
      {
        rel: "apple-touch-icon",
        href: "/logo-white.png",
        sizes: "180x180",
      },
      {
        rel: "shortcut icon",
        href: "/logo-white.png",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
