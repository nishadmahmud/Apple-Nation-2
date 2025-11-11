import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export const metadata = {
  title: "Terms and Conditions | Apple Nation BD",
  description: "Terms and conditions for using Apple Nation BD services and purchasing products.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-100">
      <div className="mx-auto w-full max-w-4xl px-6 py-8 sm:px-10 lg:px-16">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <MdArrowBack className="h-5 w-5" />
          Back to Home
        </Link>

        {/* Content */}
        <article className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              Terms and Conditions
            </h1>
            <p className="text-sm text-slate-600 dark:text-zinc-400">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white/95 p-8 dark:border-zinc-700 dark:bg-zinc-800/90">
            <div className="prose prose-slate max-w-none space-y-6 text-slate-700 dark:prose-invert dark:text-zinc-300">
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  1. Acceptance of Terms
                </h2>
                <p className="mb-4 leading-relaxed">
                  By accessing and using Apple Nation BD's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  2. Use License
                </h2>
                <p className="mb-4 leading-relaxed">
                  Permission is granted to temporarily access the materials on Apple Nation BD's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  3. Product Information
                </h2>
                <p className="mb-4 leading-relaxed">
                  We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free. If a product offered by us is not as described, your sole remedy is to return it in unused condition.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  4. Pricing and Payment
                </h2>
                <p className="mb-4 leading-relaxed">
                  All prices are listed in Bangladeshi Taka (৳) and are subject to change without notice. We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  5. Orders and Delivery
                </h2>
                <p className="mb-4 leading-relaxed">
                  When you place an order, you are making an offer to purchase products. We reserve the right to accept or reject your order for any reason. Delivery times are estimates and not guaranteed. We are not responsible for delays caused by third-party shipping companies.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  6. Limitation of Liability
                </h2>
                <p className="mb-4 leading-relaxed">
                  In no event shall Apple Nation BD or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Apple Nation BD's website.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  7. Revisions and Errata
                </h2>
                <p className="mb-4 leading-relaxed">
                  The materials appearing on Apple Nation BD's website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  8. Contact Information
                </h2>
                <p className="mb-4 leading-relaxed">
                  If you have any questions about these Terms and Conditions, please contact us through our support channels.
                </p>
              </section>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

