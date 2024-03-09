import React from 'react';
import { Route, Routes } from 'react-router-dom';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Providers } from './components/providers';
import { LoginPage } from './pages/auth/login-page';
import { RegisterPage } from './pages/auth/register-page';
import { LandingPage } from './pages/brand/landing-page';
import { ConfigRoutes } from './pages/configuration/routes';
import { DataFontRoutes } from './pages/data-fonts/routes';
import { DocsRoutes } from './pages/docs/routes';
import { PanelRoutes } from './pages/panel/routes';
import { PanelsRoutes } from './pages/panels/routes';
import './styles/globals.css';

const App: React.FC = () => (
  <Providers>
    <Routes>
      <Route path="/" index element={<LandingPage />} />
      <Route path="/entrar" element={<LoginPage />} />
      <Route path="/cadastrar" element={<RegisterPage />} />
      <Route path="/fontes/*" element={<DataFontRoutes />} />
      <Route path="/config/*" element={<ConfigRoutes />} />
      <Route path="/paineis/*" element={<PanelsRoutes />} />
      <Route path="/painel/*" element={<PanelRoutes />} />
      <Route path="/docs/*" element={<DocsRoutes />} />
    </Routes>
  </Providers>
);

export default App;
