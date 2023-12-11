import { FileSearch } from 'lucide-react';
import React from 'react';

interface NoDataProps {
  message?: string | React.ReactNode;
}

export const NoData: React.FC<NoDataProps> = ({ message }) => (
  <div className="flex flex-col items-center justify-center gap-2 text-zinc-400">
    <FileSearch strokeWidth={1.3} size={32} />
    <div className="flex flex-col items-center justify-center">
      <span>Dados não encontrados</span>
      {message && <span>{message}</span>}
    </div>
  </div>
);
