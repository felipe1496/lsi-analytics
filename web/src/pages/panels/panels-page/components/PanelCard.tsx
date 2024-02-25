import { Trash2 } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@/components/typography';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Separator } from '@/components/ui/separator';
import { APP_ROUTES } from '@/constants/app-routes';
import { PanelModel } from '@/services/models/panel/types';

import { useDeletePanelMutation } from '../hooks/useDeletePanelMutation';

interface PanelCardProps {
  data: PanelModel;
  onDelete?: (id: string) => void;
}

export const PanelCard: React.FC<PanelCardProps> = ({
  data,
  onDelete = () => {},
}) => {
  const { mutate } = useDeletePanelMutation({
    onSuccess: () => onDelete(data.id),
  });

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link
          to={APP_ROUTES.panel.index.replace(':id', data.id)}
          className="flex flex-col rounded-lg border shadow-sm hover:shadow"
        >
          <AspectRatio ratio={16 / 9}>
            <img
              src={data.imageURL ?? '/images/image-placeholder.jpg'}
              className="rounded-t-sm"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </AspectRatio>
          <Separator />
          <div className="p-2">
            <Typography level="small">{data.name}</Typography>
          </div>
        </Link>
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
