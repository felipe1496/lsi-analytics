import { ErrorMessage } from '@hookform/error-message';
import Editor, { BeforeMount, OnMount } from '@monaco-editor/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, CornerDownLeft, Sheet } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { FieldError } from '@/components/errors/field-error';
import { Layout } from '@/components/layout';
import { NoData } from '@/components/no-data';
import { NotFoundPage } from '@/components/not-found-page';
import { SimpleStepper } from '@/components/simple-stepper';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { APP_ROUTES } from '@/constants/app-routes';
import { REQUIRED_FIELD, UNEXPECTED_ERROR } from '@/constants/messages';
import { reactQueryKeys } from '@/constants/react-query-keys';
import { dataFontsService } from '@/services/datafonts';
import { favoriteQueriesService } from '@/services/favorite-queries';

import { useTheme } from '@/hooks/useTheme';
import { usePanelNewViewContext } from '../../hooks/usePanelNewViewContext';
import { usePanelQuery } from '../../hooks/usePanelQuery';
import { TYPE_STUDIO_LINK_MAPPER } from './constants';

type FormData = {
  name: string;
};

export const PanelNewViewObject: React.FC = () => {
  const [schemaName, setSchemaName] = React.useState<string>('');
  const [editorTheme, setEditorTheme] = React.useState<string | undefined>(
    undefined,
  );

  const sqlRef = React.useRef<string | undefined>();
  const textSelectionRef = React.useRef<string | undefined>();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: { name: '' },
  });

  const { viewCreation, setViewCreation, canAccessStep, setQueryData } =
    usePanelNewViewContext();

  const navigate = useNavigate();

  const { data: schemasData } = useQuery({
    queryKey: [
      reactQueryKeys.queries.findSchemasQuery,
      viewCreation.datafontId,
    ],
    queryFn: () =>
      dataFontsService.findSchemas({
        path: { datafontId: viewCreation.datafontId },
      }),
  });

  const { data: tablesData, isLoading: tablesIsLoading } = useQuery({
    queryKey: [
      reactQueryKeys.queries.findTablesQuery,
      schemaName,
      viewCreation.datafontId,
    ],
    queryFn: () => {
      if (schemaName) {
        return dataFontsService.findTables({
          path: { datafontId: viewCreation.datafontId, schemaName },
        });
      }
      return null;
    },
  });

  /* const { data: favoriteQueriesData } = useQuery({
    queryKey: [
      reactQueryKeys.queries.findAllFavoriteQueriesQuery,
      viewCreation.datafontId,
    ],
    queryFn: () => favoriteQueriesService.findAll(),
  }); */

  const { mutate: saveFavoriteQueryMutation } = useMutation({
    mutationFn: favoriteQueriesService.create,
    mutationKey: [
      reactQueryKeys.mutations.saveFavoriteQueryMutation,
      viewCreation.id,
    ],
  });

  /* const { mutate: deleteFavoriteQueryMutation } = useMutation({
    mutationFn: favoriteQueriesService.delete,
    mutationKey: [
      reactQueryKeys.mutations.deleteFavoriteQueryMutation,
      viewCreation.id,
    ],
  }); */

  const onSubmit = (formData: FormData) => {
    if (sqlRef.current) {
      saveFavoriteQueryMutation({
        body: {
          name: formData.name,
          datafontId: viewCreation.datafontId,
          sql: sqlRef.current,
        },
      });
    } else {
      setError('name', {
        type: 'manual',
        message: 'Sql vazio não pode ser salvo',
      });
    }
  };

  const {
    data: sqlData,
    mutate: executeSql,
    isPending,
    isError: sqlIsError,
    error: sqlError,
  } = useMutation({
    mutationKey: [reactQueryKeys.mutations.executeSqlMutation],
    mutationFn: dataFontsService.executeSql,
  });

  const { data, error } = usePanelQuery({ id });

  const getComboData = () => {
    if (schemasData) {
      return schemasData.schemas.map((s) => ({ label: s, value: s }));
    }
    return [];
  };

  const renderTables = () => {
    if (tablesData && tablesData.tables.length > 0) {
      return (
        <div className="flex flex-col text-sm">
          {tablesData.tables.map((t, index) => (
            <button
              className="flex items-center gap-2"
              key={`${t}-${index}`}
              onClick={() =>
                executeSql({
                  body: {
                    sql: `SELECT * FROM "${t}" LIMIT 100`,
                    datafontId: viewCreation.datafontId,
                  },
                })
              }
            >
              <Sheet className="text-green-500" />
              <span>{t}</span>
            </button>
          ))}
        </div>
      );
    }

    if (tablesIsLoading) {
      return (
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-32" />
        </div>
      );
    }

    return <NoData />;
  };

  const { theme } = useTheme();

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (root.classList.contains('dark')) {
      setEditorTheme('dark');
    } else {
      setEditorTheme(undefined);
    }
  }, [theme]);

  const handleBoforeMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme('dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '', background: '1f1f1f' },
        { token: '', background: '1f1f1f', foreground: 'd4d4d4' },
        { token: 'string.sql', foreground: '24b47e' },
        { token: 'comment', foreground: '666666' },
        { token: 'predefined.sql', foreground: 'D4D4D4' },
      ],
      colors: { 'editor.background': '#1f1f1f' },
    });
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
              datafontId: viewCreation.datafontId,
            },
          });
        } else if (sqlRef.current) {
          executeSql({
            body: { sql: sqlRef.current, datafontId: viewCreation.datafontId },
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
        <div className="bg-muted/40 px-4 py-1">
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
                  className="border bg-muted/50 p-2 font-semibold"
                >
                  <div className="flex gap-1">
                    <span>{c.name}</span>
                    <span className="text-[12px] font-medium text-muted-foreground">
                      {c.dataType}
                    </span>
                  </div>
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

  const handleNext = () => {
    if (sqlData && data) {
      setQueryData(sqlData);
      setViewCreation((prevState) => {
        const newState = { ...prevState };
        if (prevState.contentUpdate === 'STATIC') {
          Object.assign(newState, { staticData: sqlData, sql: sqlData.sql });
          return newState;
        }

        Object.assign(newState, { sql: sqlData.sql });
        return newState;
      });
      navigate(
        TYPE_STUDIO_LINK_MAPPER[viewCreation.type].replace(':id', data.id),
      );
    }
  };

  const render = () => {
    if (data && canAccessStep(3, data.id)) {
      return (
        <>
          <Editor
            theme={editorTheme}
            height={400}
            width="100%"
            defaultLanguage="sql"
            language="sql"
            options={{ minimap: { enabled: false } }}
            className="border-b"
            onMount={handleEditorDidMount}
            onChange={(value) => {
              clearErrors('name');
              sqlRef.current = value;
            }}
            beforeMount={handleBoforeMount}
          />

          <div className="flex items-center justify-between bg-muted px-4 py-2">
            <span className="text-sm">{`Resultados${
              sqlData ? ` (${sqlData.rows.length})` : ' (0)'
            }`}</span>

            <div className="flex items-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button>
                    <img src="/icons/heart-fill.svg" className="w-[20px]" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                      <DialogTitle>Favoritar query</DialogTitle>
                    </DialogHeader>
                    <div>
                      <Label>Nome</Label>
                      <Input
                        {...register('name', { required: REQUIRED_FIELD })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="name"
                        render={({ message }) => (
                          <FieldError message={message} />
                        )}
                      />
                    </div>
                    <DialogFooter className="mt-4">
                      <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DialogClose>
                      <Button type="submit">Salvar</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Button
                size="sm"
                className="gap-2"
                onClick={() => {
                  if (sqlRef.current) {
                    if (textSelectionRef.current) {
                      executeSql({
                        body: {
                          sql: textSelectionRef.current,
                          datafontId: viewCreation.datafontId,
                        },
                      });
                    } else {
                      executeSql({
                        body: {
                          sql: sqlRef.current,
                          datafontId: viewCreation.datafontId,
                        },
                      });
                    }
                  }
                }}
              >
                Executar{' '}
                <span className="flex items-center text-[10px] text-sm text-muted-foreground">
                  Ctrl <CornerDownLeft size={14} />
                </span>
              </Button>
            </div>
          </div>
          {renderSqlResult()}
          <div className="mt-auto flex justify-end gap-4 border-t px-4 py-2">
            <Link to={APP_ROUTES.panel.new.font}>
              <Button variant="outline">
                <ChevronLeft size={18} />
                Voltar
              </Button>
            </Link>

            <Button type="button" onClick={handleNext} disabled={!sqlData}>
              Próximo
              <ChevronRight size={18} />
            </Button>
          </div>
        </>
      );
    }

    return null;
  };

  const renderBreadbrumb = () => {
    if (data && id) {
      return (
        <Breadcrumb>
          <BreadcrumbHome />
          <BreadcrumbLink to={APP_ROUTES.panels.index}>Paineis</BreadcrumbLink>
          <BreadcrumbLink to={APP_ROUTES.panel.index.replace(':id', id)}>
            {data.name}
          </BreadcrumbLink>
          <BreadcrumbLink to={APP_ROUTES.panel.edit.replace(':id', id)}>
            Editar
          </BreadcrumbLink>
          <BreadcrumbNeutral>Nova visualização</BreadcrumbNeutral>
          <BreadcrumbNeutral>Objeto</BreadcrumbNeutral>
        </Breadcrumb>
      );
    }
    return null;
  };

  if (error || !id) {
    return <NotFoundPage />;
  }

  return (
    <Layout
      title="Selecionar objeto"
      breadcrumb={renderBreadbrumb()}
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

            {/* Funcionalidade despriorizada */}
            {/* {renderFavoriteQueries()} */}

            <span className="text-sm text-foreground">
              Tabelas {tablesData ? `(${tablesData?.tables.length})` : '(0)'}
            </span>

            {renderTables()}
          </div>
        </div>
      }
      footer={null}
      className="flex h-layout-page flex-col"
    >
      {render()}
    </Layout>
  );
};
