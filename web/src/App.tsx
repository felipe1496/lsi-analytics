import React from 'react';

import { Providers } from './components/common/providers';
import { AuthRouter } from './pages/auth/router';
import { AccountRouter } from './pages/configuration/router';
import { DocsRouter } from './pages/docs/router';
import { MiscellaneousRouter } from './pages/miscellaneous/router';
import { PanelRouter } from './pages/panel/router';
import { PanelsRouter } from './pages/panels/router';

import './styles/globals.css';

const App: React.FC = () => (
  <Providers>
    <PanelRouter />
    <PanelsRouter />
    <AuthRouter />
    <AccountRouter />
    <MiscellaneousRouter />
    <DocsRouter />
  </Providers>
);

export default App;
