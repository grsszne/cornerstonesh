import Link from "next/link";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "Privacy Policy - Cornerstone",
  description: "Privacy Policy for Cornerstone Foundation",
};

export default function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-12 relative border border-black/10 dark:border-white/10">
              {/* Diagonal lines background - only behind text content */}
              <div 
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(315deg, transparent, transparent 20px, currentColor 20px, currentColor 21px)',
                }}
              />
              
              <div className="relative z-10 p-8 md:p-12">
                <Link 
                  href="/" 
                  className="inline-flex items-center text-sm font-mono hover:opacity-70 transition-opacity mb-8"
                >
                  &lt; Back to Home
                </Link>
                
                <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
                  Privacy Policy
                </h1>
                <p className="font-mono text-sm text-black/60 dark:text-white/60 mb-12">
                  Last Updated: November 27, 2025
                </p>

            <div className="space-y-8 font-mono text-sm leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  1. Information We Collect
                </h2>
                <p className="mb-4">
                  We collect information you provide directly to us when you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Create an account or place an order</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us for support</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <p className="mt-4">
                  This may include your name, email address, shipping address, payment information, and communication preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  2. How We Use Your Information
                </h2>
                <p className="mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process and fulfill your orders</li>
                  <li>Send you updates about your order and our products</li>
                  <li>Respond to your questions and provide customer support</li>
                  <li>Improve our products and services</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Detect and prevent fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  3. Information Sharing
                </h2>
                <p className="mb-4">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Service providers who help us operate our business (payment processors, shipping companies)</li>
                  <li>Professional advisors (lawyers, accountants)</li>
                  <li>Law enforcement when required by law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  4. Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  5. Your Rights
                </h2>
                <p className="mb-4">
                  Depending on your location, you may have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to or restrict processing of your information</li>
                  <li>Withdraw consent for marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  6. Cookies and Tracking
                </h2>
                <p>
                  We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookies through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  7. Children's Privacy
                </h2>
                <p>
                  Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  8. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  9. Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="mt-4 p-4 border border-black dark:border-white">
                  Email: privacy@cornerstone.com<br />
                  Address: [Your Business Address]
                </p>
              </section>
            </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
