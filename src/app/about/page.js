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
            Three high school students building what should exist: modular server hardware with unified software. Spring 2026 Kickstarter.
          </p>
        </FadeIn>
      </section>

      {/* Problem Statement */}
      <section className="container-swiss mb-32">
        <FadeIn delay={0.1}>
          <div className="max-w-4xl">
            <p className="text-xl md:text-2xl font-sans text-foreground/70 leading-relaxed mb-6">
              You pay monthly to rent storage. Tech companies scan your photos. Privacy policies change overnight. NAS devices are either enterprise racks or plastic toys.
            </p>
            <p className="text-xl md:text-2xl font-sans text-foreground leading-relaxed">
              Foundation is different: modular hardware you expand without tools, integrated software that works like one platform, complete local ownership.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Why We're Building This */}
      <section className="container-swiss mb-32">
        <FadeIn delay={0.2}>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-12">
            Why We're Building This
          </h2>
          <div className="max-w-4xl space-y-6">
            <p className="text-lg md:text-xl font-sans text-foreground/70 leading-relaxed">
              We're tired of cloud subscriptions that keep getting worse. Tired of beautiful hardware being ugly servers. Tired of fragmented apps pretending to be platforms.
            </p>
            <p className="text-lg md:text-xl font-sans text-foreground leading-relaxed">
              So we're building what we want: premium modular server hardware + FoundationOS - unified email, photos, files, and media. Everything local. Everything yours.
            </p>
            <p className="text-lg md:text-xl font-sans text-accent font-medium">
              Spring 2026 Kickstarter.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Team Section */}
      <section className="container-swiss mb-32">
        <FadeIn delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-8">
                Team
              </h2>
              <p className="text-lg font-sans text-foreground/70 leading-relaxed mb-6">
                Three high school students in McKinney, Texas. You graduate 2026, we ship Foundation first.
              </p>
              <p className="text-lg font-sans text-foreground/70 leading-relaxed mb-6">
                We're building this because we grew up watching cloud storage get expensive and invasive. We know what we want doesn't exist yet.
              </p>
              <p className="text-lg font-sans text-foreground/70 leading-relaxed mb-6">
                Zane handles hardware design - custom carrier boards, power distribution, thermal management. The team covers software architecture and industrial design.
              </p>
              <p className="text-lg font-sans text-foreground leading-relaxed font-medium">
                Not a corporation. Not backed by VCs. Just us building what should exist.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-8">
                What We Believe
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="font-serif text-2xl mb-3">Modular</h3>
                  <p className="font-sans text-foreground/70 leading-relaxed">
                    Aluminum side-loading modules, tool-free expansion, premium components (Noctua cooling, Mean Well PSUs)
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl mb-3">Local-first</h3>
                  <p className="font-sans text-foreground/70 leading-relaxed">
                    Your data on your hardware. FoundationOS core will be open source - auditable privacy claims
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl mb-3">Built to last</h3>
                  <p className="font-sans text-foreground/70 leading-relaxed">
                    Designed for a decade, not a product cycle
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Where We Are */}
      <section className="container-swiss mb-32">
        <FadeIn delay={0.4}>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-12">
            Where We Are
          </h2>
          <div className="max-w-4xl space-y-6">
            <p className="text-lg md:text-xl font-sans text-foreground/70 leading-relaxed">
              Finalizing LattePanda Mu carrier board design. Building FoundationOS alpha. Preparing Kickstarter campaign.
            </p>
            <div className="space-y-3">
              <p className="text-lg font-sans text-foreground">
                <span className="font-medium">Launch:</span> Spring 2026
              </p>
              <p className="text-lg font-sans text-foreground">
                <span className="font-medium">Ship:</span> Summer 2026
              </p>
              <p className="text-lg font-sans text-foreground">
                <span className="font-medium">First batch:</span> Parents' garage, then scale
              </p>
            </div>
            <p className="text-lg md:text-xl font-sans text-foreground font-medium pt-4">
              This is real. Small team, high standards, zero compromise.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* What's Next */}
      <section className="container-swiss mb-32 pb-32 border-b border-foreground/10">
        <FadeIn delay={0.5}>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-12">
            What's Next
          </h2>
          <div className="max-w-4xl space-y-8">
            <p className="text-lg md:text-xl font-sans text-foreground/70 leading-relaxed">
              Foundation is product one. Cornerstone builds a platform for digital independence.
            </p>
            <p className="text-lg md:text-xl font-sans text-foreground leading-relaxed">
              Future: More compute options, expanded storage, refined software, complete ownership of your digital life.
            </p>

            <div className="pt-8">
              <h3 className="font-serif text-2xl mb-6">Stay Updated</h3>
              <form
                action="/api/subscribe"
                method="POST"
                className="flex flex-col sm:flex-row gap-4 max-w-xl"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  className="flex-1 bg-transparent border-b border-foreground/20 py-3 text-base focus:border-foreground focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="bg-foreground text-background px-8 py-3 rounded-full font-sans font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* CTA Section */}
      <section className="container-swiss py-24 mb-32 text-center">
        <FadeIn delay={0.6}>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-6">
            Join the waitlist
          </h2>
          <p className="text-lg font-sans text-foreground/60 mb-8 max-w-2xl mx-auto">
            Get early access to Foundation when we launch our Kickstarter in Spring 2026.
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
