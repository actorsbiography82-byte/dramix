"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategoryPosts, type WordPressPost } from "../../../lib/wordpress";

const CATEGORY_TABS = [
  { slug: "pakistani-drama", label: "Pakistani" },
  { slug: "turkish-drama", label: "Turkish" },
  { slug: "indian-drama", label: "Indian" },
  { slug: "korean-drama", label: "Korean" },
];

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = (params?.slug as string) || "";
  const formattedTitle = categorySlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categorySlug) return;
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      try {
        const data = await getCategoryPosts(categorySlug);
        if (isMounted) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Error loading category posts:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [categorySlug]);

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#0a0d14] text-slate-900 dark:text-white transition-colors duration-250">
      {/* Category Header Banner */}
      <section className="relative overflow-hidden pt-12 pb-14 border-b border-slate-200 dark:border-white/5 bg-slate-100/70 dark:bg-radial-gradient">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-red-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-red-600 dark:text-red-400 capitalize font-semibold">{formattedTitle}</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
            {formattedTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-normal">
            Stream all latest episodes of {formattedTitle} in Full HD quality.
          </p>

          {/* Quick Category Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-colors shadow-sm"
            >
              All Dramas
            </Link>
            {CATEGORY_TABS.map((tab) => {
              const isActive = tab.slug === categorySlug;
              return (
                <Link
                  key={tab.slug}
                  href={`/category/${tab.slug}`}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-red-600 text-white shadow-glow-red"
                      : "bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 shadow-sm"
                  }`}
                >
                  {tab.label} Dramas
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Drama Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block" />
              Latest Episodes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Showing available releases for {formattedTitle}
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg">
            {posts.length} Episodes
          </span>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="bg-slate-100 dark:bg-[#121622] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 animate-pulse"
              >
                <div className="aspect-video bg-slate-200 dark:bg-white/5" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-300 dark:bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 dark:bg-white/5 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-slate-100 dark:bg-[#101420] border border-slate-200 dark:border-white/5 rounded-2xl max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 mx-auto flex items-center justify-center text-slate-400 mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No episodes found</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto mb-5">
              There are currently no drama episodes uploaded under {formattedTitle}.
            </p>
            <Link
              href="/"
              className="inline-flex px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Browse All Dramas
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => {
              const featuredImg =
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              const formattedDate = post.date
                ? new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Latest";

              return (
                <div key={post.id} className="flex flex-col">
                  <Link
                    href={`/watch/${post.id}`}
                    className="group flex flex-col h-full bg-white dark:bg-[#111522] hover:bg-slate-50 dark:hover:bg-[#151b2c] border border-slate-200 dark:border-white/5 hover:border-red-500/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                      {featuredImg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={featuredImg}
                          alt={post.title?.rendered ?? "Drama Episode"}
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
                        NEW
                      </span>

                      {post.category && (
                        <span className="absolute bottom-2.5 left-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white">
                          {post.category}
                        </span>
                      )}
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <h3
                          className="text-base font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug"
                          dangerouslySetInnerHTML={{ __html: post.title?.rendered ?? "" }}
                        />
                        {post.excerpt?.rendered && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                            {post.excerpt.rendered.replace(/<[^>]*>?/gm, "")}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formattedDate}
                        </span>
                        <span className="text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform inline-flex items-center font-semibold">
                          Watch Now
                          <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}