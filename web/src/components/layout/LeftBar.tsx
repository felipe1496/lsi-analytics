import React from 'react';

interface LeftBarProps {
  children?: React.ReactNode;
}

export const LeftBar: React.FC<LeftBarProps> = ({ children }) => (
  <aside className="fixed top-14 h-[calc(100vh-3.5rem)] w-80 border-r bg-background">
    {children}
  </aside>
);
