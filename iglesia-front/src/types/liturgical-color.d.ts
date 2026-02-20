export interface LiturgicalColorStrapi {
  id: number;
  documentId: string;
  name: string;
  hexCode: string;
  season: string;
  description: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface LiturgicalColorStrapiResponse {
  data: LiturgicalColorStrapi[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
