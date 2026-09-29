import Link from "next/link";

export const metadata = {
  title: "Terms of Service — DRAMIX",
  description:
    "Read the terms, conditions, and user agreement governing the use of the DRAMIX streaming and drama directory platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#0a0d14] text-slate-800 dark:text-slate-200 transition-colors duration-250 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-red-600 dark:text-red-400 font-semibold">Terms of Service</span>
        </nav>

        <header className="mb-10 pb-6 border-b border-slate-200 dark:border-white/10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </header>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Agreement to Terms</h2>
            <p>
              By accessing or using the DRAMIX website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Nature of Service &amp; Indexing Disclaimer</h2>
            <p>
              DRAMIX operates purely as a content directory, aggregator, and search guide for television dramas and series. All video player embeds displayed on DRAMIX are pulled from publicly accessible third-party video sharing platforms (such as YouTube, Dailymotion, or legitimate network distribution channels).
            </p>
            <p>
              DRAMIX does not upload, host, encode, or store media files. We have no direct control over the availability, copyright status, or performance of external third-party streaming links.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Acceptable Use</h2>
            <p>
              You agree to use DRAMIX only for lawful personal entertainment purposes. When browsing the platform, you agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm">
              <li>Deploy unauthorized scrapers, crawlers, or harvesting tools to extract data without written consent.</li>
              <li>Attempt to circumvent security controls or interfere with the proper operation of the website.</li>
              <li>Transmit any malicious code, viruses, or harmful scripts.</li>
              <li>Impersonate any individual, organization, or administrator of DRAMIX.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Intellectual Property &amp; Trademarks</h2>
            <p>
              All trademarks, series titles, character names, production logos, and poster imagery referenced on DRAMIX belong to their respective copyright holders and production companies. Their inclusion on this website is for informational, descriptive, and indexing purposes only.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Disclaimer of Warranties</h2>
            <p>
              DRAMIX is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. We make no representations or warranties of any kind, express or implied, regarding the continuous uptime, accuracy, completeness, or reliability of any content, stream link, or metadata available through our directory.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">6. Limitation of Liability</h2>
            <p>
              In no event shall DRAMIX, its contributors, or its operators be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your access to, use of, or inability to use this platform or any third-party links accessed through it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">7. Modifications to Service and Terms</h2>
            <p>
              DRAMIX reserves the right to modify or discontinue, temporarily or permanently, any feature of the site or these Terms of Service at any time without prior notice. Continued use of the website following any modifications signifies your acceptance of the revised terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">8. Inquiries &amp; Legal Notices</h2>
            <p>
              If you have any questions or concerns regarding our Terms of Service, please contact us through our official <Link href="/contact" className="text-red-600 dark:text-red-400 font-semibold underline">Contact Us</Link> page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
