import ArcHero from "@/components/arc/ArcHero";
import ArcProblem from "@/components/arc/ArcProblem";
import ArcHowItWorks from "@/components/arc/ArcHowItWorks";
import ArcShadowMode from "@/components/arc/ArcShadowMode";
import ArcAutoTune from "@/components/arc/ArcAutoTune";
import ArcAskData from "@/components/arc/ArcAskData";
import ArcBenchmarks from "@/components/arc/ArcBenchmarks";
import ArcReliability from "@/components/arc/ArcReliability";
import ArcPricing from "@/components/arc/ArcPricing";
import ArcFooterCTA from "@/components/arc/ArcFooterCTA";

export const metadata = {
  title: "Arc — Your AI Stack, Optimized | Cornerstone",
  description:
    "Arc sits between your app and your AI providers. It watches every request, runs silent experiments, and tells you exactly what to change.",
  keywords: [
    "Arc",
    "AI operations",
    "AI observability",
    "model comparison",
    "shadow testing",
    "AI routing",
    "LLM monitoring",
    "Cornerstone",
  ],
};

export default function ArcPage() {
  return (
    <main className="-mt-[72px]">
      <ArcHero />
      <ArcProblem />
      <ArcHowItWorks />
      <ArcShadowMode />
      <ArcAutoTune />
      <ArcAskData />
      <ArcBenchmarks />
      <ArcReliability />
      <ArcPricing />
      <ArcFooterCTA />
    </main>
  );
}
