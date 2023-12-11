export type PanelModel = {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  imageURL?: string;
};

export type ViewsType = 'PIE_CHART';

export type ContentType = 'DINAMIC' | 'STATIC';

export type ViewModel = {
  name: string;
  type: ViewsType;
  contentUpdate: ContentType;
  datafontId: string;
};
