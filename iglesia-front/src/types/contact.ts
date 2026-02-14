import type { Link, Media, PublicAtentionProps } from './common';

// ==========================================
// Strapi API Response Types
// ==========================================

/** Map contact info block from Strapi (contact.map-contact-info) */
export interface MapContactInfoBlock {
  __component: 'contact.map-contact-info';
  title: string;
  embedUrl: string;
  address: string;
  directionsLink: Link;
}

/** Contact info block from Strapi (contact.contact-info) */
export interface ContactInfoBlock {
  __component: 'contact.contact-info';
  title: string;
  subtitle: string;
  description: string;
  infoLinks: Link[];
  socialLinks: Link[];
}

/** Single slide in the community slider */
export interface CommunitySlide {
  id: number;
  title: string;
  subtile: string; // Note: typo in Strapi API (should be "subtitle")
  description: string;
  media: Media;
}

/** Slider community block from Strapi (contact.slider-comunity) */
export interface SliderCommunityBlock {
  __component: 'contact.slider-comunity';
  slides: CommunitySlide[];
}

/** Office hours / public attention block from Strapi (hero.public-atention) */
export interface OfficeHoursBlock extends PublicAtentionProps {
  __component: 'hero.public-atention';
}

// ==========================================
// Contact Form Types (Strapi-backed)
// ==========================================

/** Subject item from Strapi repeatable component */
export interface ContactFormSubject {
  id: number;
  value: string;
}

/** Contact form block from Strapi (contact.contact-form) */
export interface ContactFormBlock {
  __component: 'contact.contact-form';
  title: string;
  description: string;
  subjectList: ContactFormSubject[];
}

/** Request payload for POST /api/contact-requests */
export interface ContactRequestPayload {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

/** Union type for all possible contact page blocks */
export type ContactPageBlock =
  | MapContactInfoBlock
  | ContactInfoBlock
  | SliderCommunityBlock
  | OfficeHoursBlock
  | ContactFormBlock;

/** Full contact page response from Strapi API */
export interface ContactPageResponse {
  blocks: ContactPageBlock[];
}

// ==========================================
// Component Props Types
// ==========================================

export interface MapCardProps {
  title: string;
  embedUrl: string;
  address: string;
  directionsLink: Link;
}

export interface ContactInfoCardProps {
  title: string;
  subtitle: string;
  description: string;
  infoLinks: Link[];
  socialLinks: Link[];
}

export interface OfficeHoursCardProps {
  title: string;
  subtitle: string;
  description: string;
  scheduleItems: Array<{
    description?: string;
    timeRanges: Array<{
      start?: string;
      end?: string;
    }>;
  }>;
}

export interface CommunityCarouselProps {
  slides: CommunitySlide[];
}

// ==========================================
// Contact Form Component Props
// ==========================================

export interface ContactFormCardProps {
  title: string;
  description: string;
  subjects: ContactFormSubject[];
}
