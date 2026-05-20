import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { VehicleLookup } from "@/components/site/VehicleLookup";

export const Route = createFileRoute("/dvla")({
  head: () => ({
    meta: [
      { title: "DVLA Vehicle Lookup · GarageFlow UK" },
      { name: "description", content: "Free UK DVLA vehicle lookup. Enter a registration to see tax, MOT, fuel, engine and CO₂ data instantly." },
      { property: "og:title", content: "Free DVLA Vehicle Lookup — GarageFlow UK" },
      { property: "og:url", content: "/dvla" },
    ],
    links: [{ rel: "canonical", href: "/dvla" }],
  }),
  component: DvlaPage,
});

function DvlaPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">DVLA Vehicle Enquiry Service</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Free UK vehicle lookup
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Enter any UK registration to see tax status, MOT status, fuel, engine and CO₂ data — pulled live from the official DVLA API.
          </p>
        </div>
        <div className="mt-10">
          <VehicleLookup />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
