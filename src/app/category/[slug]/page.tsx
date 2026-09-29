"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "../../page.module.css";
import { getCategoryPosts, type WordPressPost } from "../../../lib/wordpress";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = (params?.slug as string) || "";
  const formattedTitle = categorySlug.replace(/-/g, " ").toUpperCase();

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
    <div className={styles.pageWrapper}>
      <main className={styles.container}>
        <section className={styles.heroSection}>
          <h1 className={styles.mainTitle}>{formattedTitle}</h1>
          <p className={styles.subTitle}>Stream latest {formattedTitle.toLowerCase()} in HD quality</p>
        </section>

        <section className={styles.gridSection}>
          <div className={styles.grid}>
            {loading ? (
              <div className={styles.loading}>
                <div className={styles.spinner} />
                <span>Loading dramas...</span>
              </div>
            ) : posts.length === 0 ? (
              <div className={styles.empty}>No episodes found in this category.</div>
            ) : (
              posts.map((post) => {
                const featuredImg =
                  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

                return (
                  <div key={post.id} className={styles.cardGroup}>
                    <Link href={`/watch/${post.id}`} className={styles.cardLink}>
                      <article className={styles.card}>
                        <div className={styles.thumbnailWrapper}>
                          {featuredImg ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={featuredImg}
                              alt={post.title?.rendered ?? "Drama Thumbnail"}
                              className={styles.thumbnail}
                            />
                          ) : (
                            <div className={styles.placeholderImg}>DRAMIX HD</div>
                          )}
                          <span className={styles.badge}>NEW</span>
                        </div>

                        <div className={styles.cardContent}>
                          <h2
                            className={styles.cardTitle}
                            dangerouslySetInnerHTML={{ __html: post.title?.rendered ?? "" }}
                          />
                          <span className={styles.date}>
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                      </article>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
}