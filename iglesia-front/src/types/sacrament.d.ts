import type { Media, Seo } from "./common";

export interface Requirement {
  id: number;
  title: string;
}

export interface MoreInfoLink {
  id: number;
  text: string;
  link: string;
  redirectOutside: boolean;
  iconSvg: string | null;
}

export interface MoreInfoBlock {
  __component: 'more-info.more-info';
  id: number;
  title: string;
  description: string;
  linkContact: MoreInfoLink[];
}

export interface Sacrament {
  id: number;
  name: string;
  description: string;
  image: Media;
  iconName: string;
  requirements: Requirement[];
}

export interface SacramentPage {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  sacramentList: Sacrament[];
  blocks: MoreInfoBlock[];
  Seo?: Seo;
}
