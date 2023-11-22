import React from 'react';

import BluredImage from '@/assets/images/blured.jpg';
import { cn } from '@/utils';

import { Separator } from '../ui/separator';
import { INFO } from './constants';

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  className,
}) => (
  <main className="flex">
    <div className={cn('w-1/2', className)}>{children}</div>
    <div
      className="flex h-screen w-1/2 flex-col items-center justify-center text-zinc-50"
      style={{
        backgroundImage: `url(${BluredImage})`,
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
