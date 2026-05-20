import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [{ title: "FAQ · VehicleCity UK" }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const faqs = [
    {
      q: "Is VehicleCity connected to the real DVLA API?",
      a: "Yes. Lookups hit the official DVLA Vehicle Enquiry Service. Responses are cached for 24 hours per registration to stay inside fair-use limits.",
    },
    {
      q: "Do you handle MOT history from DVSA?",
      a: "MOT history via the DVSA API is rolling out to Professional plans this quarter. You can opt in from settings when it lands.",
    },
    {
      q: "Where is my data hosted?",
      a: "All customer data is hosted in UK regions on tier-1 infrastructure. We're SOC 2 aligned and progressing through ISO 27001.",
    },
    {
      q: "Can I import from my current system?",
      a: "We provide free white-glove migration from Garage Hive, GA4, Autowork and CSV exports during your trial.",
    },
    {
      q: "Do you support VAT invoicing?",
      a: "Yes — UK VAT-compliant invoices with parts, labour, discounts and Stripe payment links out of the box.",
    },
    {
      q: "How many users can I have?",
      a: "Starter plans include up to 3 users. Professional plans include up to 15 users. Enterprise plans offer unlimited user seats.",
    },
    {
      q: "Is there a long-term contract?",
      a: "No. All our plans are month-to-month, and you can cancel at any time without penalty.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Support</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Everything you need to know about VehicleCity and how it works.
          </p>
        </div>

        <div className="mt-16 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6 open:bg-surface/40 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium">
                {f.q}
                <span className="text-muted-foreground transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-xl font-semibold">Still have questions?</h2>
          <p className="mt-2 text-muted-foreground">
            Can't find the answer you're looking for? Please chat to our friendly team.
          </p>
          <a
            href="mailto:hello@vehiclecity.co.uk"
            className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
          >
            Email Support
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
