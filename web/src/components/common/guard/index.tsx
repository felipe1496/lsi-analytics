/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React from 'react';

import { LoadingPage } from '../loading-page';

interface GuardProps {
  guards?: {
    guardFn: () => boolean | Promise<boolean>;
    onDenied?: () => void;
  }[];
  loadingElement?: React.ReactNode;
  canActivate?: boolean;
  children?: React.ReactNode;
  initialLoading?: boolean;
}

export const Guard: React.FC<GuardProps> = ({
  guards = [],
  loadingElement = <LoadingPage />,
  canActivate,
  children,
  initialLoading = true,
}) => {
  const [loading, setLoading] = React.useState<boolean>(initialLoading);
  const [denied, setDenied] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      for (const g of guards) {
        const _canActivate = await g.guardFn();
        if (!_canActivate) {
          if (g.onDenied) {
            g.onDenied();
          }
          setDenied(true);
        }
      }
      setLoading(false);
    })();
  }, [guards]);

  if (loading) {
    return <>{loadingElement}</>;
  }

  if (denied) {
    return <>Acesso negado!</>;
  }

  if (canActivate !== undefined || canActivate !== null) {
    if (canActivate) {
      return <>{children}</>;
    }

    return <>{loadingElement}</>;
  }

  return <>{children}</>;
};
