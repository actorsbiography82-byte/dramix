import styles from "./episode.module.css";

interface WordPressEpisode {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

// ADSTERRA AD SLOTS FOR PLAYER PAGE
const PLAYER_TOP_AD = ""; // 728x90 Banner Above Player
const PLAYER_BOTTOM_AD = ""; // Native/Banner Below Player
const SIDEBAR_AD = ""; // 300x250 Banner in Sidebar

async function getSingleEpisode(id: string): Promise<WordPressEpisode | null> {
  try {
    const baseUrl = process.env.PANTHEON_WP_URL || process.env.NEXT_PUBLIC_PANTHEON_WP_URL || "https://dev-dramix.pantheonsite.io";
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/episodes/${id}?_embed`, { next: { revalidate: 30 } });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching single episode:", error);
    return null;
  }
}

export default async function EpisodePage({ params }: { params: { id: string } }) {
  const episode = await getSingleEpisode(params.id);

  if (!episode) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h2>Episode not found.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.container}>
        <div className={styles.layout}>
          {/* Main Player & Content Column */}
          <div className={styles.mainColumn}>
            {PLAYER_TOP_AD && (
              <div className={styles.adSlot} dangerouslySetInnerHTML={{ __html: PLAYER_TOP_AD }} />
            )}

            <h1 
              className={styles.title} 
              dangerouslySetInnerHTML={{ __html: episode.title.rendered }} 
            />

            {/* Embedded Video Player Box */}
            <div 
              className={styles.videoWrapper} 
              dangerouslySetInnerHTML={{ __html: episode.content.rendered }} 
            />

            {PLAYER_BOTTOM_AD && (
              <div className={styles.adSlot} dangerouslySetInnerHTML={{ __html: PLAYER_BOTTOM_AD }} />
            )}
          </div>

          {/* Sidebar Column */}
          <aside className={styles.sidebar}>
            {SIDEBAR_AD && (
              <div className={styles.sidebarAdSlot} dangerouslySetInnerHTML={{ __html: SIDEBAR_AD }} />
            )}
            
            <div className={styles.infoBox}>
              <h3>Episode Info</h3>
              <p>Released: {new Date(episode.date).toLocaleDateString()}</p>
              <p>Quality: HD 1080p</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}