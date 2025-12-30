import FadeIn from '@/components/FadeIn';

export const metadata = {
  title: 'About - Cornerstone',
  description: 'Three high school students building modular hardware and integrated software for complete local ownership.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="container-swiss pt-32 pb-16 mb-24">
        <FadeIn>
          <h1 className="text-6xl md:text-8xl font-serif tracking-tight mb-8">
            About.
          </h1>
          <p className="text-xl md:text-2xl font-sans text-foreground/60 max-w-3xl">
            Three high school students building modular server hardware with unified software. Spring 2026 Kickstarter.
          </p>
        </FadeIn>
      </section>

      {/* Main Content */}
      <section className="container-swiss mb-32">
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-6xl">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-6">
                The Problem
              </h2>
              <p className="text-lg font-sans text-foreground/70 leading-relaxed mb-6">
                Cloud subscriptions keep getting worse. NAS devices are either enterprise racks or plastic toys. Your data isn't yours.
              </p>
              <p className="text-lg font-sans text-foreground leading-relaxed">
                Foundation is different: modular hardware you expand without tools, integrated software that works like one platform, complete local ownership.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-6">
                The Team
              </h2>
              <p className="text-lg font-sans text-foreground/70 leading-relaxed">
                Three students in McKinney, Texas. Not a corporation. Not backed by VCs. Just us building what should exist.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Timeline */}
      <section className="container-swiss mb-32 pb-32 border-b border-foreground/10">
        <FadeIn delay={0.2}>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-8">
            Timeline
          </h2>
          <div className="max-w-2xl space-y-4">
            <p className="text-lg font-sans text-foreground">
              <span className="font-medium">Kickstarter:</span> Q3 2026
            </p>
            <p className="text-lg font-sans text-foreground">
              <span className="font-medium">First shipments:</span> Q1 2027
            </p>
          </div>
        </FadeIn>
      </section>

      {/* CTA Section */}
      <section className="container-swiss py-24 mb-32 text-center">
        <FadeIn delay={0.3}>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-6">
            Join the waitlist
          </h2>
          <p className="text-lg font-sans text-foreground/60 mb-8 max-w-2xl mx-auto">
            Get early access when we launch in Q3 2026.
          </p>
          <a
            href="/preorder"
            className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-sans font-medium hover:opacity-90 transition-opacity"
          >
            Reserve Your Spot
          </a>
        </FadeIn>
      </section>
    </div>
  );
}
