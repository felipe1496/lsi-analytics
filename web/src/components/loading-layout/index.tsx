import React from 'react';

interface LoadingLayoutProps {
  children?: React.ReactNode;
}

export const LoadingLayout: React.FC<LoadingLayoutProps> = ({ children }) => (
  <main className="flex flex-col">{children}</main>
);
