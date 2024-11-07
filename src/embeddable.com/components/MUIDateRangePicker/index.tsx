import React, { useState } from 'react';
import MUI from '../MUI';
import { TimeRange } from '@embeddable.com/core';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/node/AdapterDayjs/AdapterDayjs.js';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Paper } from '@mui/material';
import { MUITheme } from '../types';

export type Props = {
  theme: MUITheme;
  value: TimeRange;
  onChange: (v: TimeRange | null) => void;
};

export default (props: Props) => {
  const [newPeriod, setNewPeriod] = useState<TimeRange>({
    to: undefined,
    from: undefined,
  } as TimeRange);

  const { value, onChange, theme } = props;

  React.useEffect(() => {
    setNewPeriod({ to: value?.to, from: value?.from } as TimeRange);
  }, [value]);

  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const handleStartDateChange = (date: any) => {
    const parsedDate = date instanceof Date ? date : new Date(date);

    const newNewPeriod = { ...newPeriod, from: parsedDate } as TimeRange;
    setNewPeriod(newNewPeriod);

    if (newNewPeriod?.to) {
      onChange(newNewPeriod);
    } else {
      setShowEnd(true);
    }

    setShowStart(false);
  };

  const handleEndDateChange = (date: any) => {
    const parsedDate = date instanceof Date ? date : new Date(date);
    const newNewPeriod = { ...newPeriod, to: parsedDate } as TimeRange;

    if (newNewPeriod?.from) {
      onChange(newNewPeriod);
    } else {
      setShowStart(true);
    }

    setShowEnd(false);
  };

  return (
    <MUI theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Paper style={{ height: 'inherit', width: 'inherit' }}>
            <DatePicker
              open={showStart}
              onOpen={() => setShowStart(true)}
              label="Start date"
              value={value?.from ? dayjs(value?.from) : null}
              onChange={handleStartDateChange}
            />
          </Paper>
          <Paper style={{ height: 'inherit', width: 'inherit' }}>
            <DatePicker
              open={showEnd}
              onOpen={() =>
                newPeriod?.from ? setShowEnd(true) : setShowStart(true)
              }
              label="End date"
              value={value?.to ? dayjs(value?.to) : null}
              onChange={handleEndDateChange}
            />
          </Paper>
        </div>
      </LocalizationProvider>
    </MUI>
  );
};
