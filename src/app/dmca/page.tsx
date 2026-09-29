import Link from "next/link";

export const metadata = {
  title: "DMCA Copyright Disclaimer — DRAMIX",
  description:
    "Digital Millennium Copyright Act (DMCA) compliance notice, content takedown procedures, and intellectual property disclaimer for DRAMIX.",
};

export default function DmcaPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#0a0d14] text-slate-800 dark:text-slate-200 transition-colors duration-250 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-red-600 dark:text-red-400 font-semibold">DMCA Disclaimer</span>
        </nav>

        <header className="mb-10 pb-6 border-b border-slate-200 dark:border-white/10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            DMCA Copyright Disclaimer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Compliance Policy in accordance with 17 U.S.C. § 512
          </p>
        </header>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {/* Important Highlight Box */}
          <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-950 dark:text-red-200">
            <h3 className="font-bold text-base mb-1.5 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Non-Hosting Statement
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed">
              DRAMIX functions strictly as a digital index, aggregator, and search directory for publicly available video embed links found across the internet (such as YouTube, Dailymotion, and official distributor channels). We do not host, store, upload, rip, or transmit any video files, media archives, or copyrighted streams on our own servers.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Copyright Protection &amp; Respect</h2>
            <p>
              DRAMIX respects the intellectual property rights of content producers, production studios, television networks, and artists worldwide. It is our policy to respond expeditiously to clear, legitimate notices of alleged copyright infringement that comply with the United States Digital Millennium Copyright Act (&ldquo;DMCA&rdquo;).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Filing an Infringement Notification</h2>
            <p>
              If you are a copyright owner or an agent authorized to act on behalf of one, and you believe that any link, index reference, or embedded material hosted on third-party sites indexed by DRAMIX infringes upon your copyright, you may submit a formal notification with the following mandatory details:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>Authorized Signature:</strong> A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
              </li>
              <li>
                <strong>Identification of the Work:</strong> Identification of the copyrighted work claimed to have been infringed, or a representative list of such works.
              </li>
              <li>
                <strong>Infringing URL Reference:</strong> Identification of the specific URL, post, or web address on DRAMIX where the material or reference is claimed to be located.
              </li>
              <li>
                <strong>Contact Information:</strong> Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and valid email address.
              </li>
              <li>
                <strong>Good Faith Statement:</strong> A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
              </li>
              <li>
                <strong>Perjury Statement:</strong> A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Takedown Actions &amp; Processing Window</h2>
            <p>
              Upon receipt of a valid and complete DMCA notification, DRAMIX will promptly review the notice and remove or disable access to the relevant reference links from our directory within <strong>24 to 48 business hours</strong>.
            </p>
            <p>
              Because DRAMIX does not host the underlying video files, removing the index link from DRAMIX does not take down the video from the third-party platform (e.g. YouTube). To remove the video permanently from the internet, you should contact the actual hosting provider directly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Submitting a Notice</h2>
            <p>
              To submit your copyright notice, please reach out directly via our official contact form:
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-glow-red"
              >
                <span>Submit DMCA Notice via Contact Page</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
