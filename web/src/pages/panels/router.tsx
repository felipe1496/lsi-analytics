import { Route, Routes } from 'react-router-dom';

import { PanelsPage } from './panels-page';
import { APP_ROUTER } from '@/constants/app-routes';

export const PanelsRouter = () => {
  return (
    <Routes>
      <Route path={APP_ROUTER.panels.index.url} Component={PanelsPage} />
    </Routes>
  );
};
