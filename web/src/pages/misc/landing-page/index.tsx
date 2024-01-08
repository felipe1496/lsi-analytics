import React from 'react';
import { Link } from 'react-router-dom';

import { BrandLayout } from '@/components/brand-layout';
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

            <span className="text-xl text-zinc-500">
              Plataforma focada na usabilidade do usuário
            </span>
          </div>

          <div>
            <Link
              to={APP_ROUTES.auth.register}
              className="bg-purple-500 px-4 py-2 text-lg text-zinc-50 hover:bg-purple-600"
            >
              Tentar agora
            </Link>
          </div>
        </div>
        <img src="/images/panels-image-skeleton.svg" />
      </div>
    </div>
  </BrandLayout>
);
