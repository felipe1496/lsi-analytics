import { Loader2 } from 'lucide-react';
import React from 'react';

export const LoadingPage: React.FC = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Loader2 className="animate-spin" />
  </div>
);
