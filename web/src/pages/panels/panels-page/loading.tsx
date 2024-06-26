import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export const LoadingPanelsPage: React.FC = () => (
  <div className="flex flex-col gap-4">
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-6 w-72" />
        <Skeleton className="h-3 w-60" />
      </div>

      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-4" />
      </div>
    </div>

    <div className="grid grid-cols-4 gap-6">
      <Skeleton className="flex h-48 w-full" />
      <Skeleton className="flex h-full w-full" />
      <Skeleton className="flex h-full w-full" />
      <Skeleton className="flex h-full w-full" />
    </div>
  </div>
);
