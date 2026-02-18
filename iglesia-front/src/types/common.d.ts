import type { ScheduleRangeItem } from "./schedule";

export interface Seo {
  metaTitle: string;
  metaDescription: string;
}

export interface Link {
  text: string;
  link?: string;
  redirectOutside?: boolean;
  icon?: Media;
  iconSvg?: string;
}
export interface Media {
  url: string;
  alternativeText: string;
}
export interface PublicAtentionProps{
  title: string;
  Subtitle: string;
  description: string;
  image: Array<Media>;
  enlace: Link;
  ScheduleRangeItem: Array<ScheduleRangeItem>;
}