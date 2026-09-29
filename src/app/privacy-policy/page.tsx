import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — DRAMIX",
  description:
    "Learn how DRAMIX protects your privacy, handles cookies, and manages third-party embed links.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#0a0d14] text-slate-800 dark:text-slate-200 transition-colors duration-250 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-red-600 dark:text-red-400 font-semibold">Privacy Policy</span>
        </nav>

        <header className="mb-10 pb-6 border-b border-slate-200 dark:border-white/10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </header>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Overview</h2>
            <p>
              At <strong>DRAMIX</strong> (accessible from our website), we respect and prioritize the privacy of our visitors. This Privacy Policy document outlines the types of information that is received and collected by DRAMIX and how it is used.
            </p>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through our dedicated contact page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Log Files</h2>
            <p>
              Like most standard website servers, DRAMIX makes use of log files. These files merely log visitors to the site — typically a standard procedure for hosting companies and a part of hosting services&apos; analytics.
            </p>
            <p>
              The information inside the log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and possibly the number of clicks. This information is used to analyze trends, administer the site, track user movement around the site, and gather demographic information. IP addresses and other such information are not linked to any information that is personally identifiable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Cookies and Web Beacons</h2>
            <p>
              DRAMIX uses cookies to store information about visitors&apos; preferences, to record user-specific information on which pages the site visitor accesses or visits, and to personalize or customize our web page content based upon visitors&apos; browser type or other information that the visitor sends via their browser.
            </p>
            <p>
              You can choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers&apos; respective websites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Third-Party Advertisers &amp; Embedded Players</h2>
            <p>
              Third-party ad servers or ad networks (such as Adsterra, Google AdSense, or other advertising partners) use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on DRAMIX. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see.
            </p>
            <p>
              Please note that DRAMIX has no access to or control over these cookies that are used by third-party advertisers or embedded video providers (such as YouTube, Dailymotion, or Vimeo).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Third-Party Privacy Policies</h2>
            <p>
              DRAMIX&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we advise you to consult the respective Privacy Policies of these third-party ad servers or video hosting platforms for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">6. Children&apos;s Information</h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p>
              DRAMIX does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">7. Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
