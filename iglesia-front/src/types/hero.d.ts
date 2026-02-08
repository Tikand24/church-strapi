import type { Link, Media } from "./common";
import type { ScheduleRangeItem } from "./schedule";

export interface PublicAtention{
  title: string;
  Subtitle: string;
  description: string;
  image: Array<Media>;
  enlace: Link;
  ScheduleRangeItem: Array<ScheduleRangeItem>;
}
export interface Slider{
  Title: string;
  description: string;
  image: Media;
  link?: Link;
}

export interface HeroProps{
  Title: string;
  description: string;
  link?: Link;
  image?: Media;
}