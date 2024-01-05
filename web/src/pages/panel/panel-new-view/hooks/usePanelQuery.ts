import { useQuery } from '@tanstack/react-query';

import { reactQueryKeys } from '@/constants/react-query-keys';
import { panelsService } from '@/services/panels';

interface UsePanelQueryProps {
  id?: string;
}

export const usePanelQuery = ({ id }: UsePanelQueryProps) =>
  useQuery({
    queryKey: [reactQueryKeys.queries.findPanelQuery, id],
    queryFn: () => {
      if (id) {
        return panelsService.find({ path: { id } });
      }

      return null;
    },
  });
