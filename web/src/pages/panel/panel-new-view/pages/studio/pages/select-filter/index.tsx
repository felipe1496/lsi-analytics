import { CheckIcon } from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { Layout } from '@/components/layout';
import {
  ListBox,
  ListBoxOption,
  ListBoxOptions,
  ListBoxTrigger,
} from '@/components/list-box';
import { NotFoundPage } from '@/components/not-found-page';
import { APP_ROUTES } from '@/constants/app-routes';
import { usePanelNewViewContext } from '@/pages/panel/panel-new-view/hooks/usePanelNewViewContext';
import { usePanelQuery } from '@/pages/panel/panel-new-view/hooks/usePanelQuery';

import { EditBar } from './components/EditBar';
import { useSelectFilterStore } from './hooks/useSelectFilterStore';

export const PanelViewStudioSelectFilterPage: React.FC = () => {
  const { id } = useParams();

  const { data, error } = usePanelQuery({ id });

  const { canAccessStep, queryData } = usePanelNewViewContext();

  const { selectedOption, setSelectedOption, category, reset } =
    useSelectFilterStore();

  React.useEffect(() => () => reset(), [reset]);

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
          <BreadcrumbNeutral>Estúdio</BreadcrumbNeutral>
        </Breadcrumb>
      );
    }
    return null;
  };

  const renderTrigger = () => {
    if (selectedOption && category) {
      return selectedOption[category];
    }
    return <span>Categoria</span>;
  };

  const render = () => {
    if (data && canAccessStep(4, data.id)) {
      return (
        <ListBox
          className="w-3/5"
          value={selectedOption}
          onChange={setSelectedOption}
        >
          <ListBoxTrigger>{renderTrigger()}</ListBoxTrigger>
          <ListBoxOptions>
            {queryData?.rows.map((s, index) => (
              <ListBoxOption key={`${s[category]}-${index}`} value={s}>
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {s[category]}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </ListBoxOption>
            ))}
          </ListBoxOptions>
        </ListBox>
      );
      /* return (
        <Select>
          <SelectTrigger className="w-1/2">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {selectData.map((option, index) => (
              <SelectItem key={`${option}-${index}`} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ); */
    }

    if (error || !id) {
      <NotFoundPage />;
    }

    return null;
  };

  return (
    <Layout
      footer={null}
      title="Estúdio"
      breadcrumb={renderBreadbrumb()}
      rightBar={<EditBar />}
      className="layout-page flex items-center justify-center"
    >
      {render()}
    </Layout>
  );
};
