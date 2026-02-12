import type { Media } from './common';

export interface RichTextBlock {
  __component: 'shared.rich-text';
  id: number;
  body: string;
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  email: string;
  avatar?: Media | null;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}


export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  cover?: Media | null;
  author?: Author | null;
  category?: Category | null;
  blocks?: RichTextBlock[];
  isFeatured: boolean;
  publishedAt?: string;
}

export interface ArticleListResponse {
  data: Article[];
}
