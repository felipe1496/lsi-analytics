import React from 'react';
import { Link } from 'react-router-dom';

import { AuthLayout } from '@/components/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { APP_ROUTER } from '@/constants/app-routes';

export const LoginPage: React.FC = () => (
  <AuthLayout className="flex items-center justify-center">
    <form className="flex w-1/3 flex-col gap-2">
      <Label>E-mail</Label>
      <Input placeholder="Digite seu email" />

      <Label>Senha</Label>
      <Input placeholder="Digite sua senha" />

      <Link to={APP_ROUTER.panels.index.url}>
        <Button className="mt-6 w-full">Entrar</Button>
      </Link>
    </form>
  </AuthLayout>
);
