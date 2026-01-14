import StudioHero from "@/components/studio/StudioHero";
import StudioEfficiency from "@/components/studio/StudioEfficiency";
import StudioTechStack from "@/components/studio/StudioTechStack";
import StudioVerticalIntegration from "@/components/studio/StudioVerticalIntegration";
import StudioRoadmap from "@/components/studio/StudioRoadmap";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Cornerstone Studio | AI Infrastructure",
  description: "Replace cloud AI subscriptions with on-premise hardware.",
};

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] text-foreground selection:bg-black/10 selection:text-black dark:selection:bg-white/20 dark:selection:text-white">
      
      {/* 1. Minimalist Hero */}
      <StudioHero />

      {/* 2. Apple-Style Efficiency */}
      <StudioEfficiency />

      {/* 3. Exploded Tech Stack */}
      <StudioTechStack />

      {/* 4. Vertical Integration Stories */}
      <StudioVerticalIntegration />

      {/* 5. Elegant Timeline */}
      <StudioRoadmap />

      {/* 6. Final CTA - Simple */}
      <section className="container-swiss pb-32 text-center">
         <h2 className="text-4xl md:text-6xl font-serif mb-12">Own your future.</h2>
         <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
                href="/preorder" 
                className="bg-foreground text-background px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform"
            >
                Reserve Foundation
            </Link>
             <Link 
                href="mailto:contact@cornerstone.sh" 
                className="text-gray-500 hover:text-foreground px-8 py-4 transition-colors"
            >
                Contact Sales
            </Link>
         </div>
      </section>

    </main>
  );
}
