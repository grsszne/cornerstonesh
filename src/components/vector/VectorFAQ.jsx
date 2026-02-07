"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const faqs = [
  {
    q: "What models can it run?",
    a: "Open models via vLLM. Llama, Qwen, Mistral, Gemma, DeepSeek, and any HuggingFace-compatible model. No vendor lock-in.",
  },
  {
    q: "How does it compare to renting a GPU from Lambda or CoreWeave?",
    a: "You\u2019re still renting. Vector is a one-time purchase with no ongoing compute costs.",
  },
  {
    q: "What about model updates?",
    a: "One-click model downloads from the dashboard. New models available as soon as they\u2019re released on HuggingFace.",
  },
  {
    q: "Do I need to open firewall ports?",
    a: "No. Vector uses outbound-only Cloudflare Tunnels. Works behind any NAT, any firewall, zero configuration.",
  },
  {
    q: "What if it breaks?",
    a: "Standard hardware warranty. Vector also runs continuous self-diagnostics and alerts you before problems become failures.",
  },
  {
    q: "Can it handle our scale?",
    a: "Depends on your workload. Use the calculator above, or tell us your current usage and we\u2019ll recommend a configuration.",
  },
  {
    q: "What happens to my data if I stop using Vector?",
    a: "It\u2019s on your hardware. Wipe the drives, repurpose the box, or keep it running. We never had your data in the first place.",
  },
];

export default function VectorFAQ() {
  const [open, setOpen] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-40 bg-muted">
      <div className="container-swiss">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-foreground/10">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span
                  className={`font-sans text-base pr-8 transition-colors ${
                    open === i
                      ? "text-foreground"
                      : "text-foreground/60 group-hover:text-foreground"
                  }`}
                >
                  {faq.q}
                </span>
                <span className="font-sans text-foreground/30 text-xl leading-none flex-shrink-0">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-foreground/50 text-sm leading-relaxed pb-6">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
