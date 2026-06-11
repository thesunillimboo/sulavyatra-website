import type { WordPressPost } from "../types/wordpress";
import { WORDPRESS_URL } from "./config";

const WORDPRESS_API = `${WORDPRESS_URL}/wp-json/wp/v2`;

export async function getLatestPosts(limit = 4): Promise<WordPressPost[]> {
  const response = await fetch(
    `${WORDPRESS_API}/posts?per_page=${limit}&orderby=date&order=desc&_embed`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch latest WordPress posts");
  }

  return response.json();
}

export async function getRelatedPosts(
  categorySlug: string,
  currentSlug: string,
  limit = 3,
): Promise<WordPressPost[]> {
  const posts = await getPostsByCategorySlug(categorySlug, limit + 4);

  return posts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}

export async function getAllPosts(limit = 100): Promise<WordPressPost[]> {
  const response = await fetch(
    `${WORDPRESS_API}/posts?per_page=${limit}&orderby=date&order=desc&_embed`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch all WordPress posts");
  }

  return response.json();
}

export async function getPostBySlug(
  slug: string,
): Promise<WordPressPost | null> {
  const response = await fetch(`${WORDPRESS_API}/posts?slug=${slug}&_embed`);

  if (!response.ok) {
    throw new Error(`Failed to fetch WordPress post: ${slug}`);
  }

  const posts: WordPressPost[] = await response.json();

  return posts[0] || null;
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&hellip;/g, "...")
    .replace(/&#8230;/g, "...")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateText(text: string, length = 140): string {
  if (text.length <= length) return text;

  return text.substring(0, length).trim() + "...";
}

export function getFeaturedImage(post: WordPressPost): string | undefined {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];

  return (
    media?.media_details?.sizes?.large?.source_url ||
    media?.media_details?.sizes?.medium?.source_url ||
    media?.source_url
  );
}

export function getPrimaryCategory(post: WordPressPost): string {
  const category = post._embedded?.["wp:term"]?.[0]?.[0];

  return category?.name || "Travel Guide";
}

export async function getCategoryBySlug(slug: string) {
  const response = await fetch(`${WORDPRESS_API}/categories?slug=${slug}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch category: ${slug}`);
  }

  const categories = await response.json();

  return categories[0];
}

export async function getPostsByCategorySlug(
  slug: string,
  limit = 3,
): Promise<WordPressPost[]> {
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return [];
  }

  const response = await fetch(
    `${WORDPRESS_API}/posts?categories=${category.id}&per_page=${limit}&orderby=date&order=desc&_embed`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch posts for category: ${slug}`);
  }

  return response.json();
}
