import React from 'react';
import { Link } from 'react-router-dom';

import ImagePlaceholder from '@/assets/images/image-placeholder.jpg';
import { Typography } from '@/components/common/typography';
import { AspectRatio } from '@/components/common/ui/aspect-ratio';
import { Separator } from '@/components/common/ui/separator';

interface PanelCardProps {
  imageURL?: string;
  title: string;
  to: string;
}

export const PanelCard: React.FC<PanelCardProps> = ({
  imageURL,
  title,
  to,
}) => (
  <Link
    to={to}
    className="flex flex-col rounded-lg border shadow-sm hover:shadow"
  >
    <AspectRatio ratio={16 / 9}>
      <img
        src={imageURL ?? ImagePlaceholder}
        className="rounded-t-sm"
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    </AspectRatio>
    <Separator />
    <div className="p-2">
      <Typography level="small">{title}</Typography>
    </div>
  </Link>
);
