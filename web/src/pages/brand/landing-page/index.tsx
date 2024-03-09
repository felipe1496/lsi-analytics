import React from 'react';
import { Link } from 'react-router-dom';

import { BrandLayout } from '@/components/brand-layout';
import { Button } from '@/components/ui/button';
import { APP_ROUTES } from '@/constants/app-routes';

export const LandingPage: React.FC = () => (
  <BrandLayout title="Início">
    <div className="flex items-center justify-center bg-gradient-to-b from-zinc-50 to-white">
      <div className="flex w-[1280px] items-center justify-between gap-4">
        <div className="flex flex-col gap-12">
          <div>
            <h1 className="text-5xl font-semibold leading-normal">
              Crie seus próprios insights de forma{' '}
              <span className="text-indigo-500">fácil e intuitiva</span>
            </h1>

            <span className="text-xl text-foreground">
              Plataforma focada na usabilidade do usuário
            </span>
          </div>

          <div>
            <Button asChild size="lg" className="text-lg">
              <Link to={APP_ROUTES.auth.register}>Tentar agora</Link>
            </Button>
          </div>
        </div>
        <img src="/images/panels-image-skeleton.svg" />
      </div>
    </div>
  </BrandLayout>
);
