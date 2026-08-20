import styles from "./page.module.css";
import Link from "next/link";

interface WordPressEpisode {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

const NATIVE_AD_CODE = ""; // Paste Adsterra Native Grid Ad Script Here

async function getEpisodes(): Promise<WordPressEpisode[]> {
  try {
    const baseUrl = process.env.PANTHEON_WP_URL || process.env.NEXT_PUBLIC_PANTHEON_WP_URL || "https://dev-dramix.pantheonsite.io";
    
    // Clean fetch query without extra timestamp parameters
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/episodes?_embed`, {
      cache: 'no-store'
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return [];
  }
}

export default async function Home() {
  const episodes = await getEpisodes();

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.container}>
        <section className={styles.heroSection}>
          <h1 className={styles.mainTitle}>Watch Latest Drama Episodes</h1>
          <p className={styles.subTitle}>Stream high quality episodes updated daily</p>
        </section>

        <section className={styles.gridSection}>
          <div className={styles.grid}>
            {episodes.length === 0 ? (
              <div className={styles.empty}>No episodes found. Please check WordPress posts.</div>
            ) : (
              episodes.map((episode, index) => {
                const featuredImg = episode._embedded?.['wp:featuredmedia']?.[0]?.source_url;

                return (
                  <div key={episode.id} className={styles.cardGroup}>
                    {index === 2 && NATIVE_AD_CODE && (
                      <article className={`${styles.card} ${styles.adCard}`}>
                        <div className={styles.adLabel}>ADVERTISEMENT / ADSTERRA NATIVE AD</div>
                        <div dangerouslySetInnerHTML={{ __html: NATIVE_AD_CODE }} />
                      </article>
                    )}

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