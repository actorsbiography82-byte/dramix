export interface WordPressTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
  parent?: number;
}

export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  featured_media?: number;
  categories?: number[];
  category?: string;
  youtubeUrl?: string;
  tags?: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
    "wp:term"?: Array<Array<WordPressTerm>>;
  };
}

export type WordPressEpisode = WordPressPost;

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

export interface DramaItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  youtubeUrl: string;
  thumbnail: string;
  description: string;
  date: string;
}

/**
 * Direct Google Sheet CSV Export URL.
 * Configurable via NEXT_PUBLIC_SHEET_CSV_URL.
 */
export const GOOGLE_SHEET_CSV_URL =
  process.env.NEXT_PUBLIC_SHEET_CSV_URL ||
  "https://docs.google.com/spreadsheets/d/1gQ3m41KXpKoj394DG0jab5k86Mqjd8hOSlZsBbm_KWo/export?format=csv";

// Fallback seed data used if the Google Sheet link requires sign-in or is temporarily unavailable
const FALLBACK_DRAMAS: DramaItem[] = [
  {
    id: 1,
    title: "Atish — Episode 1",
    slug: "atish-episode-1",
    category: "Pakistani Drama",
    youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    thumbnail: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=600&auto=format&fit=crop",
    description: "Watch Atish Episode 1 in Full HD. Stream top Pakistani drama episodes online.",
    date: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Kurulus Osman — Episode 1",
    slug: "kurulus-osman-episode-1",
    category: "Turkish Drama",
    youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=600&auto=format&fit=crop",
    description: "The epic historical Turkish series continues. Watch Kurulus Osman Episode 1.",
    date: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Anupamaa — Latest Episode",
    slug: "anupamaa-latest-episode",
    category: "Indian Drama",
    youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop",
    description: "Watch the latest high-voltage drama unfold in Anupamaa.",
    date: new Date().toISOString(),
  },
  {
    id: 4,
    title: "Queen of Tears — Episode 1",
    slug: "queen-of-tears-episode-1",
    category: "Korean Drama",
    youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    thumbnail: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=600&auto=format&fit=crop",
    description: "Experience the heartwarming romance and challenges in Queen of Tears.",
    date: new Date().toISOString(),
  },
];

/**
 * Extracts a YouTube video ID from standard YouTube URLs, short URLs, or embed links.
 */
export function extractYouTubeId(url: string): string {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i,
  );
  if (match) return match[1];
  if (/^[\w-]{11}$/.test(url.trim())) return url.trim();
  return "";
}

/**
 * Builds a responsive YouTube iframe video player.
 */
export function getYouTubeEmbed(urlOrId: string): string {
  const id = extractYouTubeId(urlOrId);
  if (!id) return "";
  return `<iframe width="100%" height="480" src="https://www.youtube.com/embed/${id}?autoplay=0&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="border-radius:12px; width:100%; aspect-ratio:16/9; max-height: 560px;"></iframe>`;
}

/**
 * Robust CSV parser supporting quoted strings with commas and linebreaks.
 */
function parseCSV(text: string): Record<string, string>[] {
  const lines: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      currentRow.push(currentField.trim());
      currentField = "";
    } else if ((char === "\r" || char === "\n") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") i++;
      currentRow.push(currentField.trim());
      if (currentRow.some((f) => f.length > 0)) {
        lines.push(currentRow);
      }
      currentRow = [];
      currentField = "";
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((f) => f.length > 0)) {
      lines.push(currentRow);
    }
  }

  if (lines.length < 2) return [];

  // Normalize headers (lowercase and alpha-numeric only: id, title, slug, category, youtubeurl, thumbnail, description)
  const headers = lines[0].map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ""));
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i];
    if (row.length === 0 || !row.some((c) => c.length > 0)) continue;

    const rowData: Record<string, string> = {};
    row.forEach((val, idx) => {
      const header = headers[idx];
      if (header) {
        rowData[header] = val;
      }
    });

    if (rowData.title || rowData.id || rowData.youtubeurl) {
      rows.push(rowData);
    }
  }

  return rows;
}

