import { useQuery } from '@tanstack/react-query';

import { reactQueryKeys } from '@/constants/react-query-keys';
import { panelsService } from '@/services/panels';

export const usePanelsQuery = () =>
  useQuery({
    queryKey: [reactQueryKeys.queries.findAllPanelsQuery],
    queryFn: panelsService.findAll,
  });
