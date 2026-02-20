/**
 * Calendar page types
 */

/** Individual mass time item */
export interface CalendarMassItem {
  id: number;
  time: string; // Format: "HH:MM:SS.mmm"
  description: string;
  Icon?: string | null;
}

/** Schedule tab grouping (e.g., "Lunes a Viernes", "Sabado", "Domingo") */
export interface CalendarScheduleTab {
  id: number;
  Title: string;
  Item: CalendarMassItem[];
}

/** Full schedule data structure */
export interface CalendarScheduleData {
  ScheduleTab: CalendarScheduleTab[];
}

/** Configuration for a single day in the week grid */
export interface CalendarDayConfig {
  dayIndex: number; // 0=Domingo, 1=Lunes...6=Sábado (JS getDay() format)
  shortName: string; // "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"
  fullName: string; // "Lunes", "Martes", etc.
  specialLabel?: string; // e.g., "S. Nicolás", "Inmaculada Concepción"
  isLordDay?: boolean; // true for Sunday → shows "DÍA DEL SEÑOR" badge
}

/** Liturgical color information for sidebar widget */
export interface LiturgicalColorInfo {
  colorName: string; // "Morado", "Blanco", "Verde", "Rojo"
  season: string; // "Tiempo de Adviento", "Solemnidades", etc.
  hex: string; // e.g., "#800080"
}

/** Info card data for bottom section */
export interface CalendarInfoCard {
  icon: string; // SVG string
  title: string;
  description: string;
  variant: 'default' | 'highlight';
}

/** Props for DayCard component */
export interface DayCardProps {
  dayConfig: CalendarDayConfig;
  dayNumber: number;
  month: number;
  masses: CalendarMassItem[];
  isToday?: boolean;
}

/** Props for NextMassBanner component */
export interface NextMassBannerProps {
  scheduleTabs: CalendarScheduleTab[];
}

/** Props for WeekCalendar component */
export interface WeekCalendarProps {
  scheduleTabs: CalendarScheduleTab[];
}
