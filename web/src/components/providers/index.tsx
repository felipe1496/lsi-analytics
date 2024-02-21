import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

import { queryClient } from '@/lib/react-query';

import { TooltipProvider } from '../ui/tooltip';
import 'react-toastify/dist/ReactToastify.css';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <ToastContainer />
      </TooltipProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </HelmetProvider>
);
