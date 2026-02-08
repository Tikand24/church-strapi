import type { Link, Media } from "./common";

export interface CtaButton {
  url: Link;
  style: string;
}

export interface Logo {
  churchName: string;
  locationName: string;
  icon: Media;
}
export interface MenuItem {
  label: string;
  url: Link;
  order: number;
}
export interface NavigationStrapi {
  logo: Logo;
  menuItems: Array<MenuItem>;
  ctaButton?: CtaButton;
}