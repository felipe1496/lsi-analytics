import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PanelAuditPage } from './panel-audit-page';
import { PanelEditPage } from './panel-edit-page';
import { PanelNewViewLayout } from './panel-new-view/layout';
import { PanelNewViewConfig } from './panel-new-view/pages/config';
import { PanelNewViewDataFont } from './panel-new-view/pages/datafont';
import { PanelNewViewObject } from './panel-new-view/pages/object';
import { PanelViewStudioPieChartPage } from './panel-new-view/pages/studio/pages/pie-chart';
import { PanelViewStudioPieChartLayout } from './panel-new-view/pages/studio/pages/pie-chart/layout';
import { PanelPage } from './panel-page';

export const PanelRoutes: React.FC = () => (
  <Routes>
    <Route path=":id" element={<PanelPage />} />
    <Route path=":id/editar" element={<PanelEditPage />} />
    <Route path=":id/auditoria" element={<PanelAuditPage />} />
    <Route element={<PanelNewViewLayout />}>
      <Route path=":id/novo/visualizacao" element={<PanelNewViewConfig />} />
      <Route
        path=":id/novo/visualizacao/fonte"
        element={<PanelNewViewDataFont />}
      />
      <Route
        path=":id/novo/visualizacao/objeto"
        element={<PanelNewViewObject />}
      />
      <Route element={<PanelViewStudioPieChartLayout />}>
        <Route
          path=":id/novo/visualizacao/studio/pie"
          element={<PanelViewStudioPieChartPage />}
        />
      </Route>
    </Route>
  </Routes>
);
