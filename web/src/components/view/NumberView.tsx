import React from 'react';

import { NumberViewPresentation } from '@/pages/panel/panel-new-view/pages/studio/pages/number-view/contexts/PanelNewViewStudioNumberViewProvider';

interface NumberViewProps {
  data: NumberViewPresentation;
}

export const NumberView: React.FC<NumberViewProps> = ({ data }) => (
  <div className="flex h-full items-center justify-center">
    <div className="flex flex-col items-start">
      <span className="text-5xl font-semibold">{data.formattedValue}</span>
      {data.subTitle && <span className="font-semibold">{data.subTitle}</span>}
    </div>
  </div>
);
