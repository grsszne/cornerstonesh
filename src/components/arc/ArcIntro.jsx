'use client';

import { useEffect, useRef, useState } from 'react';

export default function ArcIntro() {
  return (
    <section className="relative w-full py-32 flex items-center justify-center p-6 sm:p-12 z-10">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <h2 
          className="text-4xl md:text-6xl font-sans tracking-tight leading-tight text-[var(--arc-text-primary)] mb-6"
          style={{ fontWeight: 300 }}
        >
          One API to rule them all.
        </h2>
        <div className="text-xl md:text-2xl text-[var(--arc-text-secondary)] font-sans font-light leading-relaxed max-w-3xl mx-auto space-y-6">
          <p>
            You don&apos;t need five different provider integrations. You don&apos;t need scattered spreadsheets to track AI spend. You don&apos;t need to manually update your backend when a new model drops.
          </p>
          <p>
            Arc sits invisibly between your application and every AI model on earth. Swap one API key, change your base URL, and instantly unlock unified observability, semantic caching, shadow routing, and absolute cost control.
          </p>
        </div>
      </div>
    </section>
  );
}
