"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getSeriesBySlug, type DramaSeries } from "../../../lib/wordpress";

export default function DramaSeriesPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";

  const [series, setSeries] = useState<DramaSeries | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;

    async function loadSeries() {
      setLoading(true);
      try {
        const data = await getSeriesBySlug(slug);
        if (isMounted) {
          setSeries(data);
        }
      } catch (err) {
        console.error("Error loading drama series:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadSeries();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-[75vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0a0d14] text-slate-900 dark:text-white px-4">
        <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mb-4" />
        <h2 className="text-xl font-bold">Loading Series...</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Retrieving all drama episodes</p>
      </div>
    );
  }

  if (!series) {
    return (
      <div className="w-full min-h-[75vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0a0d14] text-slate-900 dark:text-white px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 flex items-center justify-center text-slate-400 mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Drama Series Not Found</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-sm">
          The requested drama series could not be found or has not been listed yet.
        </p>
        <Link
          href="/"
          className="mt-6 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-glow-red"
        >
          Browse All Dramas
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#0a0d14] text-slate-900 dark:text-white transition-colors duration-250">
      {/* Series Hero Banner */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-200 dark:border-white/5 bg-slate-100/70 dark:bg-radial-gradient">
        {/* Background ambient spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/category/${series.categorySlug}`}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {series.category}
            </Link>
            <span>/</span>
            <span className="text-red-600 dark:text-red-400 font-semibold">{series.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Series Poster Card */}
            <div className="w-48 sm:w-56 md:w-64 flex-shrink-0 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 bg-slate-900 relative">
              {series.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={series.thumbnail}
                  alt={series.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-black text-slate-500 font-bold text-base tracking-wider">
                  DRAMIX HD
                </div>
              )}
            </div>

            {/* Series Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                <Link
                  href={`/category/${series.categorySlug}`}
                  className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 dark:bg-red-600/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 hover:bg-red-100 dark:hover:bg-red-600/30 transition-colors"
                >
                  {series.category}
                </Link>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                  Full HD
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {series.episodeCount} Episode{series.episodeCount === 1 ? "" : "s"} Available
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                {series.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-6">
                {series.description ||
                  `Stream all latest episodes of ${series.title} in breathtaking Full HD quality on DRAMIX.`}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="#episodes"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-glow-red inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Start Watching</span>
                </a>
                <Link
                  href={`/category/${series.categorySlug}`}
                  className="px-4 py-2.5 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold border border-slate-200 dark:border-white/10 transition-colors"
                >
                  More {series.category}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Grid Section */}
      <section id="episodes" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block" />
              Available Episodes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Select an episode to begin instant streaming
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg">
            {series.episodes.length} Episode{series.episodes.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {series.episodes.map((ep) => {
            const thumb =
              ep._embedded?.["wp:featuredmedia"]?.[0]?.source_url || series.thumbnail;
            const formattedDate = ep.date
              ? new Date(ep.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Latest";

            return (
              <Link
                key={ep.id}
                href={`/watch/${ep.id}`}
                className="group flex flex-col bg-white dark:bg-[#111522] hover:bg-slate-50 dark:hover:bg-[#151b2c] border border-slate-200 dark:border-white/5 hover:border-red-500/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb}
                      alt={ep.title?.rendered ?? "Episode"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-black text-slate-500 font-bold text-sm tracking-wider">
                      DRAMIX HD
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  <span className="absolute top-2.5 right-2.5 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-600 text-white tracking-wider shadow-md">
                    HD
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between">
                  <h3
                    className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug"
                    dangerouslySetInnerHTML={{ __html: ep.title?.rendered ?? "" }}
                  />

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>{formattedDate}</span>
                    <span className="text-red-600 dark:text-red-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                      Watch Episode
                      <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
