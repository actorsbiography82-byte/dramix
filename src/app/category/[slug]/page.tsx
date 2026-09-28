import styles from "../../page.module.css";
import Link from "next/link";
import { getCategoryPosts, type WordPressPost } from "../../../lib/wordpress";

// Incremental Static Regeneration (ISR) with 60 seconds interval.
export const revalidate = 60;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.slug;
  const formattedTitle = categorySlug.replace(/-/g, " ").toUpperCase();
  const posts: WordPressPost[] = await getCategoryPosts(categorySlug);

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.container}>
        <section className={styles.heroSection}>
          <h1 className={styles.mainTitle}>{formattedTitle}</h1>
          <p className={styles.subTitle}>Stream latest {formattedTitle.toLowerCase()} in HD quality</p>
        </section>

        <section className={styles.gridSection}>
          <div className={styles.grid}>
            {posts.length === 0 ? (
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