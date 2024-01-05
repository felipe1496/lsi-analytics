import { APP_ROUTES } from '@/constants/app-routes';
import { View } from '@/services/models/panel/types';

export const TYPE_STUDIO_LINK_MAPPER: Record<View, string> = {
  PIE_CHART: APP_ROUTES.panel.new.studio.pie,
};
