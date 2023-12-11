import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import LSILogo from '@/assets/images/lsi-brand-background.png';
import { AuthLayout } from '@/components/common/auth-layout';
import { FieldError } from '@/components/common/errors/field-error';
import { Typography } from '@/components/common/typography';
import { Button } from '@/components/common/ui/button';
import { Input } from '@/components/common/ui/input';
import { Label } from '@/components/common/ui/label';
import { APP_ROUTES } from '@/constants/app-routes';
import { REQUIRED_FIELD } from '@/constants/form-messages';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { usersService } from '@/services/users';
import { handleErrorNotify } from '@/utils';

interface FormData {
  email: string;
  name: string;
  birthDay: Date | null;
  password: string;
  confirmPassword: string;
}

export const RegisterPage: React.FC = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      name: '',
      birthDay: null,
      password: '',
      confirmPassword: '',
    },
  });

  const confirmPassword = watch('confirmPassword');
  const password = watch('password');

  const navigate = useNavigate();

  const validatePassword = (value: string) => {
    if (!(value === confirmPassword)) {
      return 'Senha não correspondem';
    }

    return true;
  };

  const validateConfirmPassword = (value: string) => {
    if (!(value === password)) {
      return 'Senha não correspondem';
    }

    return true;
  };

  const validateBirthDay = (date: string | null | Date) => {
    const dateIsAfterNow = dayjs(date).isAfter(dayjs());

    if (dateIsAfterNow) {
      return 'Data inválida';
    }

    return true;
  };

  const { mutate, isPending } = useMutation({
    mutationKey: [reactQueryKeys.mutations.createUserMutation],
    mutationFn: usersService.create,
    onError: handleErrorNotify,
    onSuccess: () => {
      toast('Cadastro realizado com sucesso', { type: 'success' });
      navigate(APP_ROUTES.auth.login);
    },
  });

  const onSubmit = async (data: FormData) => {
    if (data.birthDay) {
      mutate({
        body: {
          name: data.name,
          email: data.email,
          birthDay: new Date(data.birthDay),
          password: data.password,
        },
      });
    }
  };

  return (
    <AuthLayout
      className="flex items-center justify-center"
      backButtonTo={APP_ROUTES.auth.login}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-8"
      >
        <div className="flex flex-col items-center">
          <img
            src={LSILogo}
            alt="Information Systems Laboratory logo"
            className="w-24 object-cover"
          />
          <Typography level="h4">Faça seu cadastro</Typography>
          <Typography level="muted">Crie uma conta para iniciar</Typography>
        </div>
        <div className="flex w-96 flex-col gap-2">
          <Label>E-mail</Label>
          <div>
            <Input
              error={!!errors.email}
              {...register('email', {
                required: REQUIRED_FIELD,
              })}
              placeholder="Digite seu email"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <FieldError message={message} />}
            />
          </div>
          <Label>Nome</Label>
          <div>
            <Input
              error={!!errors.name}
              {...register('name', {
                required: REQUIRED_FIELD,
              })}
              placeholder="Digite seu nome"
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => <FieldError message={message} />}
            />
          </div>
          <Label>Data de Nascimento</Label>
          <div>
            <Input
              error={!!errors.birthDay}
              {...register('birthDay', {
                required: REQUIRED_FIELD,
                validate: validateBirthDay,
              })}
              type="date"
            />
            <ErrorMessage
              errors={errors}
              name="birthDay"
              render={({ message }) => <FieldError message={message} />}
            />
          </div>
          <Label>Senha</Label>
          <div>
            <Input
              error={!!errors.password}
              type="password"
              {...register('password', {
                required: REQUIRED_FIELD,
                validate: validatePassword,
              })}
              placeholder="Digite sua senha"
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <FieldError message={message} />}
            />
          </div>
          <Label>Confirme a senha</Label>
          <div>
            <Input
              error={!!errors.password}
              type="password"
              {...register('confirmPassword', {
                required: REQUIRED_FIELD,
                validate: validateConfirmPassword,
              })}
              placeholder="Confirme sua senha"
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <FieldError message={message} />}
            />
          </div>

          <Button loading={isPending} className="mt-6 w-full" type="submit">
            Cadastrar
          </Button>
        </div>

        <Typography level="muted">© 2023 LSI Analytics</Typography>
      </form>
    </AuthLayout>
  );
};
