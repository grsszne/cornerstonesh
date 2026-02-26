import CortexHero from "@/components/cortex/CortexHero";
import CortexSetup from "@/components/cortex/CortexSetup";
import CortexDayOne from "@/components/cortex/CortexDayOne";
import CortexDayThree from "@/components/cortex/CortexDayThree";
import CortexDaySeven from "@/components/cortex/CortexDaySeven";
import CortexTimeline from "@/components/cortex/CortexTimeline";
import CortexAgent from "@/components/cortex/CortexAgent";
import CortexAutonomy from "@/components/cortex/CortexAutonomy";
import CortexCatches from "@/components/cortex/CortexCatches";
import CortexSecurity from "@/components/cortex/CortexSecurity";
import CortexPricing from "@/components/cortex/CortexPricing";
import CortexBigPicture from "@/components/cortex/CortexBigPicture";
import CortexFinalCTA from "@/components/cortex/CortexFinalCTA";

export const metadata = {
  title: "Cortex — Managed AI Operations | Cornerstone",
  description:
    "One line of code. Cortex watches your AI traffic, learns your workload, and optimizes cost, latency, and quality automatically. Start free.",
  keywords: [
    "Cortex",
    "AI operations",
    "AI optimization",
    "LLM routing",
    "AI cost reduction",
    "model routing",
    "AI observability",
    "Cornerstone",
    "managed AI",
    "AI proxy",
  ],
};

export default function CortexPage() {
  return (
    <main className="-mt-[72px]">
      <CortexHero />
      <CortexSetup />
      <CortexDayOne />
      <CortexDayThree />
      <CortexDaySeven />
      <CortexTimeline />
      <CortexAgent />
      <CortexAutonomy />
      <CortexCatches />
      <CortexSecurity />
      <CortexPricing />
      <CortexBigPicture />
      <CortexFinalCTA />
    </main>
  );
}
