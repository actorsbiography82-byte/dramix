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
  tags?: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
    "wp:term"?: Array<Array<WordPressTerm>>;
  };
}

// Backwards-compatibility alias
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

export const WP_BASE_URL =
  process.env.NEXT_PUBLIC_PANTHEON_WP_URL ||
  process.env.PANTHEON_WP_URL ||
  "https://api.dramix.dpdns.org";

const DEFAULT_FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) DramixClient/1.0",
  Accept: "application/json",
};

/**
 * Fetches standard WordPress posts with embedded media and terms.
 * Uses Next.js ISR with revalidate: 60 to prevent dynamic server usage errors on Vercel.
 */
export async function getPosts(options: {
  category?: number | string;
  perPage?: number;
  page?: number;
  search?: string;
} = {}): Promise<WordPressPost[]> {
  try {
    const baseUrl = WP_BASE_URL.replace(/\/$/, "");
    const params = new URLSearchParams();
    params.set("_embed", "true");
    params.set("per_page", String(options.perPage ?? 20));

    if (options.page) params.set("page", String(options.page));
    if (options.category) params.set("categories", String(options.category));
    if (options.search) params.set("search", options.search);

    const url = `${baseUrl}/wp-json/wp/v2/posts?${params.toString()}`;

    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: DEFAULT_FETCH_HEADERS,
    });

    if (!res.ok) {
      console.warn(`[WordPress API] Failed to fetch posts from ${url}. Status: ${res.status}`);
      return [];
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.warn(`[WordPress API] Expected JSON from ${url} but got '${contentType}'`);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("[WordPress API] Error fetching posts:", error);
    return [];
  }
}

// Backwards-compatible alias for getEpisodes
export const getEpisodes = getPosts;

/**
 * Fetches a single post by ID from /wp-json/wp/v2/posts/{id}?_embed.
 * Uses ISR revalidate: 60 (avoids cache: 'no-store' or revalidate: 0 dynamic server errors).
 */
export async function getSinglePost(id: string | number): Promise<WordPressPost | null> {
  try {
    const baseUrl = WP_BASE_URL.replace(/\/$/, "");
    const url = `${baseUrl}/wp-json/wp/v2/posts/${id}?_embed`;

    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: DEFAULT_FETCH_HEADERS,
    });

    if (!res.ok) {
      console.warn(`[WordPress API] Failed to fetch post ${id}. Status: ${res.status}`);
      return null;
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`[WordPress API] Error fetching post ${id}:`, error);
    return null;
  }
}

// Backwards-compatible alias
export const getSingleEpisode = getSinglePost;

/**
 * Fetches categories from WordPress.
 */
export async function getCategories(): Promise<WordPressCategory[]> {
  try {
    const baseUrl = WP_BASE_URL.replace(/\/$/, "");
    const url = `${baseUrl}/wp-json/wp/v2/categories?per_page=100`;

    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: DEFAULT_FETCH_HEADERS,
    });

    if (!res.ok) return [];
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("[WordPress API] Error fetching categories:", error);
    return [];
  }
}

/**
 * Finds a category by slug or name (supports variants like "pakistani-drama" matching "pakistani" or "pakistani-drama").
 */
export async function getCategoryBySlug(slug: string): Promise<WordPressCategory | null> {
  try {
    const baseUrl = WP_BASE_URL.replace(/\/$/, "");
    // Try direct query first
    const directRes = await fetch(`${baseUrl}/wp-json/wp/v2/categories?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
      headers: DEFAULT_FETCH_HEADERS,
    });

    if (directRes.ok) {
      const contentType = directRes.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const categories = await directRes.json();
        if (Array.isArray(categories) && categories.length > 0) {
          return categories[0];
        }
      }
    }

    // Fallback: match against all categories
    const allCategories = await getCategories();
    const cleanSlug = slug.toLowerCase().replace(/-drama$/, "");
    return (
      allCategories.find(
        (c) =>
          c.slug.toLowerCase() === slug.toLowerCase() ||
          c.slug.toLowerCase() === cleanSlug ||
          c.name.toLowerCase().includes(cleanSlug),
      ) || null
    );
  } catch (error) {
    console.error(`[WordPress API] Error finding category for '${slug}':`, error);
    return null;
  }
}

/**
 * Fetches posts for a specific category slug.
 */
export async function getCategoryPosts(categorySlug: string): Promise<WordPressPost[]> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) {
    // If no direct category match, attempt fallback search with general posts
    return getPosts({ search: categorySlug.replace(/-/g, " ") });
  }
  return getPosts({ category: category.id });
}

export const getCategoryEpisodes = getCategoryPosts;
