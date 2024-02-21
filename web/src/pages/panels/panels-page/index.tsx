import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from '@tanstack/react-query';
import { AlignJustify, LayoutGrid, Plus, Search } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { FieldError } from '@/components/errors/field-error';
import { Layout } from '@/components/layout';
import { NoData } from '@/components/no-data';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { APP_ROUTES } from '@/constants/app-routes';
import { REQUIRED_FIELD } from '@/constants/messages';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { panelsService } from '@/services/panels';
import { cn } from '@/utils';

import { PanelCard } from './components/PanelCard';
import { PanelRow } from './components/PanelRow';
import { LAYOUT } from './constants';
import { usePanelsQuery } from './hooks/usePanelsQuery';
import { LoadingPanelsPage } from './loading';
import { LayoutType } from './types';

interface FormData {
  name: string;
  description?: string | null;
}

export const PanelsPage: React.FC = () => {
  const [layout, setLayout] = React.useState<LayoutType>(LAYOUT.GRID);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { name: 'Novo painel', description: null },
  });

  const { mutate: createPanel } = useMutation({
    mutationKey: [reactQueryKeys.mutations.createPanelMutation],
    mutationFn: panelsService.create,
    onSuccess: (response) => {
      navigate(APP_ROUTES.panel.index.replace(':id', response.id));
    },
  });

  const { data, isLoading } = usePanelsQuery();

  const onSubmit = (formData: FormData) => {
    createPanel({ body: formData });
  };

  const renderPanels = () => {
    if (data) {
      if (layout === LAYOUT.GRID) {
        if (data.length > 0) {
          return (
            <div className="grid grid-cols-4 gap-6">
              {data.map((p) => (
                <PanelCard
                  key={p.id}
                  to={APP_ROUTES.panel.index.replace(':id', p.id)}
                  imageURL={p.imageURL}
                  title={p.name}
                />
              ))}
            </div>
          );
        }
      }

      return (
        <table>
          <thead>
            <tr>
              <th className="text-left text-sm font-normal">Nome</th>
              <th className="text-left text-sm font-normal">Descrição</th>
              <th className="text-left text-sm font-normal">Criação</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <PanelRow key={p.id} data={p} />
            ))}
          </tbody>
        </table>
      );
    }
    return (
      <NoData message="Crie um novo painel para começar" className="mt-16" />
    );
  };

  const render = () => {
    if (isLoading) {
      return <LoadingPanelsPage />;
    }

    if (data) {
      return (
        <>
          <div className="flex w-full items-center justify-between">
            <div>
              <Typography level="h3">Paineis</Typography>
              <Typography level="muted">Todos os paineis</Typography>
            </div>

            <div className="flex items-center gap-4">
              <Input
                className="w-96"
                placeholder="Buscar painel..."
                rigthAdornment={<Search size={20} className="text-zinc-400" />}
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="submit"
                    variant="outline"
                    className="gap-1 rounded-full border-blue-500 text-blue-500 hover:bg-blue-100 hover:text-blue-500"
                  >
                    <Plus size={18} />
                    Painel
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                      <DialogTitle>Criar novo painel</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          error={!!errors.name}
                          {...register('name', { required: REQUIRED_FIELD })}
                          className="col-span-3"
                        />
                        <ErrorMessage
                          errors={errors}
                          name="name"
                          render={({ message }) => (
                            <FieldError message={message} />
                          )}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="username">Descrição</Label>
                        <Input
                          {...register('description')}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose>
                        <Button type="button" variant="outline">
                          Cancelar
                        </Button>
                      </DialogClose>
                      <Button type="submit">Criar</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <button onClick={() => setLayout(LAYOUT.GRID)}>
                <LayoutGrid
                  size={18}
                  className={cn(layout === LAYOUT.GRID && 'text-blue-500')}
                />
              </button>
              <button onClick={() => setLayout(LAYOUT.LIST)}>
                <AlignJustify
                  size={18}
                  className={cn(layout === LAYOUT.LIST && 'text-blue-500')}
                />
              </button>
            </div>
          </div>

          {renderPanels()}
        </>
      );
    }

    return null;
  };

  return (
    <Layout
      title="Paineis"
      description="Todos os paineis do usuário"
      className="layout-page flex flex-col gap-4"
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbHome />
          <BreadcrumbNeutral>Paineis</BreadcrumbNeutral>
        </Breadcrumb>
      }
    >
      {render()}
    </Layout>
  );
};
