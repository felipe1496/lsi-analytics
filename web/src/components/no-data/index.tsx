import { FileSearch } from 'lucide-react';
import React from 'react';

import { cn } from '@/utils';

interface NoDataProps {
  message?: string | React.ReactNode;
  className?: string;
}

export const NoData: React.FC<NoDataProps> = ({ message, className }) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center gap-2 text-muted-foreground',
      className,
    )}
  >
    <FileSearch strokeWidth={1.3} size={32} />
    <div className="flex flex-col items-center justify-center">
      <span>Dados não encontrados</span>
      {message && <span>{message}</span>}
    </div>
  </div>
);
