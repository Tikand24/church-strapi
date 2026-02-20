export interface DailyInspirationStrapi {
  id: number;
  documentId: string;
  quote: string;
  source: string;
  saintName: string;
  saintDate: string;
  isActive: boolean | null;
  displayDate: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface DailyInspirationStrapiResponse {
  data: DailyInspirationStrapi[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
