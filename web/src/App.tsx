import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Providers } from './components/providers';
import { AuthRouter } from './pages/auth/router';
import { LandingPage } from './pages/landing-page';
import { PanelRouter } from './pages/panel/router';
import { PanelsRouter } from './pages/panels/router';

import './styles/globals.css';

const App: React.FC = () => (
  <Providers>
    <BrowserRouter>
      <Routes>
        <Route index Component={LandingPage} />
      </Routes>
      <PanelRouter />
      <PanelsRouter />
      <AuthRouter />
    </BrowserRouter>
  </Providers>
);

export default App;
