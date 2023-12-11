import { FileSearch } from 'lucide-react';
import React from 'react';

export const NoData: React.FC = () => (
  <div className="flex flex-col items-center justify-center gap-2 text-zinc-500">
    <FileSearch strokeWidth={1.3} size={32} />
    <span>Dados não encontrados</span>
  </div>
);
