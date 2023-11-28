import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/common/breadcrumb';
import { Layout } from '@/components/common/layout';
import { StepNumber, Stepper } from '@/components/common/stepper';
import { useStepper } from '@/components/common/stepper/useStepper';
import { Typography } from '@/components/common/typography';
import { APP_ROUTER } from '@/constants/app-routes';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { NotFoundPage } from '@/pages/miscellaneous/not-found-page';
import { panelsService } from '@/services/panels';

import { PanelConfig } from './components/PanelConfig';

export const PanelNewView: React.FC = () => {
  const { id } = useParams();

  const { activeStep, canActivate, jump } = useStepper({
    index: 1,
    count: 3,
  });

  const getStepMode = (value: number) => {
    if (value === activeStep) {
      return 'current';
    }

    if (value < activeStep) {
      return 'complete';
    }

    return 'incomplete';
  };

  const { data, error } = useQuery({
    queryKey: [reactQueryKeys.queries.findPanelQuery, id],
    queryFn: () => {
      if (id) {
        return panelsService.find({ path: { id } });
      }
      return null;
    },
  });

  const renderStepContent = (value: number) => {
    switch (value) {
      case 1:
        return <PanelConfig />;
      default:
        return null;
    }
  };

  if (error || !id) {
    return <NotFoundPage />;
  }

  if (data && id) {
    return (
      <Layout
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbHome />
            <BreadcrumbLink to={APP_ROUTER.panels.index}>
              Paineis
            </BreadcrumbLink>
            <BreadcrumbLink to={APP_ROUTER.panel.index.replace(':id', id)}>
              {data.data.name}
            </BreadcrumbLink>
            <BreadcrumbLink to={APP_ROUTER.panel.edit.replace(':id', id)}>
              Editar
            </BreadcrumbLink>
            <BreadcrumbNeutral>Nova visualização</BreadcrumbNeutral>
          </Breadcrumb>
        }
        className="layout-page flex flex-col gap-4"
      >
        <div>
          <Typography level="h3">Nova visualização</Typography>
          {data.data.description && (
            <Typography level="muted">
              Siga os passos para criar uma nova visualização
            </Typography>
          )}
        </div>

        <div>
          <Stepper>
            <StepNumber
              name="Configurações"
              description="Preferências da visualização"
              canActivate={() => canActivate(1)}
              onClick={() => jump(1)}
              mode={getStepMode(1)}
            >
              1
            </StepNumber>
            <StepNumber
              name="Selecionar fonte"
              description="Escolha um fonte para análise"
              canActivate={() => canActivate(2)}
              onClick={() => jump(2)}
              mode={getStepMode(2)}
            >
              2
            </StepNumber>
            <StepNumber
              name="Selecionar objeto"
              description="Selecione ou crie"
              canActivate={() => canActivate(3)}
              onClick={() => jump(2)}
              mode={getStepMode(3)}
            >
              3
            </StepNumber>
          </Stepper>
        </div>

        {renderStepContent(activeStep)}
      </Layout>
    );
  }

  return null;
};
