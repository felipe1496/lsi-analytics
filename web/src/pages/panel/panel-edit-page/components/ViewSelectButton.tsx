import React from 'react';

import { PANEL } from '@/services/models/panel/constants';
import { ViewType } from '@/services/models/panel/types';
import { cn } from '@/utils';

import { usePanelEditContext } from '../../hooks/usePanelEditContext';

interface ViewSelectButtonProps {
  children?: React.ReactNode;
  value: ViewType;
}

export const ViewSelectButton: React.FC<ViewSelectButtonProps> = ({
  children,
  value,
}) => {
  const { selectedView, setSelectedView } = usePanelEditContext();

  return (
    <div className="flex flex-col items-center">
      <button
        className={cn(
          'rounded-full border p-4',
          selectedView === value && 'border-none bg-blue-500 text-zinc-50',
        )}
        onClick={() =>
          setSelectedView((prevState) => {
            if (prevState === value) {
              return null;
            }

            return value;
          })
        }
      >
        {children}
      </button>
      <span>{PANEL.SIMPLE_VIEW_TYPE_LABEL_MAPPER[value]}</span>
    </div>
  );
};
