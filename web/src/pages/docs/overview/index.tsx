import React from 'react';
import { Link } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbLink,
  BreadcrumbNeutral,
} from '@/components/breadcrumb';
import { Layout } from '@/components/layout';
import { Typography } from '@/components/typography';
import { APP_ROUTES } from '@/constants/app-routes';

import { NavBar } from '../components/NavBar';

export const Overview: React.FC = () => (
  <Layout
    breadcrumb={
      <Breadcrumb>
        <BreadcrumbHome />
        <BreadcrumbLink to={APP_ROUTES.docs.index}>Documentação</BreadcrumbLink>
        <BreadcrumbNeutral>Visão geral</BreadcrumbNeutral>
      </Breadcrumb>
    }
    leftBar={<NavBar />}
    className="layout-page"
  >
    <div>
      <Typography level="h3">Visão geral</Typography>
      <Typography level="p">
        <Link className="link" to={APP_ROUTES.panels.index}>
          LSI Analytics
        </Link>{' '}
        é uma plataforma de <strong>Business Intelligence</strong> focada na
        usabilidade do usuário. Com o intuíto de trazer a forma mais fácil de
        criar insights gráficos, nossa plataforma chega com uma interface fácil
        e intuitiva que vai proporcionar a análise de dados de forma
        extremamente eficiente.
      </Typography>
    </div>
  </Layout>
);
