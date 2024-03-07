import { ErrorMessage } from '@hookform/error-message';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Copy } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { FieldError } from '@/components/errors/field-error';
import { Layout } from '@/components/layout';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { APP_ROUTES } from '@/constants/app-routes';
import { REQUIRED_FIELD } from '@/constants/messages';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { usersService } from '@/services/users';
import { copyToClipboard } from '@/utils';

import { ConfigBar } from '../components/config-bar';

type FormData = {
  name: string;
  email: string;
  birthDay: string;
};

export const AccountPage: React.FC = () => {
  const { data, isSuccess } = useQuery({
    queryKey: [reactQueryKeys.queries.findUserByToken],
    queryFn: () => usersService.findByToken(),
  });

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      birthDay: undefined,
    },
  });

  const nameValue = watch('name');
  const emailValue = watch('email');
  const birthDayValue = watch('birthDay');

  React.useEffect(() => {
    if (isSuccess && data) {
      setValue('name', data.name);
      setValue('email', data.email);
      setValue('birthDay', dayjs(data.birthDay).format('YYYY-MM-DD'));
    }
  }, [isSuccess, setValue, data]);

  const saveIsDisabled = () => {
    if (data) {
      const nameHasNoChange = nameValue === data.name;
      const emailHasNoChange = emailValue === data.email;
      const birthDayHasNoChange = dayjs(birthDayValue).isSame(data.birthDay);

      if (nameHasNoChange && emailHasNoChange && birthDayHasNoChange) {
        return true;
      }

      return false;
    }

    return true;
  };

  const { mutate } = useMutation({
    mutationKey: [reactQueryKeys.mutations.updateUserMutation],
    mutationFn: usersService.update,
    onSuccess: () =>
      toast('Usuário atualizado com sucesso', { type: 'success' }),
    onError: () => toast('Ocorreu um erro', { type: 'error' }),
  });

  const onSubmit = (formData: FormData) => {
    const _birthDay = dayjs(formData.birthDay).toDate();

    mutate({
      body: {
        email: formData.email,
        name: formData.name,
        birthDay: _birthDay,
      },
    });
  };

  function memberSince(date: Date) {
    const _date = dayjs(date);
    const today = dayjs();

    const diffMonths = today.diff(_date, 'month');
    const diffYears = today.diff(_date, 'year');

    if (diffYears > 1) {
      return `${diffYears} anos`;
    }
    if (diffMonths > 1) {
      return `${diffMonths} meses`;
    }
    const diffDays = today.diff(_date, 'day');
    return `${diffDays} dias`;
  }

  if (data) {
    return (
      <Layout
        title="Perfil"
        leftBar={<ConfigBar active="account" />}
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbHome />
            <BreadcrumbLink to={APP_ROUTES.config.index}>
              Configurações
            </BreadcrumbLink>
            <BreadcrumbNeutral>Perfil</BreadcrumbNeutral>
          </Breadcrumb>
        }
        className="layout-page"
      >
        <Card className="w-[768px]">
          <CardHeader>
            <div className="flex flex-col gap-2">
              <CardTitle>Perfil</CardTitle>
              <CardDescription>Editar informações do perfil</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex gap-8">
            <img
              src="/icons/portrait-placeholder.png"
              alt="user placeholder"
              className="h-24 w-24 rounded-full"
            />
            <form
              className="flex w-full flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full">
                <Label>Nome</Label>
                <Input {...register('name', { required: REQUIRED_FIELD })} />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => <FieldError message={message} />}
                />
              </div>

              <div className="w-full">
                <Label>Email</Label>
                <Input {...register('email', { required: REQUIRED_FIELD })} />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => <FieldError message={message} />}
                />
              </div>

              <div className="w-full">
                <Label>Data de nascimento</Label>
                <Input
                  type="date"
                  {...register('birthDay', { required: REQUIRED_FIELD })}
                />
                <ErrorMessage
                  errors={errors}
                  name="birthDay"
                  render={({ message }) => <FieldError message={message} />}
                />
              </div>

              <div className="w-full">
                <Label>Id do usuário</Label>
                <Input
                  value={data.id}
                  disabled
                  rigthAdornment={
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard({
                          text: data.id,
                          onSuccess: () =>
                            toast('Copiado para a área de transferência', {
                              type: 'success',
                            }),
                          onError: () =>
                            toast(
                              'Ocorreu um erro ao copiar para a área de transferência',
                              {
                                type: 'error',
                              },
                            ),
                        })
                      }
                    >
                      <Copy size={18} />
                    </button>
                  }
                />
              </div>

              <Typography level="muted">
                Membro desde {dayjs(data.createdAt).format('DD/MM/YYYY')} (
                {memberSince(data.createdAt)})
              </Typography>
              <CardFooter className="flex justify-end p-0">
                <Button type="submit" disabled={saveIsDisabled()}>
                  Salvar
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  return null;
};
