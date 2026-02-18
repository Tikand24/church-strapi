import type { Seo } from './common';

export interface QuickLinkItem {
  id: number;
  text: string;
  link: string;
  redirectOutside: boolean;
  iconSvg?: string | null;
}

export interface NewsPage {
  id: number;
  documentId: string;
  title: string;
  quickLinks: QuickLinkItem[];
  Seo?: Seo;
}

export interface NewsPageResponse {
  data: NewsPage | null;
}
