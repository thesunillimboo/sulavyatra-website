export interface WordPressRenderedField {
  rendered: string;
}

export interface WordPressMediaSize {
  source_url: string;
  width: number;
  height: number;
}

export interface WordPressFeaturedMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    sizes?: {
      medium?: WordPressMediaSize;
      large?: WordPressMediaSize;
      full?: WordPressMediaSize;
    };
  };
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WordPressAuthor {
  id: number;
  name: string;
  slug: string;
  link: string;
  description?: string;
  avatar_urls?: {
    "24"?: string;
    "48"?: string;
    "96"?: string;
  };
}

export interface WordPressPost {
  id: number;
  slug: string;
  date: string;
  link: string;
  featured_media: number;
  categories: number[];

  title: WordPressRenderedField;
  excerpt: WordPressRenderedField;
  content: WordPressRenderedField;

  _embedded?: {
    "wp:featuredmedia"?: WordPressFeaturedMedia[];
    "wp:term"?: WordPressCategory[][];
    author?: WordPressAuthor[];
  };
}
