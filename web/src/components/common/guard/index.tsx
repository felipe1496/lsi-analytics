import React from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';

import { UnauthorizedPage } from '../unauthorized-page';
import { ActionType, CanActivate } from './types';

export type GuardContext = {
  location: Location;
};

interface GuardProps {
  guards?: CanActivate[];
  protect?: React.ReactNode;
}

export const Guard: React.FC<GuardProps> = ({ guards, protect }) => {
  const [denied, setDenied] = React.useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const ctx = React.useMemo(
    () => ({
      location,
    }),
    [location],
  );

  const executeAction = React.useCallback(
    (action: ActionType) => {
      switch (action.action) {
        case 'redirect':
          navigate(action.url);
          break;
        case 'toast':
          action.fn();
          break;
        default:
          setDenied(true);
          break;
      }
    },
    [navigate],
  );

  React.useEffect(() => {
    (async () => {
      if (guards) {
        await Promise.all(
          guards.map(async (guard) => {
            const canActivate = await guard.canActivate(ctx);

            if (!canActivate) {
              if (guard.onDenied) {
                const action = guard.onDenied();
                if (Array.isArray(action)) {
                  action.forEach(executeAction);
                } else {
                  executeAction(action);
                }
              } else {
                setDenied(true);
              }
            }
          }),
        );
      }
    })();
  }, [guards, navigate, executeAction, ctx]);

  if (denied) {
    return <UnauthorizedPage />;
  }

  return <>{protect}</>;
};
