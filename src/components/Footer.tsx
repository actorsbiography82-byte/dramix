import Link from "next/link";

interface FooterProps {
  adCodeFooter728x90?: string;
}

export default function Footer({ adCodeFooter728x90 }: FooterProps) {
  return (
    <footer className="w-full bg-[#07090f] border-t border-white/5 text-slate-400 mt-auto">
      {/* ADSTERRA FOOTER BANNER SLOT (728x90) */}
      {adCodeFooter728x90 && (
        <div className="w-full bg-black/60 py-3 border-b border-white/5 flex justify-center items-center">
          <div
            className="max-w-[728px] overflow-hidden text-center"
            dangerouslySetInnerHTML={{ __html: adCodeFooter728x90 }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <span className="text-2xl sm:text-3xl font-black tracking-wider text-white">
                DRA
                <span className="text-red-600 drop-shadow-[0_0_12px_rgba(229,9,20,0.8)] group-hover:text-red-500 transition-colors">
                  MIX
                </span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Your premier destination to stream the latest Pakistani, Turkish, Indian, and Korean drama episodes in ultra HD quality. Updated daily with the newest releases and seamless playback.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Updates Daily
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                1080p Full HD
              </span>
            </div>
          </div>

          {/* Drama Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Drama Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/category/pakistani-drama"
                  className="hover:text-red-400 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-red-500 transition-colors" />
                  Pakistani Dramas
                </Link>
              </li>
              <li>
                <Link
                  href="/category/turkish-drama"
                  className="hover:text-red-400 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-red-500 transition-colors" />
                  Turkish Dramas
                </Link>
              </li>
              <li>
                <Link
                  href="/category/indian-drama"
                  className="hover:text-red-400 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-red-500 transition-colors" />
                  Indian Dramas
                </Link>
              </li>
              <li>
                <Link
                  href="/category/korean-drama"
                  className="hover:text-red-400 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-red-500 transition-colors" />
                  Korean Dramas
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policy */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Legal & Policy
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="hover:text-white transition-colors">
                  DMCA Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DRAMIX. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Non-hosted streaming links. DRAMIX does not host media files on its servers.
          </p>
        </div>
      </div>
    </footer>
  );
}