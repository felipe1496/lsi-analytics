import { APP_ROUTES } from '@/constants/app-routes';
import { ViewType } from '@/services/models/panel/types';

export const TYPE_STUDIO_LINK_MAPPER: Record<ViewType, string> = {
  PIECHART: APP_ROUTES.panel.new.studio.pie,
  BARCHART: APP_ROUTES.panel.new.studio.bar,
  LINECHART: APP_ROUTES.panel.new.studio.line,
  NUMBERVIEW: APP_ROUTES.panel.new.studio.number,
};
