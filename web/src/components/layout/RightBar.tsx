import React from 'react';

interface LeftBarProps {
  children?: React.ReactNode;
}

export const RightBar: React.FC<LeftBarProps> = ({ children }) => (
  <aside className="absolute right-0 top-14 h-[calc(100vh-3.5rem)] w-80 border-l bg-white">
    {children}
  </aside>
);
