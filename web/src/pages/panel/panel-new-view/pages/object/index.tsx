import Editor from '@monaco-editor/react';
import { useQuery } from '@tanstack/react-query';
import { Sheet } from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { Layout } from '@/components/layout';
import { NoData } from '@/components/no-data';
import { NotFoundPage } from '@/components/not-found-page';
import { SimpleStepper } from '@/components/simple-stepper';
import { Combobox } from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';
import { APP_ROUTES } from '@/constants/app-routes';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { dataFontsService } from '@/services/data-fonts';
import { panelsService } from '@/services/panels';

import { usePanelNewViewContext } from '../../hooks/usePanelNewViewContext';

export const PanelNewViewObject: React.FC = () => {
  const [schemaName, setSchemaName] = React.useState<string | null>(null);

  const { id } = useParams();

  const { panelCreation } = usePanelNewViewContext();

  const { data: schemasData } = useQuery({
    queryKey: [reactQueryKeys.queries.findSchemasQuery, panelCreation],
    queryFn: () =>
      dataFontsService.findSchemas({
        path: { datafontId: panelCreation.datafontId },
      }),
  });

  const { data: tablesData, refetch } = useQuery({
    queryKey: [
      reactQueryKeys.queries.findTablesQuery,
      panelCreation,
      schemaName,
    ],
    queryFn: () => {
      if (schemaName) {
        return dataFontsService.findTables({
          path: { datafontId: panelCreation.datafontId, schemaName },
        });
      }
      return null;
    },
    enabled: false,
  });

  React.useEffect(() => {
    refetch();
  }, [schemaName, refetch]);
  console.log('tablesData', tablesData);

  const { data, error } = useQuery({
    queryKey: [reactQueryKeys.queries.findPanelQuery, id],
    queryFn: () => {
      if (id) {
        return panelsService.find({ path: { id } });
      }
      return null;
    },
  });

  const getComboData = () => {
    if (schemasData) {
      return schemasData.data.schemas.map((s) => ({ label: s, value: s }));
    }
    return [];
  };

  const renderTables = () => {
    if (tablesData) {
      if (tablesData?.data.tables.length > 0) {
        return (
          <button className="flex flex-col">
            {tablesData?.data.tables.map((t, index) => (
              <div className="flex items-center gap-2" key={`${t}-${index}`}>
                <Sheet className="text-green-500" />
                <span>{t}</span>
              </div>
            ))}
          </button>
        );
      }
    }

    return <NoData />;
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
        leftBar={
          <div className="flex flex-col">
            <div className="border-b p-4">
              <SimpleStepper active={3} numberOfSteps={4} />
              <h1 className="text-lg font-semibold">
                Selecione o objeto de banco
              </h1>
            </div>

            <div className="flex flex-col gap-4 p-4">
              <div>
                <Label>Schema</Label>
                <Combobox
                  className="w-full"
                  data={getComboData()}
                  slotProps={{
                    scrollArea: { className: 'h-40' },
                  }}
                  onChange={setSchemaName}
                />
              </div>

              <span>Tabelas</span>

              {renderTables()}
            </div>
          </div>
        }
      >
        <div>
          <Editor
            height={400}
            width="100%"
            defaultLanguage="sql"
            language="sql"
            options={{ minimap: { enabled: false } }}
            className="border-b"
          />
        </div>
      </Layout>
    );
  }

  return null;
};
