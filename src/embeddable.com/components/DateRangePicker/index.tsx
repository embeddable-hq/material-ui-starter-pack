import React, { useState } from "react";
import { LineChart } from "@mui/x-charts";
import MUI from "../MUI";
import {
  DataResponse,
  Dataset,
  Dimension,
  DimensionOrMeasure,
  Granularity,
  Measure,
  TimeRange,
} from "@embeddable.com/core";
import Loading from "../util/Loading";
import Error from "../util/Error";
import ResizeListener from "../util/ResizeListener";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import  AdapterDayjs from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import dayjs from 'dayjs';

export type Props = {
  defaultPeriod?: TimeRange;
  defaultGranularity?: Granularity;
  showGranularity?: boolean;
  onChange: (v: TimeRange | null) => void;
  onChangeComparison: (v: TimeRange | null) => void;
  onChangePeriod: (v: TimeRange | null) => void;
  onChangeGranularity: (v: Granularity | null) => void;
  value: TimeRange;
};

export default (props: Props) => {
  const [maxHeight, setMaxHeight] = useState(1000);
  const shortcutsItems = [
    {
      label: 'This Week',
      getValue: () => {
        const today = dayjs();
        return [today.startOf('week'), today.endOf('week')];
      },
    },
    {
      label: 'Last Week',
      getValue: () => {
        const today = dayjs();
        const prevWeek = today.subtract(7, 'day');
        return [prevWeek.startOf('week'), prevWeek.endOf('week')];
      },
    },
    {
      label: 'Last 7 Days',
      getValue: () => {
        const today = dayjs();
        return [today.subtract(7, 'day'), today];
      },
    },
    {
      label: 'Current Month',
      getValue: () => {
        const today = dayjs();
        return [today.startOf('month'), today.endOf('month')];
      },
    },
    {
      label: 'Next Month',
      getValue: () => {
        const today = dayjs();
        const startOfNextMonth = today.endOf('month').add(1, 'day');
        return [startOfNextMonth, startOfNextMonth.endOf('month')];
      },
    },
    { label: 'Reset', getValue: () => [null, null] },
  ];
  

  return (
    <MUI>
      <ResizeListener onResize={(w, h) => setMaxHeight(h)} debounce={300}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker
              defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
            />
      </LocalizationProvider>
      </ResizeListener>
    </MUI>
  );
};
