import { AlertTriangle } from 'lucide-react';
import React from 'react';
import { Helmet } from 'react-helmet';

import { APP_DESCRIPTION } from '@/constants/meta';
import { cn } from '@/utils';

import { Footer } from './Footer';
import { LeftBar } from './LeftBar';
import { Navbar } from './Navbar';
import { RightBar } from './RightBar';
import { Topbar } from './Topbar';

type TopMessage = {
  message: string;
  type: 'warning' | 'danger' | 'info';
};

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
  breadcrumb?: React.ReactNode;
  title?: string;
  description?: string;
  leftBar?: React.ReactNode;
  rightBar?: React.ReactNode;
  rightContent?: React.ReactNode;
  topMessage?: TopMessage;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  breadcrumb,
  className,
  title: _title,
  description: _description,
  leftBar,
  rightBar,
  rightContent,
  topMessage,
}) => {
  const title = _title ? `${_title} | LSI Analytics` : 'LSI Analytics';
  const description = _description ?? APP_DESCRIPTION;

  const renderTopMessage = (_topMessage: TopMessage) => {
    switch (_topMessage.type) {
      case 'warning':
        return (
          <div className="flex w-full items-center justify-center gap-2 bg-amber-500 py-3 text-zinc-50">
            <AlertTriangle />
            {_topMessage.message}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="flex flex-col">
        {topMessage && renderTopMessage(topMessage)}
        <div className="flex">
          <Navbar />
          <div className="w-full md:ml-16">
            <Topbar breadcrumb={breadcrumb} rightContent={rightContent} />
            {leftBar && <LeftBar>{leftBar}</LeftBar>}
            <main className={cn('mt-14', leftBar && 'ml-80', className)}>
              {children}
              <Footer />
            </main>
            {rightBar && <RightBar>{rightBar}</RightBar>}
          </div>
        </div>
      </div>
    </>
  );
};
