import React from 'react';

import { DataTable } from '../ui/data-table';
import { Skeleton } from '../ui/skeleton';

interface LoadingTableProps {
  columns?: number;
  rows?: number;
}

export const LoadingTable: React.FC<LoadingTableProps> = ({
  columns = 5,
  rows = 3,
}) => {
  const columnDefs = Array.from({ length: columns }, (_, index) => ({
    accessorKey: `cell_${index}`,
    header: () => <Skeleton className="h-3 w-44" />,
    cell: () => <Skeleton className="h-3 w-52" />,
  }));

  const data = Array.from({ length: rows }, (_, rowIndex) => ({
    id: `row_${rowIndex}`,
  }));

  return <DataTable columns={columnDefs} data={data} />;
};
