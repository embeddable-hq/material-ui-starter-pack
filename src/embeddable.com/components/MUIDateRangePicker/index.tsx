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
  Time,
  TimeRange,
} from "@embeddable.com/core";
import Loading from "../util/Loading";
import Error from "../util/Error";
import ResizeListener from "../util/ResizeListener";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/node/AdapterDayjs/AdapterDayjs.js";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

function subtractOneMonth(date) {
  const result = new Date(date);
  result.setMonth(result.getMonth() - 1);
  return result;
}

function addOneMonth(date) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1);
  return result;
}

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

  const { value, onChange } = props;

  const handleDateChange = (date, what: "to" | "from") => {
    // Ensure date is converted to a valid Date instance
    const parsedDate = date instanceof Date ? date : new Date(date);

    onChange(
      (what === "from"
        ? { from: parsedDate, to: value?.to || addOneMonth(parsedDate) }
        : {
            to: parsedDate,
            from: value?.from || subtractOneMonth(parsedDate),
          }) as TimeRange
    );
  };
  console.log(value);
  return (
    <MUI>
      <ResizeListener onResize={(w, h) => setMaxHeight(h)} debounce={300}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <DatePicker
              label="Start date"
              value={value?.from ? dayjs(value?.from) : null}
              onChange={(newValue) => handleDateChange(newValue, "from")}
            />
            <DatePicker
              label="End date"
              value={value?.to ? dayjs(value?.to) : null}
              onChange={(newValue) => handleDateChange(newValue, "to")}
            />
          </div>
        </LocalizationProvider>
      </ResizeListener>
    </MUI>
  );
};
