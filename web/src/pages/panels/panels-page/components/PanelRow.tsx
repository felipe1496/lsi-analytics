import dayjs from 'dayjs';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { APP_ROUTES } from '@/constants/app-routes';
import { DATE_FORMATS } from '@/constants/date-formats';
import { PanelModel } from '@/services/models/panel/types';

import { useDeletePanelMutation } from '../hooks/useDeletePanelMutation';

interface PanelRowProps {
  data: PanelModel;
  onDelete?: (id: string) => void;
}

export const PanelRow: React.FC<PanelRowProps> = ({
  data,
  onDelete = () => {},
}) => {
  const { mutate } = useDeletePanelMutation({
    onSuccess: () => onDelete(data.id),
  });

  const navigate = useNavigate();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <tr
          className="cursor-pointer"
          onClick={() =>
            navigate(APP_ROUTES.panel.index.replace(':id', data.id))
          }
        >
          <td>
            <div className="flex items-center gap-4">
              <img
                src={data.imageURL ?? '/images/image-placeholder.jpg'}
                className="h-[48px] w-[80px] rounded-t-sm"
              />

              {data.name}
            </div>
          </td>
          <td>{data.description}</td>
          <td>{dayjs(data.createdAt).format(DATE_FORMATS.dayMonthYear)}</td>
        </tr>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className="flex w-full items-center gap-2 text-red-500"
          onClick={() => mutate({ path: { id: data.id } })}
        >
          <Trash2 size={18} />
          Excluir
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
