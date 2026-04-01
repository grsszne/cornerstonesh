"use client";
import { CaretRight } from "@phosphor-icons/react";
import Link from "next/link";

export default function ArcCTA() {
  return (
    <section className="relative w-full py-40 flex items-center justify-center p-6 border-t border-[var(--arc-border-subtle)] bg-[var(--arc-surface-page)] z-10">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center space-y-12">
        <h2 
          className="text-4xl md:text-5xl font-sans tracking-tight leading-tight text-[var(--arc-text-primary)] mb-4"
          style={{ fontWeight: 300 }}
        >
          Stop managing providers.<br/>
          Start managing AI.
        </h2>
        <p className="text-lg md:text-xl text-[var(--arc-text-secondary)] font-sans font-light leading-relaxed mb-10">
          Drop in one API key. Bring order to the chaos.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/arc" className="group">
            <button className="font-mono flex items-center justify-center gap-2" style={{
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '12px 24px',
              background: 'var(--arc-text-primary)',
              color: 'var(--arc-surface-page)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 500,
            }}>
              Start Free Trial
              <CaretRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <Link href="/contact" className="group">
            <button className="font-mono flex items-center justify-center gap-2" style={{
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--arc-text-tertiary)',
              background: 'none',
              border: '1px solid var(--arc-border-subtle)',
              borderRadius: '4px',
              padding: '12px 24px',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 150ms ease',
            }}>
              Book a Demo
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
