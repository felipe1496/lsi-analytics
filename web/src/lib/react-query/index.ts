import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiError } from '@/services/types';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<ApiError>;
  }
}

export const queryClient = new QueryClient();
