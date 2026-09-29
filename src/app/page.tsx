"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getPosts, type WordPressPost } from "../lib/wordpress";

const NATIVE_AD_CODE = ""; // Paste Adsterra Native Grid Ad Script Here

const HERO_SLIDES = [
  {
    id: 1,
    tag: "Pakistani Drama Series",
    title: "Emotional & High-Voltage Stories",
    image:
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1600&auto=format&fit=crop",
    slug: "/category/pakistani-drama",
  },
  {
    id: 2,
    tag: "Turkish Historical Epics",
    title: "Warriors, Empires & Legends",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1600&auto=format&fit=crop",
    slug: "/category/turkish-drama",
  },
  {
    id: 3,
    tag: "Korean K-Drama Phenomena",
    title: "Global Heartfelt Romance & Mystery",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1600&auto=format&fit=crop",
    slug: "/category/korean-drama",
  },
  {
    id: 4,
    tag: "Indian Primetime Blockbusters",
    title: "Family Ties & Unforgettable Twists",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop",
    slug: "/category/indian-drama",
  },
];

const FEATURED_CATEGORIES = [
  {
    title: "Pakistani Dramas",
    slug: "pakistani-drama",
    badge: "Trending Worldwide",
    count: "Top Hit Series",
    image:
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=800&auto=format&fit=crop",
    accent: "hover:border-emerald-500/60",
  },
  {
    title: "Turkish Dramas",
    slug: "turkish-drama",
    badge: "Epic & Historical",
    count: "Action & Drama",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop",
    accent: "hover:border-amber-500/60",
  },
  {
    title: "Indian Dramas",
    slug: "indian-drama",
    badge: "High Voltage Romance",
    count: "Daily Primetime",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop",
    accent: "hover:border-rose-500/60",
  },
  {
    title: "Korean Dramas",
    slug: "korean-drama",
    badge: "Global K-Drama",
    count: "Fan Favorites",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop",
    accent: "hover:border-purple-500/60",
  },
];

export default function Home() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance cinematic hero carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      try {
        const data = await getPosts();
        if (isMounted) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Error loading posts:", error);
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
  }, []);

  // Filter posts based on live search query
  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return posts;

    return posts.filter((post) => {
      const title = (post.title?.rendered || "").toLowerCase();
      const cat = (post.category || "").toLowerCase();
      const desc = (post.excerpt?.rendered || "").toLowerCase();
      return title.includes(q) || cat.includes(q) || desc.includes(q);
    });
  }, [posts, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#0a0d14] text-slate-900 dark:text-white transition-colors duration-250">
      {/* 1. CINEMATIC HERO SECTION WITH AUTOMATED CAROUSEL */}
      <section className="relative overflow-hidden min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center justify-center border-b border-slate-200 dark:border-white/5">
        {/* Dynamic Carousel Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.tag}
                  className={`w-full h-full object-cover transform duration-10000 transition-transform ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                />
              </div>
            );
          })}

          {/* Cinematic Dark Gradient Mask for Maximum Readability in Both Light and Dark Modes */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-50 via-slate-950/75 to-slate-950/90 dark:from-[#0a0d14] dark:via-[#0a0d14]/80 dark:to-black/80" />

          {/* Ambient center spotlight glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-red-600/20 blur-[130px] rounded-full pointer-events-none z-10" />
        </div>

        {/* Hero Interactive Content (Centered & Above Carousel) */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          {/* Active Carousel Slide Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 dark:bg-white/10 border border-white/20 text-xs font-semibold text-red-400 mb-6 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Featured: {HERO_SLIDES[currentSlide].tag}</span>
          </div>

          {/* Main Brand Title & Catchy Tagline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            STREAM THE WORLD&apos;S{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 drop-shadow-[0_0_30px_rgba(229,9,20,0.6)]">
              DRAMAS
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-normal mb-8 sm:mb-10 leading-relaxed drop-shadow-md">
            Instant streaming for top Pakistani, Turkish, Indian, and Korean dramas.
            Updated daily with newest episodes in crystal-clear quality.
          </p>

          {/* Glowing Live Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl blur-md opacity-50 group-focus-within:opacity-90 transition duration-300" />
            <div className="relative flex items-center bg-white/95 dark:bg-[#101522]/95 backdrop-blur-md border border-slate-200 dark:border-white/15 rounded-xl shadow-2xl px-4 py-3 sm:py-3.5 focus-within:border-red-500 transition-colors">
              <svg
                className="w-5 h-5 text-red-500 mr-3 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search drama title, episode, or category (e.g., Atish, Turkish, Kurulus)..."
                className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 text-sm sm:text-base focus:outline-none"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors ml-2"
                  title="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {searchQuery && (
              <div className="text-left mt-2.5 px-2 text-xs text-slate-300 flex items-center justify-between drop-shadow">
                <span>
                  Showing results for &ldquo;<span className="text-white font-semibold">{searchQuery}</span>&rdquo;
                </span>
                <span className="text-red-400 font-semibold">{filteredPosts.length} drama{filteredPosts.length === 1 ? "" : "s"} found</span>
              </div>
            )}
          </div>

          {/* Carousel Navigation Dots & Controls */}
          <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    isActive
                      ? "w-8 bg-red-600 shadow-[0_0_10px_rgba(229,9,20,0.8)]"
                      : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  title={slide.tag}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. VISUAL CATEGORY CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block" />
              Explore By Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Select your favorite drama industry to start streaming
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FEATURED_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`group relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg ${cat.accent} transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
            >
              {/* Background Poster Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090c13] via-[#090c13]/70 to-transparent" />

              {/* Badge & Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-600 text-white shadow-sm">
                    {cat.badge}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    {cat.count}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. LATEST DRAMA EPISODES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block" />
              {searchQuery ? "Search Results" : "Latest Drama Episodes"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {searchQuery
                ? `Showing episodes matching "${searchQuery}"`
                : "Newest episodes streaming online right now"}
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg">
            {filteredPosts.length} Available
          </span>
        </div>

        {/* Loading Skeleton */}
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
        ) : filteredPosts.length === 0 ? (
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
              {searchQuery
                ? `No drama matched "${searchQuery}". Try searching for another drama title.`
                : "No drama episodes currently available. Please check back soon."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPosts.map((post, index) => {
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
                  {/* Optional Native Ad Ingestion */}
                  {index === 2 && NATIVE_AD_CODE && (
                    <article className="mb-6 rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#111624] border border-red-500/20 p-4">
                      <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                        Sponsored
                      </div>
                      <div dangerouslySetInnerHTML={{ __html: NATIVE_AD_CODE }} />
                    </article>
                  )}

                  {/* Drama Card */}
                  <Link
                    href={`/watch/${post.id}`}
                    className="group flex flex-col h-full bg-white dark:bg-[#111522] hover:bg-slate-50 dark:hover:bg-[#151b2c] border border-slate-200 dark:border-white/5 hover:border-red-500/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {/* Thumbnail with 16:9 aspect ratio */}
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

                      {/* Play Button Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* NEW Badge */}
                      <span className="absolute top-2.5 right-2.5 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-600 text-white tracking-wider shadow-md">
                        NEW
                      </span>

                      {/* Category Pill on Image */}
                      {post.category && (
                        <span className="absolute bottom-2.5 left-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white">
                          {post.category}
                        </span>
                      )}
                    </div>

                    {/* Card Content */}
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