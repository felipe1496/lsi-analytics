import { Route, Routes } from 'react-router-dom';
import { PanelPage } from './panel-page';
import { APP_ROUTER } from '@/constants/app-routes';

export const PanelRouter = () => {
  return (
    <Routes>
      <Route path={APP_ROUTER.panel.index.url} Component={PanelPage} />
    </Routes>
  );
};
