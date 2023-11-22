import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { Layout } from '@/components/layout';
import { APP_ROUTER } from '@/constants/app-routes';
import { useParams } from 'react-router-dom';

export const PanelPage: React.FC = () => {
  const { id } = useParams();

  return (
    <Layout
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbLink to={APP_ROUTER.panels.index.url}>
            Paineis
          </BreadcrumbLink>
          <BreadcrumbNeutral>{id}</BreadcrumbNeutral>
        </Breadcrumb>
      }
      className="layout-page"
    >
      <h1 className="text-red-500">Painel do usuário</h1>
    </Layout>
  );
};
