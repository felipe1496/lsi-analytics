import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
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
import { PasswordInput } from '@/components/ui/input/PasswordInput';
import { Label } from '@/components/ui/label';
import { APP_ROUTES } from '@/constants/app-routes';
import { AVAILABLE_DATA_FONTS } from '@/constants/data-fonts';
import { REQUIRED_FIELD } from '@/constants/messages';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { dataFontsService } from '@/services/datafonts';
import {
  DataFontProvider,
  TypeOfStorage,
} from '@/services/models/datafont/types';
import { cn, handleErrorNotify } from '@/utils';

export type FormData = {
  name: string;
  accessKey: string;
  font: { provider: DataFontProvider; typeOfStorage: TypeOfStorage };
};

export const DataFontsNewPage: React.FC = () => {
  const [accessKeyIsVisible, setAccessKeyIsVisible] =
    React.useState<boolean>(false);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const selectedProvider = watch('font');

  const { mutate, isPending } = useMutation({
    mutationKey: [reactQueryKeys.mutations.createDataFontMutation],
    mutationFn: dataFontsService.create,
    onError: handleErrorNotify,
    onSuccess: () => {
      toast('Fonte de dados criada com sucesso', { type: 'success' });
      navigate(APP_ROUTES.dataFont.index);
    },
  });

  const onSubmit = (data: FormData) => {
    mutate({
      body: {
        name: data.name,
        accessKey: data.accessKey,
        typeOfStorage: data.font.typeOfStorage,
        provider: data.font.provider,
      },
    });
  };

  return (
    <Layout
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbHome />
          <BreadcrumbLink to={APP_ROUTES.dataFont.index}>
            Fontes de dados
          </BreadcrumbLink>
          <BreadcrumbNeutral>Novo</BreadcrumbNeutral>
        </Breadcrumb>
      }
      className="layout-page flex flex-col gap-4"
    >
      <Card className="w-[768px]">
        <CardHeader>
          <CardTitle>Nova fonte de dados</CardTitle>
          <CardDescription>Preencha para criar</CardDescription>
          <Typography level="muted"></Typography>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label>Nome</Label>
              <Input
                {...register('name', { required: REQUIRED_FIELD })}
                placeholder="Nome da fonte de dados"
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => <FieldError message={message} />}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Selecione o tipo de fonte</Label>
              <Controller
                control={control}
                name="font"
                rules={{ required: REQUIRED_FIELD }}
                render={({ field: { onChange } }) => (
                  <div className="grid grid-cols-4 rounded-[2px] bg-zinc-50 p-8">
                    {AVAILABLE_DATA_FONTS.map((d, index) => {
                      const isSelected =
                        selectedProvider?.provider === d.provider &&
                        selectedProvider?.typeOfStorage === d.typeOfStorage;

                      return (
                        <button
                          type="button"
                          key={`${d.label}-${d.provider}-${d.typeOfStorage}-${index}`}
                          onClick={() => {
                            onChange({
                              provider: d.provider,
                              typeOfStorage: d.typeOfStorage,
                            });
                          }}
                          className={cn(
                            'flex h-48 flex-col items-center justify-center gap-8 rounded-sm bg-white shadow-sm',
                            isSelected &&
                              'relative bg-slate-700 text-foreground',
                          )}
                        >
                          <div className="rounded-full bg-zinc-50 p-4">
                            <img src={d.imageURL} className="w-16" />
                          </div>
                          <span className="text-sm font-semibold">
                            {d.label}
                          </span>
                          {isSelected && (
                            <div className="absolute right-2 top-2 h-4 w-4 rounded-full bg-green-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              <ErrorMessage
                errors={errors}
                name="font"
                render={({ message }) => <FieldError message={message} />}
              />
            </div>
            <div>
              <Label>Chave de acesso</Label>
              <PasswordInput
                {...register('accessKey', { required: REQUIRED_FIELD })}
                visible={accessKeyIsVisible}
                onVisibilityChange={setAccessKeyIsVisible}
              />
              <ErrorMessage
                errors={errors}
                name="accessKey"
                render={({ message }) => <FieldError message={message} />}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" asChild>
              <Link to={APP_ROUTES.dataFont.index}>Voltar</Link>
            </Button>
            <Button type="submit" loading={isPending} disabled={isPending}>
              Criar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Layout>
  );
};
