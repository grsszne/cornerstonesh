import { notFound } from "next/navigation";
import ArcFeatureDetail from "@/components/arc/ArcFeatureDetail";

const FEATURES = {
  proxy: {
    title: "One Endpoint for Every Model Provider",
    subtitle: "A drop-in endpoint between your app and model providers.",
    headline: "Swap your base URL. Keep your app code.",
    sections: [
      {
        heading: "What it does",
        body: "Arc gives you a single OpenAI-compatible endpoint that sits between your application and every model provider you use — OpenAI, Anthropic, Together, Mistral, and more. Point your existing SDK at Arc's URL and your requests are proxied, logged, and routed through a system you control.",
      },
      {
        heading: "How it works",
        body: "Replace your provider's base URL with Arc's endpoint. Your app code stays almost identical — same SDK, same request format, same response shape. Arc handles the translation, routing, and logging behind the scenes. There's no new SDK to learn and no wrapper to maintain.",
      },
      {
        heading: "Why it matters",
        body: "This is the lowest-friction way to get started. Arc fits into your stack today with no giant migration. You get immediate visibility into every request, and you unlock the ability to change providers, add fallbacks, and control routing — all without touching your application code again.",
      },
    ],
    video: "proxy endpoint",
  },
  routes: {
    title: "Routes — Feature-Level Control",
    subtitle: "Each AI feature in your app gets its own route with its own behavior.",
    headline: "Give each AI feature its own controls.",
    sections: [
      {
        heading: "What it does",
        body: "A route is a named, versioned proxy for a specific AI feature in your application. Your chatbot gets one route. Your document summarizer gets another. Your support reply generator gets a third. Each route owns its own model selection, temperature, fallback logic, memory pool, and rollout strategy.",
      },
      {
        heading: "How it works",
        body: "Create a route in Arc and assign it a model, system prompt, fallback chain, and any operational controls you need. When your app makes a request, it targets a specific route by name. Arc applies that route's configuration and handles everything else — model selection, failover, logging, and memory injection.",
      },
      {
        heading: "Why it matters",
        body: "Most AI apps eventually become messy: model choices hardcoded in random places, one config trying to fit every use case, no feature-level visibility or control. Routes fix this. They make AI features feel like managed product surfaces instead of scattered API calls. You can change, test, and roll out each feature independently.",
      },
    ],
    video: "routes",
  },
  logs: {
    title: "Logs — Unified Visibility",
    subtitle: "A unified view of requests, providers, models, behavior, and cost.",
    headline: "See every request in one place.",
    sections: [
      {
        heading: "What it does",
        body: "Arc records every request that flows through it — which route handled it, which model responded, what it cost, how long it took, the full prompt and completion, token counts, and provider metadata. Everything is searchable, filterable, and exportable from a single ledger.",
      },
      {
        heading: "How it works",
        body: "Every request that passes through Arc is automatically logged with full context: route name, model, provider, latency, token usage, cost, and response. You can filter by route, model, time range, cost threshold, or status. No instrumentation code needed — it happens at the proxy layer.",
      },
      {
        heading: "Why it matters",
        body: "Teams hate flying blind. Without unified logs, you have no idea what costs are coming from where, no easy way to debug failures, no way to compare providers, and no way to understand behavior over time. Arc's ledger gives you all of this in one view — across every provider, every route, every request.",
      },
    ],
    video: "request log",
  },
  rollouts: {
    title: "Gradual Rollouts",
    subtitle: "Gradually migrate traffic from one model to another over time.",
    headline: "Roll out model changes gradually.",
    sections: [
      {
        heading: "What it does",
        body: "Instead of switching your entire route to a new model all at once, Arc lets you shift traffic gradually — 10% today, 30% tomorrow, 100% next week. You control the pace. If something goes wrong, pause or roll back instantly.",
      },
      {
        heading: "How it works",
        body: "Set a rollout policy on any route. Define the target model and the percentage of traffic to shift. Arc handles the split transparently — your app doesn't need to know which model is serving which request. Increase the percentage when you're confident, pull it back when you're not.",
      },
      {
        heading: "Why it matters",
        body: "Changing live model behavior is one of the scariest things a small team does. A model that benchmarks well can still behave differently on your specific traffic. Gradual rollouts make experimentation safer, migration controllable, and rollback instant. You ship model changes with the same confidence you ship code changes.",
      },
    ],
    video: "gradual rollout",
  },
  "shadow-testing": {
    title: "Shadow Testing",
    subtitle: "Mirror real traffic to a candidate model without sending it live.",
    headline: "Try a new model without risking production.",
    sections: [
      {
        heading: "What it does",
        body: "Shadow testing mirrors your live production traffic to a candidate model or configuration. The candidate processes every request in parallel, but its responses are never sent to your users. You get a side-by-side comparison of behavior, latency, cost, and quality — all on real traffic.",
      },
      {
        heading: "How it works",
        body: "Enable shadow mode on a route and specify the candidate model. Arc duplicates each incoming request and sends it to both the active model (which serves the user) and the shadow candidate (which is logged and compared). You can review the results in the Arc dashboard before deciding to promote the candidate.",
      },
      {
        heading: "Why it matters",
        body: "Teams want to improve their AI, but they don't want to gamble on live users. Shadow testing lets you evaluate a new model on your actual workload — not synthetic benchmarks — without any production risk. This is what moves Arc from \"proxy\" to \"operational system.\" You see the win rate before you commit.",
      },
    ],
    video: "shadow testing",
  },
  workflows: {
    title: "Workflow Controls & Traces",
    subtitle: "Bound multi-step workflows with budgets, caps, and runtime controls.",
    headline: "Keep AI workflows from running away.",
    sections: [
      {
        heading: "What it does",
        body: "When you chain multiple routes together into an autonomous agent loop or multi-step pipeline, Arc lets you wrap that chain in a workflow. Workflows enforce hard limits on total cost, token consumption, elapsed time, and step count. If anything exceeds the budget, Arc severs the connection.",
      },
      {
        heading: "Traces",
        body: "Every individual LLM call inside a workflow is recorded as a trace — a millisecond-resolution waterfall you can inspect and replay. See where a workflow slowed down, where it failed, where it went off course. Traces turn opaque agent runs into something you can actually debug.",
      },
      {
        heading: "Why it matters",
        body: "Agentic loops are powerful. They can also burn $45 in three minutes if a model gets stuck in a tool-call loop. Without controls, costs spike, loops happen, debugging gets ugly, and trust drops fast. Arc's workflow controls make multi-step AI behavior safe and observable — so you can build agents without fear.",
      },
    ],
    video: "workflow controls",
  },
  memory: {
    title: "Memory Pools",
    subtitle: "Shared durable memory for end users across multiple routes.",
    headline: "Give your app shared long-term memory.",
    sections: [
      {
        heading: "What it does",
        body: "Memory pools let you attach multiple routes to a single shared memory store. User context, preferences, and conversation history are stored durably and fetched by end-user ID. Any route connected to the pool can read and write to it.",
      },
      {
        heading: "How it works",
        body: "Create a memory pool and connect it to one or more routes. When a request comes in with an end-user ID, Arc fetches relevant memory from the pool and injects it into the model context. You control when memory is written, how it's summarized, and when it's compacted — all through policy, not code.",
      },
      {
        heading: "Why it matters",
        body: "Many apps want cross-session context, shared memory across chat, search, support, and more — but they end up writing custom memory glue code. Memory pools make memory belong to the user relationship, not just one chatbot session. Less code, better continuity, policy-driven memory instead of ad hoc storage.",
      },
    ],
    video: "memory pools",
  },
  caching: {
    title: "Semantic Caching",
    subtitle: "Serve repeated or similar requests from cache.",
    headline: "Avoid paying twice for the same intent.",
    sections: [
      {
        heading: "What it does",
        body: "Arc detects when an incoming request is semantically similar to a previous one and serves the cached response instead of making another inference call. Latency drops to milliseconds and cost drops to zero for cached hits.",
      },
      {
        heading: "How it works",
        body: "Arc embeds incoming prompts and compares them against recent requests using semantic similarity. If a match is found above the confidence threshold, the cached response is returned immediately. You can configure the similarity threshold, cache TTL, and which routes use caching.",
      },
      {
        heading: "Why it matters",
        body: "Faster responses, lower cost, better efficiency. Many applications send the same or very similar prompts repeatedly — FAQ-style questions, repeated extractions, common search queries. Semantic caching captures this pattern automatically without any application code changes.",
      },
    ],
    video: "semantic caching",
  },
  "smart-routing": {
    title: "Smart Model Routing",
    subtitle: "Pick a model based on request complexity or policy.",
    headline: "Use the expensive model only when you need it.",
    sections: [
      {
        heading: "What it does",
        body: "Smart routing analyzes incoming requests and directs simple work to cheaper, faster models while reserving stronger (and more expensive) models for complex requests that actually need them.",
      },
      {
        heading: "How it works",
        body: "Define routing rules on a route that specify when to use which model. Arc evaluates each request against your policy — complexity, token count, route-specific signals — and picks the best model for the job. You get the right cost/quality balance on every request without manual tuning.",
      },
      {
        heading: "Why it matters",
        body: "Small teams want lower inference bills without sacrificing quality. Smart routing means you're not paying GPT-4 prices for work that GPT-4o-mini handles perfectly. It connects directly to money and performance — the two things every team cares about most.",
      },
    ],
    video: "smart routing",
  },
  fallbacks: {
    title: "Fallbacks & Model Routing",
    subtitle: "Routes can define primary models and backups, plus logic for how traffic is sent.",
    headline: "Set a primary model — and never stop at one.",
    sections: [
      {
        heading: "What it does",
        body: "Every route can define a primary model and a chain of fallbacks. If the primary model is unavailable, slow, or returns an error, Arc automatically fails over to the next model in the chain — transparently, with no downtime for your users.",
      },
      {
        heading: "How it works",
        body: "Configure a fallback chain on any route: primary model first, then one or more backups. Arc monitors each model's availability and performance. When a failure is detected, the next model in the chain takes over. You can also define routing rules for load balancing or A/B-style traffic splitting across models.",
      },
      {
        heading: "Why it matters",
        body: "Small teams don't want to hand-build reliability logic. Fallbacks give you resilience, flexibility, less provider lock-in, and less fear around outages or bad model choices. Your AI features stay available even when individual providers don't.",
      },
    ],
    video: "fallbacks",
  },
};

export function generateStaticParams() {
  return Object.keys(FEATURES).map((feature) => ({ feature }));
}

export async function generateMetadata({ params }) {
  const { feature } = await params;
  const data = FEATURES[feature];
  if (!data) return {};
  return {
    title: `${data.title} — Arc | Cornerstone`,
    description: data.subtitle,
  };
}

export default async function ArcFeaturePage({ params }) {
  const { feature } = await params;
  const data = FEATURES[feature];
  if (!data) notFound();
  return <ArcFeatureDetail feature={data} />;
}
