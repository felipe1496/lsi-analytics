import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Providers } from './components/providers';
import { AccountRouter } from './pages/configuration/router';
import { AuthRouter } from './pages/auth/router';
import { MiscellaneousRouter } from './pages/miscellaneous/router';
import { PanelRouter } from './pages/panel/router';
import { PanelsRouter } from './pages/panels/router';
import './styles/globals.css';

const App: React.FC = () => (
  <Providers>
    <BrowserRouter>
      <MiscellaneousRouter />
      <PanelRouter />
      <PanelsRouter />
      <AuthRouter />
      <AccountRouter />
    </BrowserRouter>
  </Providers>
);

export default App;
