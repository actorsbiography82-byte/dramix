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

/**
 * Base URL for the WordPress REST API.
 * Configurable via NEXT_PUBLIC_WORDPRESS_URL or NEXT_PUBLIC_PANTHEON_WP_URL.
 * Default points to the official working ByetHost URL at https://zeeshanws.byethost7.com.
 */
export const WP_BASE_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  process.env.NEXT_PUBLIC_PANTHEON_WP_URL ||
  process.env.WORDPRESS_URL ||
  process.env.PANTHEON_WP_URL ||
  "https://zeeshanws.byethost7.com";

const DEFAULT_FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) DramixClient/1.0",
  Accept: "application/json",
};

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
 * Known categories with verified numeric IDs on the WordPress backend.
 * "Pakistani Drama" is confirmed to have ID 2 on the ByetHost WordPress backend.
 */
const KNOWN_CATEGORY_MAP: Record<string, number> = {
  "pakistani-drama": 2,
  "pakistani": 2,
};

/**
 * Finds a category object by slug from `/wp/v2/categories?slug=...` to get its numeric ID.
 * Supports known category map, exact slug matching, and fallback variants (e.g. 'pakistani-drama' matching 'pakistani').
 */
export async function getCategoryBySlug(slug: string): Promise<WordPressCategory | null> {
  const normalizedSlug = slug.trim().toLowerCase();

  // Fast-path: Check verified static category map
  if (KNOWN_CATEGORY_MAP[normalizedSlug]) {
    return {
      id: KNOWN_CATEGORY_MAP[normalizedSlug],
      count: 0,
      description: "",
      link: "",
      name: normalizedSlug.replace(/-/g, " "),
      slug: normalizedSlug,
      taxonomy: "category",
      parent: 0,
    };
  }

  try {
    const baseUrl = WP_BASE_URL.replace(/\/$/, "");
    const encodedSlug = encodeURIComponent(normalizedSlug);

    // 1. Direct query by exact slug
    const directRes = await fetch(`${baseUrl}/wp-json/wp/v2/categories?slug=${encodedSlug}`, {
      next: { revalidate: 60 },
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

    // 2. Fallback: if slug has '-drama' suffix (e.g. 'pakistani-drama'), query clean slug ('pakistani')
    if (normalizedSlug.endsWith("-drama")) {
      const cleanSlug = normalizedSlug.replace(/-drama$/, "");
      const altRes = await fetch(`${baseUrl}/wp-json/wp/v2/categories?slug=${encodeURIComponent(cleanSlug)}`, {
        next: { revalidate: 60 },
        headers: DEFAULT_FETCH_HEADERS,
      });

      if (altRes.ok) {
        const contentType = altRes.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const categories = await altRes.json();
          if (Array.isArray(categories) && categories.length > 0) {
            return categories[0];
          }
        }
      }
    }

    // 3. Fallback: search all categories by slug or name
    const allCategories = await getCategories();
    const clean = normalizedSlug.replace(/-drama$/, "");
    return (
      allCategories.find(
        (c) =>
          c.slug.toLowerCase() === normalizedSlug ||
          c.slug.toLowerCase() === clean ||
          c.name.toLowerCase() === normalizedSlug ||
          c.name.toLowerCase().includes(clean),
      ) || null
    );
  } catch (error) {
    console.error(`[WordPress API] Error finding category for '${slug}':`, error);
    return null;
  }
}

/**
 * Fetches standard WordPress posts with embedded media and terms from `/wp/v2/posts`.
 * If a category slug string is passed, it automatically resolves it to a numeric ID first.
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
    if (options.search) params.set("search", options.search);

    // Resolve category to numeric ID if provided
    if (options.category !== undefined && options.category !== null && options.category !== "") {
      if (typeof options.category === "number") {
        params.set("categories", String(options.category));
      } else if (/^\d+$/.test(options.category)) {
        params.set("categories", options.category);
      } else {
        // String slug provided (e.g. 'pakistani-drama' or 'atish') -> resolve to numeric ID
        const categoryObj = await getCategoryBySlug(options.category);
        if (categoryObj && categoryObj.id) {
          params.set("categories", String(categoryObj.id));
        } else {
          console.warn(`[WordPress API] Could not resolve category slug '${options.category}' to a numeric ID`);
          return [];
        }
      }
    }

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
 * Fetches posts for a specific category slug:
 * 1. If categorySlug is 'pakistani-drama', queries posts directly with ?categories=2&_embed=true.
 * 2. For other categories, queries /wp/v2/categories?slug=... to resolve the numeric category ID.
 * 3. Queries /wp/v2/posts?categories=<id>&_embed=true.
 * 4. Robust fallback: If category filtering returns 0 posts (e.g. ByetHost query param handling or initial indexing),
 *    automatically falls back to standard getPosts() so published posts (like Atish Episode 1) are never hidden.
 */
export async function getCategoryPosts(categorySlug: string): Promise<WordPressPost[]> {
  const normalizedSlug = categorySlug.trim().toLowerCase();

  try {
    let categoryId: number | null = KNOWN_CATEGORY_MAP[normalizedSlug] ?? null;

    // Resolve slug to numeric ID via API if not in known static map
    if (!categoryId) {
      const category = await getCategoryBySlug(normalizedSlug);
      if (category && category.id) {
        categoryId = category.id;
      }
    }

    let posts: WordPressPost[] = [];

    if (categoryId) {
      // Query posts using the numeric category ID (/wp/v2/posts?categories=<id>&_embed=true)
      posts = await getPosts({ category: categoryId });
    } else {
      console.warn(
        `[WordPress API] Category resolution could not find numeric ID for '${categorySlug}'. ` +
        `Proceeding to general posts fallback.`
      );
    }

    // Robust Fallback: If filtered query returns 0 posts (common on ByetHost / free hosting query param issues)
    if (posts.length === 0) {
      console.warn(
        `[WordPress API] Category query for '${categorySlug}' returned 0 posts. ` +
        `Applying automatic fallback to general getPosts() so published dramas remain visible.`
      );

      const allPosts = await getPosts();

      if (allPosts.length > 0) {
        // Try filtering in-memory by embedded category ID or category name/slug if available
        const inMemoryMatches = allPosts.filter((post) => {
          if (categoryId && post.categories?.includes(categoryId)) {
            return true;
          }
          const terms = post._embedded?.["wp:term"]?.flat() ?? [];
          return terms.some((term) => {
            const termName = term.name.toLowerCase();
            const termSlug = term.slug.toLowerCase();
            return (
              termSlug === normalizedSlug ||
              termName.includes(normalizedSlug.replace(/-drama$/, "")) ||
              normalizedSlug.includes(termSlug)
            );
          });
        });

        // If in-memory matched posts exist, return them; otherwise, return all general posts
        return inMemoryMatches.length > 0 ? inMemoryMatches : allPosts;
      }
    }

    return posts;
  } catch (error) {
    console.error(`[WordPress API] Error in getCategoryPosts for '${categorySlug}':`, error);
    // On unexpected error, attempt safe fallback to general posts
    try {
      return await getPosts();
    } catch {
      return [];
    }
  }
}

// Backwards-compatible alias
export const getCategoryEpisodes = getCategoryPosts;

/**
 * Fetches a single post by ID from /wp-json/wp/v2/posts/{id}?_embed=true.
 * Uses ISR revalidate: 60 (avoids cache: 'no-store' or revalidate: 0 dynamic server errors).
 */
export async function getPostById(id: string | number): Promise<WordPressPost | null> {
  try {
    const baseUrl = WP_BASE_URL.replace(/\/$/, "");
    const url = `${baseUrl}/wp-json/wp/v2/posts/${id}?_embed=true`;

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

// Aliases for backwards compatibility
export const getSinglePost = getPostById;
export const getSingleEpisode = getPostById;