/**
 * Maps a drama record into WordPressPost structure for frontend compatibility.
 */
function mapDramaToPost(item: DramaItem): WordPressPost {
  const videoId = extractYouTubeId(item.youtubeUrl);
  const posterUrl =
    item.thumbnail ||
    (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "");

  const embedHtml = item.youtubeUrl ? getYouTubeEmbed(item.youtubeUrl) : "";
  const contentHtml = embedHtml
    ? `${embedHtml}<div style="margin-top: 16px; font-size: 15px; color: #475569; line-height: 1.6;">${item.description}</div>`
    : `<p>${item.description}</p>`;

  const categorySlug = (item.category || "General")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return {
    id: item.id,
    date: item.date || new Date().toISOString(),
    slug: item.slug || (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : String(item.id)),
    title: {
      rendered: item.title,
    },
    content: {
      rendered: contentHtml,
    },
    excerpt: {
      rendered: item.description,
    },
    category: item.category,
    youtubeUrl: item.youtubeUrl,
    categories: [item.id],
    _embedded: {
      "wp:featuredmedia": posterUrl ? [{ source_url: posterUrl }] : [],
      "wp:term": [
        [
          {
            id: item.id,
            name: item.category || "Drama",
            slug: categorySlug,
            taxonomy: "category",
          },
        ],
      ],
    },
  };
}

/**
 * Fetches and parses all drama items directly from the Google Sheet CSV.
 */
