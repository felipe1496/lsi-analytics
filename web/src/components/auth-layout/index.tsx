import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/utils';

import { Separator } from '../ui/separator';
import { INFO } from './constants';

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
  backButtonTo?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  className,
  backButtonTo,
}) => (
  <main className="relative flex">
    {backButtonTo && (
      <Link to={backButtonTo} className="absolute left-4 top-4">
        <ArrowLeft size={32} />
      </Link>
    )}
    <div className={cn('w-1/2', className)}>{children}</div>
    <div
      className="flex h-screen w-1/2 flex-col items-center justify-center text-zinc-50"
      style={{
        backgroundImage: 'url(images/blured.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="flex flex-col gap-4">
        {INFO.map((i, index) => (
          <div key={`${i.title}-${i.message}-${index}`}>
            {index !== 0 && (
              <Separator className="mb-2 bg-zinc-50 bg-opacity-20" />
            )}
            <div className="flex gap-4">
              <div className="flex items-center justify-center bg-zinc-50 bg-opacity-5 p-4">
                <i.Icon />
              </div>

              <div className="flex flex-col">
                <span>{i.title}</span>
                <span className="text-sm text-zinc-300">{i.message}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
);
