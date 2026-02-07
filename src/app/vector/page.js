import VectorHero from "@/components/vector/VectorHero";
import VectorStack from "@/components/vector/VectorStack";
import VectorProduct from "@/components/vector/VectorProduct";
import VectorProblem from "@/components/vector/VectorProblem";
import VectorSetup from "@/components/vector/VectorSetup";
import VectorDashboard from "@/components/vector/VectorDashboard";
import VectorSecurity from "@/components/vector/VectorSecurity";
import VectorPricing from "@/components/vector/VectorPricing";
import VectorBuilder from "@/components/vector/VectorBuilder";
import VectorUpgrade from "@/components/vector/VectorUpgrade";
import VectorCredibility from "@/components/vector/VectorCredibility";
import VectorFAQ from "@/components/vector/VectorFAQ";
import VectorCTA from "@/components/vector/VectorCTA";

export const metadata = {
  title: "Vector — Own Your AI Infrastructure | Cornerstone",
  description:
    "Vector is a plug-and-play inference server that replaces your cloud AI API spend with hardware you control. One box. One purchase. No more per-token bills.",
  keywords: [
    "Vector",
    "AI inference server",
    "on-premise AI",
    "on prem",
    "self-hosted LLM",
    "smb server",
    "local AI",
    "on-prem",
    "AI hardware",
    "Cornerstone",
    "vLLM server",
    "GPU server",
    "AI infrastructure",
  ],
};

export default function VectorPage() {
  return (
    <main className="-mt-[72px]">
      <VectorHero />
      <VectorStack />
      <VectorProduct />
      <VectorSetup />
      <VectorDashboard />
      <VectorSecurity />
      <VectorPricing />
      <VectorBuilder />
      <VectorProblem />
      <VectorUpgrade />
      <VectorCredibility />
      <VectorFAQ />
      <VectorCTA />
    </main>
  );
}
