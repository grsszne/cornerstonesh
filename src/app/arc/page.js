import ArcHero from "@/components/arc/ArcHero";
import ArcFeaturesList from "@/components/arc/ArcFeaturesList";
import ArcPricing from "@/components/arc/ArcPricing";
import ArcCTA from "@/components/arc/ArcCTA";

export const metadata = {
  title: "Arc — One Place to Operate AI in Production | Cornerstone",
  description: "Model routing, logs, safer rollouts, memory, and workflow controls — without building your own AI infrastructure layer.",
};

export default function ArcPage() {
  return (
    <main className="bg-[var(--arc-surface-page)] text-[var(--arc-text-primary)] selection:bg-[var(--arc-text-primary)] selection:text-[var(--arc-surface-page)] font-sans antialiased">
      <ArcHero />
      <ArcFeaturesList />
      <ArcPricing />
      <ArcCTA />
    </main>
  );
}
