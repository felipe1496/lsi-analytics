import { ErrorMessage } from '@hookform/error-message';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/common/breadcrumb';
import { FieldError } from '@/components/common/errors/field-error';
import { Layout } from '@/components/common/layout';
import { NotFoundPage } from '@/components/common/not-found-page';
import { SimpleStepper } from '@/components/common/simple-stepper';
import { Typography } from '@/components/common/typography';
import { Button } from '@/components/common/ui/button';
import { Input } from '@/components/common/ui/input';
import { Label } from '@/components/common/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/common/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/select';
import { APP_ROUTES } from '@/constants/app-routes';
import { REQUIRED_FIELD } from '@/constants/form-messages';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { ViewModel } from '@/services/models/panel';
import { panelsService } from '@/services/panels';

import { usePanelNewViewContext } from '../../hooks/usePanelNewViewContext';

type FormData = {
  name: ViewModel['name'] | null;
  type: ViewModel['type'] | null;
  contentUpdate: ViewModel['contentUpdate'] | null;
};

export const PanelNewViewConfig: React.FC = () => {
  const { id } = useParams();

  const { setPanelCreation, panelCreation } = usePanelNewViewContext();

  const location = useLocation();

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    defaultValues: {
      name: panelCreation.name ?? null,
      type: location.state?.view ?? panelCreation.type ?? null,
      contentUpdate: 'STATIC',
    },
  });

  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey: [reactQueryKeys.queries.findPanelQuery, id],
    queryFn: () => {
      if (id) {
        return panelsService.find({ path: { id } });
      }
      return null;
    },
  });

  const onSubmit = (formData: FormData) => {
    if (data) {
      setPanelCreation((prevState) => {
        const newState = { ...prevState };
        Object.assign(newState, formData);
        return newState;
      });
      navigate(APP_ROUTES.panel.new.font.replace(':id', data.data.id));
    }
  };

  const render = () => {
    if (data) {
      return (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-[768px] flex-col gap-6"
        >
          <SimpleStepper active={1} numberOfSteps={4} />
          <div className="flex flex-col gap-2">
            <Typography level="h3">Configuração geral</Typography>
            {data?.data.description && (
              <Typography level="muted">
                Configure as preferências na nova visualização
              </Typography>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Label>Nome da visualização</Label>
              <Input
                placeholder="Nome"
                {...register('name', { required: REQUIRED_FIELD })}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => <FieldError message={message} />}
              />
            </div>

            <div>
              <Label>Tipo de visualização</Label>
              <Controller
                name="type"
                rules={{ required: REQUIRED_FIELD }}
                control={control}
                render={({ field: { onChange } }) => (
                  <Select
                    onValueChange={onChange}
                    defaultValue={
                      location.state?.view ?? panelCreation.type ?? null
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Visualização" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PIE_CHART">
                        Gráfico de torta
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <ErrorMessage
                errors={errors}
                name="type"
                render={({ message }) => <FieldError message={message} />}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Atualização do conteúdo</Label>
            <Controller
              name="contentUpdate"
              control={control}
              rules={{ required: REQUIRED_FIELD }}
              render={({ field: { onChange } }) => (
                <RadioGroup defaultValue="STATIC" onValueChange={onChange}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="STATIC" id="STATIC" />
                    <Label htmlFor="STATIC">Estático</Label>
                  </div>
                  <Typography level="muted">
                    A plataforma guarda os dados da primeira requisição e fazer
                    uma nova requisição para atualizar é arbitrária
                  </Typography>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="DYNAMIC" id="DYNAMIC" />
                    <Label htmlFor="DYNAMIC">Dinâmico</Label>
                  </div>
                  <Typography level="muted">
                    A plataforma fará uma requisição para sua fonte de dados
                    sempre que uma nova requisição para a visualização for feita
                  </Typography>
                </RadioGroup>
              )}
            />
          </div>

          <div className="flex justify-between">
            <Link
              to={APP_ROUTES.panel.edit.replace(':id', data.data.id)}
              state={{ tab: 'views' }}
            >
              <Button variant="outline" type="button">
                <ChevronLeft size={18} />
                Voltar
              </Button>
            </Link>
            <Button type="submit">
              Próximo
              <ChevronRight size={18} />
            </Button>
          </div>
        </form>
      );
    }

    return null;
  };

  if (error || !id) {
    return <NotFoundPage />;
  }

  if (data) {
    return (
      <Layout
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbHome />
            <BreadcrumbLink to={APP_ROUTES.panels.index}>
              Paineis
            </BreadcrumbLink>
            <BreadcrumbLink to={APP_ROUTES.panel.index.replace(':id', id)}>
              {data.data.name}
            </BreadcrumbLink>
            <BreadcrumbLink to={APP_ROUTES.panel.edit.replace(':id', id)}>
              Editar
            </BreadcrumbLink>
            <BreadcrumbNeutral>Nova visualização</BreadcrumbNeutral>
          </Breadcrumb>
        }
        className="layout-page"
      >
        {render()}
      </Layout>
    );
  }

  return null;
};
