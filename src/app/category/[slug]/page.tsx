import styles from "../../page.module.css";
import Link from "next/link";

interface WordPressEpisode {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

async function getCategoryEpisodes(categorySlug: string): Promise<WordPressEpisode[]> {
  try {
    const baseUrl = process.env.PANTHEON_WP_URL || process.env.NEXT_PUBLIC_PANTHEON_WP_URL || "https://dev-dramix.pantheonsite.io";

    // 1. Fetch category ID by slug
    const catRes = await fetch(`${baseUrl}/wp-json/wp/v2/categories?slug=${categorySlug}`);
    const categories = await catRes.json();

    if (!categories || categories.length === 0) return [];
    const categoryId = categories[0].id;

    // 2. Fetch episodes for that category
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/episodes?categories=${categoryId}&_embed`, { next: { revalidate: 30 } });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching category episodes:", error);
    return [];
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.slug;
  const formattedTitle = categorySlug.replace(/-/g, " ").toUpperCase();
  const episodes = await getCategoryEpisodes(categorySlug);

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.container}>
        <section className={styles.heroSection}>
          <h1 className={styles.mainTitle}>{formattedTitle}</h1>
          <p className={styles.subTitle}>Stream latest {formattedTitle.toLowerCase()} in HD quality</p>
        </section>

        <section className={styles.gridSection}>
          <div className={styles.grid}>
            {episodes.length === 0 ? (
              <div className={styles.empty}>No episodes found in this category.</div>
            ) : (
              episodes.map((episode) => {
                const featuredImg = episode._embedded?.['wp:featuredmedia']?.[0]?.source_url;

                return (
                  <div key={episode.id} className={styles.cardGroup}>
                    <Link href={`/watch/${episode.id}`} className={styles.cardLink}>
                      <article className={styles.card}>
                        <div className={styles.thumbnailWrapper}>
                          {featuredImg ? (
                            <img src={featuredImg} alt={episode.title.rendered} className={styles.thumbnail} />
                          ) : (
                            <div className={styles.placeholderImg}>DRAMIX HD</div>
                          )}
                          <span className={styles.badge}>NEW</span>
                        </div>

                        <div className={styles.cardContent}>
                          <h2
                            className={styles.cardTitle}
                            dangerouslySetInnerHTML={{ __html: episode.title.rendered }}
                          />
                          <span className={styles.date}>
                            {new Date(episode.date).toLocaleDateString()}
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