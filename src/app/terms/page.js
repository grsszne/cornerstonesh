import Link from "next/link";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "Terms of Service - Cornerstone",
  description: "Terms of Service for Cornerstone Foundation",
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm font-mono hover:opacity-70 transition-opacity mb-8"
            >
              &lt; Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="font-mono text-sm text-black/60 dark:text-white/60 mb-12">
              Last Updated: November 27, 2025
            </p>

            <div className="space-y-8 font-mono text-sm leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or using Cornerstone's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  2. Products and Services
                </h2>
                <p className="mb-4">
                  Cornerstone offers modular home server systems and related products. We reserve the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Modify or discontinue products at any time</li>
                  <li>Limit quantities available for purchase</li>
                  <li>Refuse service to anyone for any reason</li>
                  <li>Update product specifications and pricing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  3. Orders and Payment
                </h2>
                <p className="mb-4">
                  When you place an order:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You are making an offer to purchase the products</li>
                  <li>We reserve the right to accept or decline your order</li>
                  <li>Payment must be received before order fulfillment</li>
                  <li>All prices are in USD unless otherwise stated</li>
                  <li>You are responsible for any applicable taxes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  4. Pre-Orders
                </h2>
                <p>
                  For pre-order products, estimated delivery dates are provided in good faith but are not guaranteed. We will notify you of any significant delays. Pre-order payments may be charged at the time of order or upon shipment, as specified during checkout.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  5. Shipping and Delivery
                </h2>
                <p className="mb-4">
                  Shipping terms:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Shipping costs are calculated at checkout</li>
                  <li>Delivery times are estimates and not guaranteed</li>
                  <li>Risk of loss passes to you upon delivery to the carrier</li>
                  <li>You are responsible for providing accurate shipping information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  6. Returns and Refunds
                </h2>
                <p className="mb-4">
                  Our return policy:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Products may be returned within 30 days of delivery</li>
                  <li>Items must be unused and in original packaging</li>
                  <li>Refunds will be issued to the original payment method</li>
                  <li>Shipping costs are non-refundable unless the return is due to our error</li>
                  <li>Custom or personalized items may not be returnable</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  7. Warranty
                </h2>
                <p>
                  Cornerstone products come with a limited warranty covering manufacturing defects. The warranty period and terms are specified in the product documentation. This warranty does not cover damage from misuse, accidents, or unauthorized modifications.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  8. Intellectual Property
                </h2>
                <p>
                  All content on this website, including text, graphics, logos, and software, is the property of Cornerstone and protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  9. User Conduct
                </h2>
                <p className="mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use our services for any illegal purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of our website</li>
                  <li>Impersonate any person or entity</li>
                  <li>Transmit viruses or malicious code</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  10. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by law, Cornerstone shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our products or services. Our total liability shall not exceed the amount you paid for the product or service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  11. Indemnification
                </h2>
                <p>
                  You agree to indemnify and hold Cornerstone harmless from any claims, damages, or expenses arising from your violation of these Terms or your use of our products and services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  12. Governing Law
                </h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  13. Changes to Terms
                </h2>
                <p>
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of our services after changes constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  14. Contact Information
                </h2>
                <p>
                  For questions about these Terms, please contact us at:
                </p>
                <p className="mt-4 p-4 border border-black dark:border-white">
                  Email: legal@cornerstone.com<br />
                  Address: [Your Business Address]
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
