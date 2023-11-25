import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from '@tanstack/react-query';
import { AlignJustify, LayoutGrid, Plus, Search } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

import FireImage from '@/assets/images/fire.jpg';
import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { FieldError } from '@/components/errors/field-error';
import { Layout } from '@/components/layout';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { APP_ROUTER } from '@/constants/app-routes';
import { REQUIRED_FIELD } from '@/constants/form-messages';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { panelsService } from '@/services/panels';
import { cn } from '@/utils';

import { PanelCard } from '../components/PanelCard';

interface FormData {
  name: string;
  description?: string;
}

export const PanelsPage: React.FC = () => {
  const [layout, setLayout] = React.useState<'grid' | 'list'>('grid');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { name: 'Novo painel', description: '' },
  });

  const { mutate: createPanel } = useMutation({
    mutationKey: [reactQueryKeys.mutations.createPanelMutation],
    mutationFn: panelsService.create,
  });

  const onSubmit = (data: FormData) => {
    createPanel({ body: data });
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
          <Typography level="h3">Paneis</Typography>
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
        <PanelCard
          to={APP_ROUTER.panel.index.replace(':id', '1')}
          imageURL={FireImage}
          title="Incêndios na Paraíba"
        />
      </div>
    </Layout>
  );
};
