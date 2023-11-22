import React from 'react';

import { cn } from '@/utils';

import { Navbar } from './Navbar';
import { Topbar } from './Topbar';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  breadcrumb?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  breadcrumb,
  className,
}) => (
  <div className="flex">
    <Navbar />
    <div className="w-full md:ml-16">
      <Topbar breadcrumb={breadcrumb} />
      <main className={cn('mt-14', className)}>{children}</main>
    </div>
  </div>
);
