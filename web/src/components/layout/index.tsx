import React from 'react';
import { Helmet } from 'react-helmet';

import { APP_DESCRIPTION } from '@/constants/meta';
import { cn } from '@/utils';

import { Footer } from './Footer';
import { LeftBar } from './LeftBar';
import { Navbar } from './Navbar';
import { Topbar } from './Topbar';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  breadcrumb?: React.ReactNode;
  title?: string;
  description?: string;
  leftBar?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  breadcrumb,
  className,
  title: _title,
  description: _description,
  leftBar,
}) => {
  const title = _title ? `${_title} | LSI Analytics` : 'LSI Analytics';
  const description = _description ?? APP_DESCRIPTION;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="flex">
        <Navbar />
        <div className="w-full md:ml-16">
          <Topbar breadcrumb={breadcrumb} />
          {leftBar && <LeftBar>{leftBar}</LeftBar>}
          <main className={cn('mt-14', leftBar && 'ml-80', className)}>
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
};
