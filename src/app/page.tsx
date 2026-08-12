import styles from "./page.module.css";

interface WordPressEpisode {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

async function getEpisodes(): Promise<WordPressEpisode[]> {
  try {
    // Fallback URL add kiya hai agar env variable load na ho
    const baseUrl = process.env.NEXT_PUBLIC_PANTHEON_WP_URL || "https://dev-dramix.pantheonsite.io";
    const url = `${baseUrl}/wp-json/wp/v2/episodes?_embed`;

    const res = await fetch(url, { next: { revalidate: 30 } });

    if (!res.ok) {
      console.error(`Failed to fetch episodes from ${url}. Status: ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return [];
  }
}

export default async function Home() {
  const episodes = await getEpisodes();

  return (
    <main className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.logo}>
          DRAMIX
        </h1>
        <p className={styles.subtitle}>
          Watch Latest Drama Series & Episodes
        </p>
      </header>

      {/* Episodes Grid */}
      <div className={styles.grid}>
        {episodes.length === 0 ? (
          <div className={styles.empty}>
            No episodes found.
          </div>
        ) : (
          episodes.map((episode) => (
            <article key={episode.id} className={styles.card}>
              {/* Video Player Box */}
              <div
                className={styles.videoWrapper}
                dangerouslySetInnerHTML={{ __html: episode.content.rendered }}
              />

              {/* Title & Info */}
              <div className={styles.cardContent}>
                <h2
                  className={styles.cardTitle}
                  dangerouslySetInnerHTML={{ __html: episode.title.rendered }}
                />
                <span className={styles.badge}>
                  New Episode
                </span>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  );
}