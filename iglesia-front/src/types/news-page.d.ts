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
}

export interface NewsPageResponse {
  data: NewsPage | null;
}
