import { useQuery } from '@tanstack/react-query';
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
import { Layout } from '@/components/layout';
import { Typography } from '@/components/typography';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { APP_ROUTES } from '@/constants/app-routes';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { usersService } from '@/services/users';
import { copyToClipboard } from '@/utils';

import { ConfigBar } from '../components/config-bar';

type FormData = {
  name?: string;
  email?: string;
};

export const ProfilePage: React.FC = () => {
  const { data, isSuccess } = useQuery({
    queryKey: [reactQueryKeys.queries.findUserByToken],
    queryFn: () => usersService.findByToken(),
  });

  const { register, setValue } = useForm<FormData>({
    defaultValues: {
      name: data?.name ?? '',
      email: data?.email ?? '',
    },
  });
  React.useEffect(() => {
    if (isSuccess && data) {
      setValue('name', data.name);
      setValue('email', data.email);
    }
  }, [isSuccess, setValue, data]);

  function diferencaTempo(data: Date) {
    const dataFornecida = dayjs(data);
    const dataAtual = dayjs();

    const diferencaMeses = dataAtual.diff(dataFornecida, 'month');
    const diferencaAnos = dataAtual.diff(dataFornecida, 'year');

    if (diferencaAnos > 1) {
      return `${diferencaAnos} anos`;
    }
    if (diferencaMeses > 1) {
      return `${diferencaMeses} meses`;
    }
    const diferencaDias = dataAtual.diff(dataFornecida, 'day');
    return `${diferencaDias} dias`;
  }

  if (data) {
    return (
      <Layout
        title="Perfil"
        leftBar={<ConfigBar active="profile" />}
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
            <form className="flex w-full flex-col gap-4">
              <div className="w-full">
                <Label>Nome</Label>
                <Input {...register('name')} />
              </div>

              <div className="w-full">
                <Label>Email</Label>
                <Input {...register('email')} />
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
                Mesmo desde {dayjs(data.createdAt).format('DD/MM/YYYY')} (
                {diferencaTempo(data.createdAt)})
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  return null;
};
