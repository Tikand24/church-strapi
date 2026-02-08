import type { Link } from "./common";

export interface ChurchInfo{
  title: string;
  description: string;
}
export interface ContactInfo{
  phone: Link;
  whatsapp: Link;
  email: string;
}
export interface Location{
  city: string;
  state: string;
  mapUrl?: Link;
  address: string;
}
export interface FooterStrapi{
  ChurchInfo: ChurchInfo;
  ContactInfo: ContactInfo;
  Location: Location;
  SocialLink?: Array<Link>;
}