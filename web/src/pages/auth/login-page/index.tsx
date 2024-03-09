import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthLayout } from '@/components/auth-layout';
import { FieldError } from '@/components/errors/field-error';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/input/PasswordInput';
import { Label } from '@/components/ui/label';
import { APP_ROUTES } from '@/constants/app-routes';
import { REQUIRED_FIELD } from '@/constants/messages';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { sessionsService } from '@/services/sessions';
import {
  extractTokenFromCookies,
  getUserInfo,
  handleErrorNotify,
} from '@/utils';

interface FormData {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const [passwordIsVisible, setPasswordIsVisible] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (extractTokenFromCookies() && getUserInfo()) {
      navigate(APP_ROUTES.panels.index);
    }
  }, [navigate]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [reactQueryKeys.mutations.createSessionMutation],
    mutationFn: sessionsService.create,
    onSuccess: (response) => {
      Cookies.set('accessToken', response.accessToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      toast('Login realizado com sucesso', {
        type: 'success',
      });
      navigate(APP_ROUTES.panels.index);
    },
    onError: handleErrorNotify,
  });

  const onSubmit = (data: FormData) => {
    mutate({ body: data });
  };

  return (
    <AuthLayout
      className="flex items-center justify-center"
      backButtonTo={APP_ROUTES.brand.landing}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-8"
      >
        <div className="flex flex-col items-center">
          <img
            src="/logo.svg"
            alt="Information Systems Laboratory logo"
            className="w-16 object-cover"
          />
          <Typography level="h4">Bem-vindo!</Typography>
          <Typography level="muted">Faça Log In para iniciar</Typography>
        </div>
        <div className="flex w-96 flex-col gap-2">
          <Label>E-mail</Label>
          <div>
            <Input
              error={!!errors.email}
              type="email"
              {...register('email', { required: REQUIRED_FIELD })}
              placeholder="Digite seu email"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <FieldError message={message} />}
            />
          </div>

          <Label>Senha</Label>
          <div>
            <PasswordInput
              error={!!errors.password}
              {...register('password', { required: REQUIRED_FIELD })}
              visible={passwordIsVisible}
              onVisibilityChange={setPasswordIsVisible}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <FieldError message={message} />}
            />
          </div>

          <Button
            loading={isPending}
            disabled={isPending}
            type="submit"
            className="mt-6 w-full"
          >
            Entrar
          </Button>
        </div>
        <Typography level="muted">
          Não tem uma conta?{' '}
          <Link to={APP_ROUTES.auth.register} className="hover:underline">
            Cadastre-se aqui
          </Link>
        </Typography>

        <Typography level="muted">© 2023 LSI Analytics</Typography>
      </form>
    </AuthLayout>
  );
};
