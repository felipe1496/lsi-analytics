/* eslint-disable @typescript-eslint/no-explicit-any */
import Editor, { OnMount } from '@monaco-editor/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CornerDownLeft, Sheet } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { APP_ROUTES } from '@/constants/app-routes';
import { UNEXPECTED_ERROR } from '@/constants/messages';
import { reactQueryKeys } from '@/constants/react-query-keys';
import {
  ExecuteSqlProps,
  ExecuteSqlResponse,
  dataFontsService,
} from '@/services/data-fonts';
import { panelsService } from '@/services/panels';
import { ApiError } from '@/services/types';

import { usePanelNewViewContext } from '../../hooks/usePanelNewViewContext';

export const PanelNewViewObject: React.FC = () => {
  const [schemaName, setSchemaName] = React.useState<string>('');
  const [hasRunFirstSchemaQuery, setHasRunFirstSchemaQuery] =
    React.useState<boolean>(false);

  const sqlRef = React.useRef<string | undefined>();
  const textSelectionRef = React.useRef<string | undefined>();

  const { id } = useParams();

  const { panelCreation } = usePanelNewViewContext();

  const { data: schemasData } = useQuery({
    queryKey: [reactQueryKeys.queries.findSchemasQuery, panelCreation],
    queryFn: () =>
      dataFontsService.findSchemas({
        path: { datafontId: panelCreation.datafontId },
      }),
  });

  const {
    data: tablesData,
    refetch,
    isLoading: tablesIsLoading,
  } = useQuery({
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

  const {
    data: sqlData,
    mutate: executeSql,
    isPending,
    isError: sqlIsError,
    error: sqlError,
  } = useMutation<ExecuteSqlResponse, AxiosError<ApiError>, ExecuteSqlProps>({
    mutationKey: [reactQueryKeys.mutations.executeSqlMutation],
    mutationFn: dataFontsService.executeSql,
  });

  React.useEffect(() => {
    refetch();
  }, [schemaName, refetch]);

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
      return schemasData.schemas.map((s) => ({ label: s, value: s }));
    }
    return [];
  };

  const renderTables = () => {
    if (tablesData) {
      if (tablesData?.tables.length > 0) {
        return (
          <button className="flex flex-col text-sm">
            {tablesData?.tables.map((t, index) => (
              <div className="flex items-center gap-2" key={`${t}-${index}`}>
                <Sheet className="text-green-500" />
                <span>{t}</span>
              </div>
            ))}
          </button>
        );
      }
    }

    if (tablesIsLoading) {
      <Skeleton className="h-4 w-72" />;
    }

    return <NoData />;
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editor.addAction({
      id: 'run-query',
      label: 'Run Query',
      keybindings: [monaco.KeyMod.CtrlCmd + monaco.KeyCode.Enter],
      contextMenuGroupId: 'operation',
      contextMenuOrder: 0,
      run: () => {
        if (textSelectionRef.current) {
          executeSql({
            body: {
              sql: textSelectionRef.current,
              datafontId: panelCreation.datafontId,
            },
          });
        } else if (sqlRef.current) {
          executeSql({
            body: { sql: sqlRef.current, datafontId: panelCreation.datafontId },
          });
        }
      },
    });
    editor.onDidChangeCursorSelection(() => {
      const selection = editor.getSelection();
      if (selection) {
        const selectedText = editor.getModel().getValueInRange(selection);
        textSelectionRef.current = selectedText;
      }
    });
    setTimeout(() => {
      editor?.focus();
    }, 0);
  };

  const renderSqlResult = () => {
    if (isPending) {
      return (
        <div className="bg-zinc-50 px-4 py-1">
          <span className="text-sm font-semibold">Carregando...</span>
        </div>
      );
    }

    if (sqlData) {
      return (
        <ScrollArea className="h-full w-full">
          <table className="text-sm">
            <tr>
              {sqlData.metadata.columns.map((c, index) => (
                <th
                  key={`th-${c.name}-${c.dataType}-${index}`}
                  className="border bg-zinc-200/40 p-2 font-semibold"
                >
                  {c.name}
                </th>
              ))}
            </tr>
            {sqlData.rows.map((r, rIndex) => (
              <tr key={`tr-${rIndex}`}>
                {Object.keys(r).map((key, kIndex) => {
                  const value = r[key];
                  return (
                    <td
                      key={`td-${key}-${kIndex}-${rIndex}`}
                      className="border p-2"
                    >
                      {value === null ? 'null' : r[key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </table>
        </ScrollArea>
      );
    }

    if (sqlIsError && sqlError) {
      const message = sqlError.response?.data.message ?? UNEXPECTED_ERROR;

      return (
        <div className="flex flex-col bg-zinc-50 px-4 py-1">
          <span className="text-sm font-semibold">Erro</span>
          <span className="text-sm">{message}</span>
        </div>
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
        title="Selecionar objeto"
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbHome />
            <BreadcrumbLink to={APP_ROUTES.panels.index}>
              Paineis
            </BreadcrumbLink>
            <BreadcrumbLink to={APP_ROUTES.panel.index.replace(':id', id)}>
              {data.name}
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
                  value={schemaName}
                />
              </div>

              <span className="text-sm">
                Tabelas {tablesData ? `(${tablesData?.tables.length})` : '(0)'}
              </span>

              {renderTables()}
            </div>
          </div>
        }
        footer={null}
        className="h-layout-page flex flex-col"
      >
        <Editor
          height={400}
          width="100%"
          defaultLanguage="sql"
          language="sql"
          options={{ minimap: { enabled: false } }}
          className="border-b"
          onMount={handleEditorDidMount}
          onChange={(value) => {
            sqlRef.current = value;
          }}
        />

        <div className="flex items-center justify-between bg-zinc-100 px-4 py-2">
          <span>{`Resultados${
            sqlData ? ` (${sqlData.rows.length})` : ' (0)'
          }`}</span>

          <div className="flex items-center gap-4">
            <button>
              <img src="/icons/heart-fill.svg" alt="" className="w-[20px]" />
            </button>

            <Button
              size="sm"
              className="gap-2"
              onClick={() => {
                if (sqlRef.current) {
                  if (textSelectionRef.current) {
                    executeSql({
                      body: {
                        sql: textSelectionRef.current,
                        datafontId: panelCreation.datafontId,
                      },
                    });
                  } else {
                    executeSql({
                      body: {
                        sql: sqlRef.current,
                        datafontId: panelCreation.datafontId,
                      },
                    });
                  }
                }
              }}
            >
              Executar{' '}
              <span className="flex items-center text-[10px] text-sm text-zinc-200">
                Ctrl <CornerDownLeft size={14} />
              </span>
            </Button>
          </div>
        </div>
        {renderSqlResult()}
      </Layout>
    );
  }

  return null;
};
