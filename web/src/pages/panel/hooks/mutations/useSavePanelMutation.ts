import { useMutation } from '@tanstack/react-query';

import { reactQueryKeys } from '@/constants/react-query-keys';
import { panelsService } from '@/services/panels';

export const useSavePanelMutation = () =>
  useMutation({
    mutationKey: [reactQueryKeys.mutations.savePanelMutation],
    mutationFn: panelsService.update,
  });
