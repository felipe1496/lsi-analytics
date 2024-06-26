import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PanelEditLayout } from './layout';
import { PanelAuditPage } from './panel-audit-page';
import { PanelEditPage } from './panel-edit-page';
import { PanelNewViewLayout } from './panel-new-view/layout';
import { PanelNewViewConfig } from './panel-new-view/pages/config';
import { PanelNewViewDataFont } from './panel-new-view/pages/datafont';
import { PanelNewViewObject } from './panel-new-view/pages/object';
import { PanelViewStudioBarChartPage } from './panel-new-view/pages/studio/pages/bar-chart';
import { PanelViewStudioBarChartLayout } from './panel-new-view/pages/studio/pages/bar-chart/layout';
import { PanelViewStudioLineChartPage } from './panel-new-view/pages/studio/pages/line-chart';
import { PanelViewStudioLineChartLayout } from './panel-new-view/pages/studio/pages/line-chart/layout';
import { PanelViewStudioNewViewPage } from './panel-new-view/pages/studio/pages/number-view';
import { PanelViewStudioNumberViewLayout } from './panel-new-view/pages/studio/pages/number-view/layout';
import { PanelViewStudioPieChartPage } from './panel-new-view/pages/studio/pages/pie-chart';
import { PanelViewStudioPieChartLayout } from './panel-new-view/pages/studio/pages/pie-chart/layout';
import { PanelViewStudioSelectFilterPage } from './panel-new-view/pages/studio/pages/select-filter';
import { PanelPage } from './panel-page';

export const PanelRoutes: React.FC = () => (
  <Routes>
    <Route path=":id" element={<PanelPage />} />
    <Route path=":id/auditoria" element={<PanelAuditPage />} />
    <Route element={<PanelEditLayout />}>
      <Route path=":id/editar" element={<PanelEditPage />} />
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
        <Route element={<PanelViewStudioBarChartLayout />}>
          <Route
            path=":id/novo/visualizacao/studio/bar"
            element={<PanelViewStudioBarChartPage />}
          />
        </Route>
        <Route element={<PanelViewStudioLineChartLayout />}>
          <Route
            path=":id/novo/visualizacao/studio/line"
            element={<PanelViewStudioLineChartPage />}
          />
        </Route>
        <Route element={<PanelViewStudioNumberViewLayout />}>
          <Route
            path=":id/novo/visualizacao/studio/number"
            element={<PanelViewStudioNewViewPage />}
          />
        </Route>
        <Route
          path=":id/novo/visualizacao/studio/select"
          element={<PanelViewStudioSelectFilterPage />}
        />
      </Route>
    </Route>
  </Routes>
);
