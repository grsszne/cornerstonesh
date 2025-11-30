import FadeIn from "@/components/FadeIn";
import Link from "next/link";

export const metadata = {
  title: "Devlog - Cornerstone",
  description: "Building the Foundation. Updates, progress, and behind-the-scenes.",
};

const devlogPosts = [
  {
    id: 1,
    date: "2025-11-29",
    title: "Hello, World.",
    content: (
      <>
        <p className="mb-4">
          Welcome to the Cornerstone devlog. This is where we'll document the journey of building the Foundation—from initial sketches to the final shipping product.
        </p>
        <p className="mb-4">
          We believe in building in public. That means sharing our wins, our failures, and the nitty-gritty engineering details that usually get hidden behind marketing fluff.
        </p>
        <p>
          Stay tuned for updates on thermal testing, the manufacturing process of our aluminum chassis, and deep dives into the Mortimer interface.
        </p>
      </>
    ),
  },
];

export default function DevlogPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <header className="mb-24">
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter mb-8">
              Devlog
            </h1>
            <p className="text-xl md:text-2xl font-mono text-black/60 dark:text-white/60 leading-relaxed">
              Building your <span className="text-orange-500">Foundation</span>.
              <br />
              One commit at a time.
            </p>
          </header>
        </FadeIn>

        <div className="space-y-24">
          {devlogPosts.map((post, index) => (
            <FadeIn key={post.id} delay={index * 0.1}>
              <article className="group relative border-l border-black/10 dark:border-white/10 pl-8 md:pl-12">
                <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-white dark:bg-black border border-black/20 dark:border-white/20 group-hover:border-orange-500 group-hover:bg-orange-500 transition-colors duration-300" />
                
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-6">
                  <time className="font-mono text-xs text-orange-500 uppercase tracking-widest shrink-0">
                    {post.date}
                  </time>
                  <h2 className="text-3xl font-medium tracking-tight group-hover:text-orange-500 transition-colors">
                    {post.title}
                  </h2>
                </div>

                <div className="prose prose-lg dark:prose-invert prose-neutral font-mono text-sm md:text-base opacity-80 leading-relaxed max-w-none">
                  {post.content}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-32 pt-16 border-t border-black/10 dark:border-white/10 text-center">
            <p className="font-mono text-sm opacity-50 mb-6">
              Want to get notified of new updates?
            </p>
            <Link
              href="/preorder"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-mono font-medium uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-300 rounded-full"
            >
              Join the Waitlist
            </Link>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
