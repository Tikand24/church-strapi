export type LiturgicalWeekday =
  | 'Lunes'
  | 'Martes'
  | 'Miercoles'
  | 'Jueves'
  | 'Viernes'
  | 'Sabado'
  | 'Domingo';

export interface RichTextNode {
  type: string;
  format?: string;
  text?: string;
  children?: RichTextNode[];
}

export interface LiturgicalEvent {
  id: number;
  documentId: string;
  title: string;
  eventType: string;
  color?: string;
  recurrence?: string;
  location?: string;
  eventDate: LiturgicalWeekday;
  description?: RichTextNode[];
}

export interface LiturgicalEventResponse {
  data: LiturgicalEvent;
}

export interface LiturgicalEventListResponse {
  data: LiturgicalEvent[];
}
