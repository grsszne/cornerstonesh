import ArcHero from "@/components/arc/ArcHero";
import ArcProblemSolution from "@/components/arc/ArcProblemSolution";
import ArcBentoGrid from "@/components/arc/ArcBentoGrid";
import ArcStartupEconomics from "@/components/arc/ArcStartupEconomics";
import ArcCorePrimitives from "@/components/arc/ArcCorePrimitives";
import ArcDeepDive from "@/components/arc/ArcDeepDive";
import ArcPricing from "@/components/arc/ArcPricing";
import ArcCTA from "@/components/arc/ArcCTA";

export const metadata = {
  title: "Arc — Single Proxy for AI | Cornerstone",
  description: "Stop managing AI providers. Simply point to Arc.",
};

export default function ArcPage() {
  return (
    <main className="bg-[var(--arc-surface-page)] text-[var(--arc-text-primary)] selection:bg-[var(--arc-text-primary)] selection:text-[var(--arc-surface-page)] font-sans antialiased">
      <ArcHero />
      <ArcProblemSolution />
      <ArcBentoGrid />
      <ArcStartupEconomics />
      <ArcCorePrimitives />
      <ArcDeepDive />
      <ArcPricing />
      <ArcCTA />
    </main>
  );
}
