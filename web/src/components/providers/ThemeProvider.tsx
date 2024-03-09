import React from 'react';

import { THEME } from './constants';
import { Theme, ThemeProviderState } from './types';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

const initialState: ThemeProviderState = {
  theme: THEME.SYSTEM,
  setTheme: () => null,
};

export const ThemeProviderContext =
  React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = THEME.SYSTEM,
  storageKey = 'ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  React.useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(THEME.LIGHT, THEME.DARK);

    if (theme === THEME.SYSTEM) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? THEME.DARK
        : THEME.LIGHT;

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (_theme: Theme) => {
      localStorage.setItem(storageKey, _theme);
      setTheme(_theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
