import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { reactQueryKeys } from '@/constants/react-query-keys';
import { DeletePanelProps, panelsService } from '@/services/panels';
import { ApiError } from '@/services/types';

export const useDeletePanelMutation = (
  props?: UseMutationOptions<AxiosResponse<void>, ApiError, DeletePanelProps>,
) =>
  useMutation({
    mutationKey: [reactQueryKeys.mutations.deletePanelMutation],
    mutationFn: panelsService.delete,
    ...props,
  });
