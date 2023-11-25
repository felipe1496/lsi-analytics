import { AlertCircle } from 'lucide-react';
import React from 'react';

interface FieldErrorProps {
  message: string;
}

export const FieldError: React.FC<FieldErrorProps> = ({ message }) => (
  <div className="flex items-center gap-1 text-sm text-red-500">
    <AlertCircle size={18} />
    <span>{message}</span>
  </div>
);
