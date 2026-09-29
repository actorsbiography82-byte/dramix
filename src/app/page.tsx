"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { getPosts, type WordPressPost } from "../lib/wordpress";

const NATIVE_AD_CODE = ""; // Paste Adsterra Native Grid Ad Script Here

export default function Home() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.container}>
        <section className={styles.heroSection}>
          <h1 className={styles.mainTitle}>Watch Latest Drama Episodes</h1>
          <p className={styles.subTitle}>Stream high quality episodes updated daily</p>
        </section>

        <section className={styles.gridSection}>
          <div className={styles.grid}>
            {loading ? (
              <div className={styles.loading}>
                <div className={styles.spinner} />
                <span>Loading latest drama episodes...</span>
              </div>
            ) : posts.length === 0 ? (
              <div className={styles.empty}>No episodes found.</div>
            ) : (
              posts.map((post, index) => {
                const featuredImg =
                  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

                return (
                  <div key={post.id} className={styles.cardGroup}>
                    {index === 2 && NATIVE_AD_CODE && (
                      <article className={`${styles.card} ${styles.adCard}`}>
                        <div className={styles.adLabel}>ADVERTISEMENT / ADSTERRA NATIVE AD</div>
                        <div dangerouslySetInnerHTML={{ __html: NATIVE_AD_CODE }} />
                      </article>
                    )}

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