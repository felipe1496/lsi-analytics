import { Breadcrumb, BreadcrumbNeutral } from '@/components/breadcrumb';
import { Layout } from '@/components/layout';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';
import { PanelCard } from '../components/PanelCard';
import FireImage from '@/assets/images/fire.jpg';
import { APP_ROUTER } from '@/constants/app-routes';

export const PanelsPage: React.FC = () => {
  return (
    <Layout
      className="layout-page flex flex-col gap-4"
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbNeutral>Paineis</BreadcrumbNeutral>
        </Breadcrumb>
      }
    >
      <div className="flex w-full items-center justify-between">
        <div>
          <Typography level="h3">Paneis</Typography>
          <Typography level="muted">Seus paineis</Typography>
        </div>

        <form className="flex gap-2">
          <Input className="w-96" placeholder="Buscar painel..." />
          <Button size="icon" type="submit">
            <Search />
          </Button>
        </form>
      </div>

      <Separator />

      <div className="grid grid-cols-4 gap-6">
        <PanelCard
          to={APP_ROUTER.panel.index.url.replace(':id', '1')}
          imageURL={FireImage}
          title="Incêndios na Paraíba"
        />
      </div>
    </Layout>
  );
};
