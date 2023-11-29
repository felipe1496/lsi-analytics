import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Providers } from './components/common/providers';
import { AuthRouter } from './pages/auth/router';
import { AccountRouter } from './pages/configuration/router';
import { DataFontRoutes } from './pages/data-fonts/routes';
import { DocsRouter } from './pages/docs/router';
import { MiscellaneousRouter } from './pages/miscellaneous/router';
import { PanelRouter } from './pages/panel/router';
import { PanelsRouter } from './pages/panels/router';
import './styles/globals.css';

const App: React.FC = () => (
  <Providers>
    <BrowserRouter>
      <PanelRouter />
      <PanelsRouter />
      <DataFontRoutes />
      <AuthRouter />
      <AccountRouter />
      <MiscellaneousRouter />
      <DocsRouter />
    </BrowserRouter>
  </Providers>
);

export default App;
