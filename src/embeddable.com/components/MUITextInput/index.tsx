import React, { useEffect, useRef, useState } from 'react';

import { OverridableStringUnion } from '@mui/types';
import {
  Box,
  TextField,
  TextFieldPropsSizeOverrides,
  TextFieldVariants,
} from '@mui/material';

import MUI from '../MUI';
import ResizeListener from '../util/ResizeListener';
import { MUITheme } from '../types';

interface Props {
  fullWidth?: boolean;
  helperText?: string;
  multiline?: boolean;
  onChange: (v: string) => void;
  size?:
    | OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>
    | undefined;
  theme?: MUITheme;
  title?: string;
  value?: string;
  variant?: TextFieldVariants;
}

let timeout: number | null = null;

const Component: React.FC<Props> = (props: Props) => {
  const { fullWidth, helperText, multiline, size, theme, title, variant } =
    props;
  const ref = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string>(props.value || '');
  const [rowsVal, setRowsVal] = useState<number>(1);

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => {
      props.onChange(e.target.value);
    }, 500);
  };

  const handleRowSize = (w: number, h: number) => {
    // Adjusts height of multi-line textbox on resize
    // (If you want dynamic width, set fullWidth to true)
    let heightMod = helperText ? 1 : 0;
    setRowsVal(Math.ceil(h / 23) - 3 - heightMod);
  };

  return (
    <MUI theme={theme}>
      <ResizeListener onResize={handleRowSize} debounce={300}>
        <Box>
          <TextField
            fullWidth={fullWidth}
            helperText={helperText}
            label={title}
            multiline={multiline}
            onChange={handleChange}
            ref={ref}
            rows={rowsVal}
            size={size}
            variant={variant || undefined}
            value={value}
          />
        </Box>
      </ResizeListener>
    </MUI>
  );
};

export default Component;
