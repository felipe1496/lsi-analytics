import React from 'react';

import { Layout } from '@/components/common/layout';

export const PanelAuditPage: React.FC = () => (
  <Layout
    alert={{
      message: 'Esta página está em desenvolvimento',
      type: 'warning',
    }}
  />
);
