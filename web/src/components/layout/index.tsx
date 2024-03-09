import { AlertTriangle, Info, XCircle } from 'lucide-react';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import { APP_DESCRIPTION } from '@/constants/meta';
import { cn } from '@/utils';

import { Footer } from './Footer';
import { LeftBar } from './LeftBar';
import { Navbar } from './Navbar';
import { OverlayLoading } from './OverlayLoading';
import { RightBar } from './RightBar';
import { Topbar } from './Topbar';

type AlertMessage = {
  message: string;
  type: 'warning' | 'error' | 'info';
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
  alert?: AlertMessage;
  footer?: string | React.ReactNode | null;
  loading?: boolean;
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
  alert,
  footer,
  loading = false,
}) => {
  const title = _title ? `${_title} | LSI Analytics` : 'LSI Analytics';
  const description = _description ?? APP_DESCRIPTION;

  const renderFooter = () => {
    if (footer === null) {
      return null;
    }

    return footer ? <>{footer}</> : <Footer />;
  };

  const renderAlertMessage = () => {
    if (alert) {
      return (
        <div
          className={cn(
            'flex w-full items-center justify-center gap-2 py-3 text-foreground',
            alert.type === 'warning' && 'bg-amber-500',
            alert.type === 'error' && 'bg-red-500',
            alert.type === 'info' && 'bg-sky-500',
          )}
        >
          {alert.type === 'warning' && <AlertTriangle />}
          {alert.type === 'error' && <XCircle />}
          {alert.type === 'info' && <Info />}
          {alert.message}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {loading && <OverlayLoading />}
      <div className="flex flex-col">
        {renderAlertMessage()}
        <div className="flex">
          <Navbar />
          <div className="w-full md:ml-16">
            <Topbar breadcrumb={breadcrumb} rightContent={rightContent} />
            {leftBar && <LeftBar>{leftBar}</LeftBar>}
            <main
              className={cn(
                'mt-14',
                leftBar && 'ml-80',
                rightBar && 'mr-80',
                className,
              )}
            >
              {children}
              {renderFooter()}
            </main>
            {rightBar && <RightBar>{rightBar}</RightBar>}
          </div>
        </div>
      </div>
    </>
  );
};
