import { ErrorMessage } from '@hookform/error-message';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AlignJustify, LayoutGrid, Plus, Search } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbNeutral,
} from '@/components/common/breadcrumb';
import { FieldError } from '@/components/common/errors/field-error';
import { Layout } from '@/components/common/layout';
import { Typography } from '@/components/common/typography';
import { Button } from '@/components/common/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/ui/dialog';
import { Input } from '@/components/common/ui/input';
import { Label } from '@/components/common/ui/label';
import { APP_ROUTER } from '@/constants/app-routes';
import { REQUIRED_FIELD } from '@/constants/form-messages';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { panelsService } from '@/services/panels';
import { cn } from '@/utils';

import { PanelCard } from '../components/PanelCard';

interface FormData {
  name: string;
  description?: string | null;
}

export const PanelsPage: React.FC = () => {
  const [layout, setLayout] = React.useState<'grid' | 'list'>('grid');

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
      navigate(APP_ROUTER.panel.index.replace(':id', response.data.id));
    },
  });

  const { data } = useQuery({
    queryKey: [reactQueryKeys.queries.findAllPanelsQuery],
    queryFn: panelsService.findAll,
  });

  console.log(data);

  const onSubmit = (formData: FormData) => {
    createPanel({ body: formData });
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
                      render={({ message }) => <FieldError message={message} />}
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
                  <Button type="submit">Criar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <button onClick={() => setLayout('grid')}>
            <LayoutGrid
              size={18}
              className={cn(layout === 'grid' && 'text-blue-500')}
            />
          </button>
          <button onClick={() => setLayout('list')}>
            <AlignJustify
              size={18}
              className={cn(layout === 'list' && 'text-blue-500')}
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {data &&
          data.data.map((p) => (
            <PanelCard
              key={p.id}
              to={APP_ROUTER.panel.index.replace(':id', p.id)}
              imageURL={p.imageURL}
              title={p.name}
            />
          ))}
      </div>
    </Layout>
  );
};
