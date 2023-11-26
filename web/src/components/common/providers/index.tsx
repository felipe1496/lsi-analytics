import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import { queryClient } from '@/lib/react-query';

import 'react-toastify/dist/ReactToastify.css';
import { TooltipProvider } from '../ui/tooltip';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {children}
      <ToastContainer />
    </TooltipProvider>
  </QueryClientProvider>
);
