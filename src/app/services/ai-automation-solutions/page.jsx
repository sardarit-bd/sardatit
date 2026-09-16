import React from "react";
import { getServiceBySlug } from "@/lib/services";
import AIHero from "@/components/ai-automation/AIHero";
import AITechStack from "@/components/ai-automation/AITechStack";
import AIMethodology from "@/components/ai-automation/AIMethodology";
import AIDeliverables from "@/components/ai-automation/AIDeliverables";
import Cta from "@/components/Cta";

export const metadata = {
  title: "Intelligent Workflow Automation & AI Integration | Sardar IT",
  description:
    "Streamlining enterprise operations with self-hosted n8n pipelines, intelligent webhook workflows, and custom AI agent integrations across 60+ countries.",
  openGraph: {
    title: "Intelligent Workflow Automation & AI Integration | Sardar IT",
    description:
      "Enterprise workflow automation with self-hosted n8n, Make, custom webhooks, and omnichannel AI agents.",
    images: ["/image/services/isometric-ai-core.png"],
  },
};

export default function AIAutomationPage() {
  const service = getServiceBySlug("ai-automation-solutions");

  return (
    <main className="w-full bg-white text-neutral-900 overflow-x-clip pt-20 relative">
      {/* Ambient Glow Background Effect */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-sky-500/10 blur-[120px] pointer-events-none -z-10 rounded-full" />

      {/* 1. Hero & Enterprise KPI Metrics */}
      <AIHero service={service} />

      {/* 2. Enterprise AI Technology Matrix */}
      <AITechStack />

      {/* 3. 4-Stage Agentic Lifecycle */}
      <AIMethodology processSteps={service?.processSteps} />

      {/* 4. Production Deliverables */}
      <AIDeliverables />

      {/* 5. Conversion CTA */}
      <div id="contact">
        <Cta />
      </div>
    </main>
  );
}
