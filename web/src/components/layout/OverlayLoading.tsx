import React from 'react';

import { cn } from '@/utils';

import { Loader } from '../loader';

interface OverlayLoadingProps {
  size?: 'screen' | 'full';
}

export const OverlayLoading: React.FC<OverlayLoadingProps> = ({
  size = 'screen',
}) => (
  <div
    className={cn(
      'absolute z-50 flex h-full w-full items-center justify-center bg-white bg-opacity-50',
      size === 'screen' && 'fixed left-0 top-0',
    )}
  >
    <Loader size="medium" />
  </div>
);
