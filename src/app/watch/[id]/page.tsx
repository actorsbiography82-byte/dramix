"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  getPostById,
  getPosts,
  extractYouTubeId,
  type WordPressPost,
} from "../../../lib/wordpress";

export default function WatchPage() {
  const params = useParams();
  const id = (params?.id as string) || "";

  const [post, setPost] = useState<WordPressPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      try {
        const [currentPost, allPosts] = await Promise.all([
          getPostById(id),
          getPosts(),
        ]);

        if (isMounted) {
          setPost(currentPost);
          if (allPosts && currentPost) {
            // Filter out current post and show up to 4 recommendations
            const others = allPosts
              .filter((p) => String(p.id) !== String(currentPost.id))
              .slice(0, 4);
            setRelatedPosts(others);
          }
        }
      } catch (error) {
        console.error("Error loading episode:", error);
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
  }, [id]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[75vh] flex flex-col items-center justify-center bg-[#0a0d14] text-white px-4">
        <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mb-4" />
        <h2 className="text-xl font-bold">Loading Episode...</h2>
        <p className="text-sm text-slate-400 mt-1">Preparing theater video player</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full min-h-[75vh] flex flex-col items-center justify-center bg-[#0a0d14] text-white px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Episode Not Found</h2>
        <p className="text-sm text-slate-400 mt-2 max-w-sm">
          The requested drama episode could not be located or may have been removed.
        </p>
        <Link
          href="/"
          className="mt-6 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-glow-red"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  // Extract YouTube ID if available
  const youtubeId = extractYouTubeId(post.youtubeUrl || "");
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Added";

  // Clean description string without HTML tags
  const rawDescription =
    post.excerpt?.rendered ||
    post.content?.rendered?.replace(/<[^>]*>?/gm, "").trim() ||
    "Watch this full drama episode online in HD quality on DRAMIX.";

  const categorySlug = (post.category || "drama")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="w-full min-h-screen bg-[#0a0d14] text-white">
      {/* Ambient background glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[300px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          {post.category && (
            <>
              <Link
                href={`/category/${categorySlug}`}
                className="hover:text-white transition-colors"
              >
                {post.category}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-slate-300 truncate max-w-xs sm:max-w-md">
            {post.title?.rendered}
          </span>
        </nav>

        {/* Video Player Theater Container */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl mb-8 group">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={post.title?.rendered ?? "Drama Player"}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : post.content?.rendered?.includes("<iframe") ? (
            <div
              className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center mb-3">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold">Video Embed Ready</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-md">
                Stream is loading or the provider link will play here shortly.
              </p>
            </div>
          )}
        </div>

        {/* Episode Info & Action Bar */}
        <div className="bg-[#101420] border border-white/10 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              {/* Category & Status Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {post.category && (
                  <Link
                    href={`/category/${categorySlug}`}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 transition-colors"
                  >
                    {post.category}
                  </Link>
                )}
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Full HD 1080p
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1.5 ml-1">
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formattedDate}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight"
                dangerouslySetInnerHTML={{ __html: post.title?.rendered ?? "" }}
              />
            </div>

            {/* Quick Share Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-white transition-colors"
              >
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>{copied ? "Link Copied!" : "Share Episode"}</span>
              </button>
            </div>
          </div>

          {/* Synopsis / Description */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Episode Synopsis
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
              {rawDescription}
            </p>
          </div>
        </div>

        {/* Up Next / More Like This Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
                  <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block" />
                  More Like This
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Explore other high-rated drama episodes
                </p>
              </div>

              <Link
                href="/"
                className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPosts.map((related) => {
                const img =
                  related._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                const rDate = related.date
                  ? new Date(related.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "Latest";

                return (
                  <Link
                    key={related.id}
                    href={`/watch/${related.id}`}
                    className="group flex flex-col bg-[#111522] hover:bg-[#151b2c] border border-white/5 hover:border-red-500/40 rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-[#0c0f17]">
                      {img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img}
                          alt={related.title?.rendered ?? "Related Drama"}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-black text-slate-500 font-bold text-xs tracking-wider">
                          DRAMIX HD
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {related.category && (
                        <span className="absolute bottom-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-slate-200">
                          {related.category}
                        </span>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <h4
                        className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: related.title?.rendered ?? "" }}
                      />
                      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{rDate}</span>
                        <span className="text-red-400 font-semibold group-hover:translate-x-1 transition-transform">
                          Watch →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}