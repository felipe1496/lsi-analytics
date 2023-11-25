import React from 'react';

interface LeftBarProps {
  children?: React.ReactNode;
}

export const LeftBar: React.FC<LeftBarProps> = ({ children }) => (
  <div className="absolute top-14 h-[calc(100vh-3.5rem)] w-80 border-r bg-white p-4">
    {children}
  </div>
);
