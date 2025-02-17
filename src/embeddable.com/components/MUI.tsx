import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache, Theme } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material';
import React, { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { MUITheme } from './types';

export default (props: { children: ReactNode; theme?: MUITheme }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [cache, setCache] = useState<EmotionCache>();
  const [theme, setTheme] = useState<Theme>();

  useLayoutEffect(() => {
    if (ref.current === null) return;

    const container = ref.current.parentElement as Element;

    const cache = createCache({
      key: 'css',
      prepend: false,
      container,
    });
    setCache(cache);

    const theme = createTheme({
      palette: {
        mode: props.theme,
      },
      components: {
        MuiPopover: {
          defaultProps: {
            container,
          },
        },
        MuiPopper: {
          defaultProps: {
            container,
          },
        },
        MuiModal: {
          defaultProps: {
            container,
          },
        },
      },
    });

    setTheme(theme);
  }, [props.theme]);

  if (!cache || !theme) return <div ref={ref} />;
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </CacheProvider>
  );
};
