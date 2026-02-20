export interface CalendarPageLink {
  id: number;
  text: string;
  link: string;
  redirectOutside: boolean;
  iconSvg: string | null;
}

export interface CalendarInfoCardStrapi {
  id: number;
  title: string;
  description: string;
  iconSvg: string | null;
  variant: 'default' | 'highlight';
  backgroundColor: string | null;
  link: CalendarPageLink | null;
}

export interface CalendarListOfCards {
  __component: 'calendar.list-of-cards';
  id: number;
  cards: CalendarInfoCardStrapi[];
}

export interface LiturgicalColorInSchedule {
  id: number;
  documentId: string;
  name: string;
  hexCode: string;
  season: string;
  description: string | null;
  isActive: boolean;
  order: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CalendarScheduleItemStrapi {
  id: number;
  time: string;
  description: string | null;
  Icon: string | null;
}

export interface CalendarScheduleTabStrapi {
  id: number;
  Title: string;
  Item: CalendarScheduleItemStrapi[];
  liturgical_color: LiturgicalColorInSchedule | null;
}

export interface CustomSchedule {
  id: number;
  Title: string;
  description: string;
  ScheduleTab: CalendarScheduleTabStrapi[];
}

export interface CalendarScheduleReference {
  __component: 'calendar.schedule-reference';
  id: number;
  useHomeSchedule: boolean;
  customSchedule: CustomSchedule | null;
}

export interface CalendarPageStrapi {
  id: number;
  documentId: string;
  bannerTitle: string;
  bannerQuote: string;
  bannerQuoteSource: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  blocks: (CalendarListOfCards | CalendarScheduleReference)[];
}

export interface CalendarPageStrapiResponse {
  data: CalendarPageStrapi;
  meta: Record<string, unknown>;
}