export async function fetchGoogleSheetDramas(): Promise<DramaItem[]> {
  try {
    const url = GOOGLE_SHEET_CSV_URL;
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`[Google Sheet] Failed to fetch CSV from ${url}. HTTP status: ${res.status}`);
      return FALLBACK_DRAMAS;
    }

    const text = await res.text();

    // Check if Google returned an HTML login/cookie consent page (meaning sheet is restricted)
    if (text.includes("<!DOCTYPE html") || text.includes("<html") || text.includes("Sign in - Google Accounts")) {
      console.warn(
        "[Google Sheet] Google Sheet returned HTML instead of CSV. Ensure Google Sheet sharing is set to 'Anyone with the link can view' (or Publish to Web as CSV). Using fallback dramas."
      );
      return FALLBACK_DRAMAS;
    }

    const rows = parseCSV(text);
    if (rows.length === 0) {
      console.warn("[Google Sheet] No data rows parsed from Google Sheet CSV. Using fallback dramas.");
      return FALLBACK_DRAMAS;
    }

    return rows.map((r, index) => {
      const idNum = parseInt(r.id || "", 10);
      return {
        id: !Number.isNaN(idNum) && idNum > 0 ? idNum : index + 1,
        title: r.title || `Episode ${index + 1}`,
        slug: r.slug || (r.title ? r.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : `episode-${index + 1}`),
        category: r.category || "Pakistani Drama",
        youtubeUrl: r.youtubeurl || r.youtube || r.url || r.link || "",
        thumbnail: r.thumbnail || r.image || r.poster || "",
        description: r.description || r.desc || r.synopsis || "",
        date: r.date || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error("[Google Sheet] Error fetching or parsing Google Sheet CSV:", error);
    return FALLBACK_DRAMAS;
  }
}

/**
 * Returns all drama posts mapped to WordPressPost format.
 */
export async function getPosts(): Promise<WordPressPost[]> {
  const dramas = await fetchGoogleSheetDramas();
  return dramas.map(mapDramaToPost);
}

export const getEpisodes = getPosts;

/**
 * Normalizes a category string or slug for strict, case-insensitive comparison.
 * Removes '-drama' suffix, ' drama' suffix, spaces, and special characters.
 * E.g., 'Pakistani Drama', 'pakistani-drama', 'Pakistani' all normalize to 'pakistani'.
 */
export function normalizeCategoryKey(cat: string): string {
  if (!cat) return "";
  return cat
    .toLowerCase()
    .trim()
    .replace(/-drama$/, "")
    .replace(/\s+drama$/, "")
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Strictly filters dramas where the row's category matches the requested slug.
 * Does NOT fall back to general posts when there are 0 matches, ensuring categories never mix up.
 */
export async function getCategoryPosts(categorySlug: string): Promise<WordPressPost[]> {
  const dramas = await fetchGoogleSheetDramas();
  const targetKey = normalizeCategoryKey(categorySlug);

  if (!targetKey) return [];

  const filtered = dramas.filter((d) => {
    const dramaKey = normalizeCategoryKey(d.category || "");
    return dramaKey === targetKey;
  });

  return filtered.map(mapDramaToPost);
}

// Aliases for compatibility
export const getPostsByCategory = getCategoryPosts;
export const getCategoryEpisodes = getCategoryPosts;

/**
 * Fetches an individual drama post by ID or by slug.
 */
export async function getPostById(idOrSlug: string | number): Promise<WordPressPost | null> {
  const dramas = await fetchGoogleSheetDramas();
  const target = String(idOrSlug).trim().toLowerCase();

  const found = dramas.find((d) => {
    return String(d.id) === target || d.slug.toLowerCase() === target;
  });

  if (found) {
    return mapDramaToPost(found);
  }

  // Fallback to first drama if ID not matched
  return dramas.length > 0 ? mapDramaToPost(dramas[0]) : null;
}

export const getSinglePost = getPostById;
export const getSingleEpisode = getPostById;

/**
 * Returns unique categories found in the Google Sheet.
 */
export async function getCategories(): Promise<WordPressCategory[]> {
  const dramas = await fetchGoogleSheetDramas();
  const categoryMap = new Map<string, number>();

  dramas.forEach((d) => {
    const cat = d.category || "General";
    categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
  });

  const categories: WordPressCategory[] = [];
  let idCounter = 1;

  categoryMap.forEach((count, name) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    categories.push({
      id: idCounter++,
      count,
      description: `${name} episodes`,
      link: `/category/${slug}`,
      name,
      slug,
      taxonomy: "category",
      parent: 0,
    });
  });

  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<WordPressCategory | null> {
  const categories = await getCategories();
  const normalized = slug.toLowerCase().replace(/-drama$/, "");
  return (
    categories.find(
      (c) =>
        c.slug.toLowerCase() === slug.toLowerCase() ||
        c.slug.toLowerCase().includes(normalized) ||
        c.name.toLowerCase().includes(normalized),
    ) || null
  );
}

export interface DramaSeries {
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  thumbnail: string;
  description: string;
  episodeCount: number;
  episodes: WordPressPost[];
}

/**
 * Extracts a series title from an episode title string.
 * Examples:
 * "Atish — Episode 1" -> "Atish"
 * "Kurulus Osman — Episode 1" -> "Kurulus Osman"
 * "Anupamaa — Latest Episode" -> "Anupamaa"
 * "Tere Bin - Ep 5" -> "Tere Bin"
 * "Queen of Tears — Episode 1" -> "Queen of Tears"
 */
export function extractSeriesName(rawTitle: string): string {
  if (!rawTitle) return "Drama";
  let clean = rawTitle.trim();
  clean = clean.replace(/<[^>]*>?/gm, "").replace(/&mdash;|&ndash;|&#8212;|&#8211;/g, "—");

  // Check for common separators followed by episode/season/part/number
  const splitMatch = clean.split(/\s*(?:—|–|-|\||:)\s*(?:episode|ep|season|latest|part|\d)/i);
  if (splitMatch.length > 1 && splitMatch[0].trim().length > 0) {
    return splitMatch[0].trim();
  }

  // Check pattern "Series Name Episode 1"
  const epMatch = clean.match(/^(.*?)\s+(?:episode|ep\.?|season|part)\s*\d+/i);
  if (epMatch && epMatch[1].trim().length > 0) {
    return epMatch[1].trim();
  }

  // Check separator alone if title is "Drama Name - Subtitle"
  const dashSplit = clean.split(/\s*(?:—|–|-|\|)\s*/);
  if (dashSplit.length > 1 && dashSplit[0].trim().length > 0) {
    return dashSplit[0].trim();
  }

  return clean;
}

export function extractSeriesSlug(rawTitle: string): string {
  const name = extractSeriesName(rawTitle);
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "drama"
  );
}

/**
 * Groups all posts into unique drama series.
 */
export async function getAllSeries(): Promise<DramaSeries[]> {
  const posts = await getPosts();
  const seriesMap = new Map<string, DramaSeries>();

  for (const post of posts) {
    const rawTitle = post.title?.rendered || "";
    const seriesTitle = extractSeriesName(rawTitle);
    const seriesSlug = extractSeriesSlug(rawTitle);

    const catName = post.category || "General";
    const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const thumb =
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      (post.youtubeUrl ? `https://img.youtube.com/vi/${extractYouTubeId(post.youtubeUrl)}/hqdefault.jpg` : "");
    const desc = post.excerpt?.rendered?.replace(/<[^>]*>?/gm, "") || "";

    if (!seriesMap.has(seriesSlug)) {
      seriesMap.set(seriesSlug, {
        title: seriesTitle,
        slug: seriesSlug,
        category: catName,
        categorySlug: catSlug,
        thumbnail: thumb,
        description: desc,
        episodeCount: 1,
        episodes: [post],
      });
    } else {
      const existing = seriesMap.get(seriesSlug)!;
      existing.episodeCount += 1;
      existing.episodes.push(post);
      if (!existing.thumbnail && thumb) {
        existing.thumbnail = thumb;
      }
      if (!existing.description && desc) {
        existing.description = desc;
      }
    }
  }

  return Array.from(seriesMap.values());
}

/**
 * Returns drama series filtered by category slug.
 */
export async function getSeriesByCategory(categorySlug: string): Promise<DramaSeries[]> {
  const all = await getAllSeries();
  const targetKey = normalizeCategoryKey(categorySlug);
  if (!targetKey) return all;

  return all.filter((s) => {
    return normalizeCategoryKey(s.category) === targetKey || normalizeCategoryKey(s.categorySlug) === targetKey;
  });
}

/**
 * Fetches a single drama series by its slug.
 */
export async function getSeriesBySlug(seriesSlug: string): Promise<DramaSeries | null> {
  const all = await getAllSeries();
  const target = seriesSlug.trim().toLowerCase();

  const found = all.find(
    (s) => s.slug.toLowerCase() === target || s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === target
  );

  return found || null;
}

export interface CategoryDropdownItem {
  name: string;
  slug: string;
  dramas: Array<{
    title: string;
    slug: string;
    episodeCount: number;
    thumbnail: string;
  }>;
}

/**
 * Returns grouped data for header category dropdowns.
 */
export async function getCategoryDropdownData(): Promise<Record<string, CategoryDropdownItem>> {
  const seriesList = await getAllSeries();

  const knownCategories: Array<{ key: string; name: string; slug: string }> = [
    { key: "pakistani", name: "Pakistani Drama", slug: "pakistani-drama" },
    { key: "turkish", name: "Turkish Drama", slug: "turkish-drama" },
    { key: "indian", name: "Indian Drama", slug: "indian-drama" },
    { key: "korean", name: "Korean Drama", slug: "korean-drama" },
  ];

  const result: Record<string, CategoryDropdownItem> = {};

  for (const cat of knownCategories) {
    const matching = seriesList.filter(
      (s) => normalizeCategoryKey(s.category) === cat.key || normalizeCategoryKey(s.categorySlug) === cat.key
    );

    result[cat.slug] = {
      name: cat.name,
      slug: cat.slug,
      dramas: matching.map((m) => ({
        title: m.title,
        slug: m.slug,
        episodeCount: m.episodeCount,
        thumbnail: m.thumbnail,
      })),
    };
  }

  return result;
}

