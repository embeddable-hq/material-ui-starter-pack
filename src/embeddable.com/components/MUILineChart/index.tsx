import React, { useState } from "react";
import { LineChart } from "@mui/x-charts";
import MUI from "../MUI";
import {
  DataResponse,
  Dataset,
  Dimension,
  Measure,
  TimeRange,
} from "@embeddable.com/core";
import Loading from "../util/Loading";
import Error from "../util/Error";
import ResizeListener from "../util/ResizeListener";

type Props = {
  title: string;
  area?: boolean;
  grid?: boolean;
  ds: Dataset;
  xAxis: Dimension;
  yAxis: Measure[];
  results: DataResponse;
  onPeriodChange: (period: { from: Date; to: Date }) => void;
};

export default (props: Props) => {
  const { xAxis, yAxis, results, title, area, grid, onPeriodChange } = props;

  const [cut, setCut] = useState<"beforeAxis" | "afterAxis">("beforeAxis");
  const [allowCut, setAllowCut] = useState(false);

  const { isLoading, data, error } = results;
  const [maxHeight, setMaxHeight] = useState(1000);
  const [interval, setInterval] = useState<TimeRange>({
    from: undefined,
    to: undefined,
  } as TimeRange);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error msg={error} />;
  }

  const formatData = data
    ?.map((d) => {
      const val = {
        ...d,
        [xAxis.name]: new Date(d[xAxis.name]),
      };
      yAxis.forEach((y) => (val[y.name] = parseInt(val[y.name])));
      return val;
    })
    .filter(
      (x) =>
        (!interval?.from || x[xAxis.name] >= interval.from) &&
        (!interval?.to || x[xAxis.name] <= interval.to)
    );

  const handleSetInterval = (param: any) => {
    const { axisValue } = param;

    if (cut === "beforeAxis") {
      console.log("start");
      const lastDate =
        interval?.to ||
        (results?.data
          ? new Date(results.data[results.data?.length - 1][xAxis.name])
          : null);

      setInterval({ from: axisValue, to: lastDate } as any);
    }

    if (cut === "afterAxis") {
      console.log("end");
      const firstDate =
        interval?.from ||
        (results?.data ? new Date(results.data[0][xAxis.name]) : null);

      setInterval({ from: firstDate, to: axisValue } as any);
    }

    setCut((prev) => (prev === "beforeAxis" ? "afterAxis" : "beforeAxis"));
  };

  return (
    <MUI>
      <ResizeListener onResize={(w, h) => setMaxHeight(h)} debounce={300}>
        <h1 style={{ position: "absolute", top: -20, left: 50 }}>{title}</h1>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 50,
            background: "blue",
            color: "white",
            padding: 10,
            zIndex: 1000,
            display: "flex",
            gap: 10,
          }}
        >
          <button onClick={() => setAllowCut((prev) => !prev)}>
            {allowCut ? "Disable" : "Enable"} cut
          </button>
          {allowCut
            ? cut === "beforeAxis"
              ? "click axis to remove what is before <-"
              : "click axis to remove what is after ->"
            : null}
        </div>
        <LineChart
          onAxisClick={(e, param) => allowCut && handleSetInterval(param)}
          xAxis={[
            {
              label: xAxis.title,
              dataKey: xAxis.name,
              valueFormatter: (value) => new Date(value).toLocaleDateString(),
            },
          ]}
          series={yAxis.map((y) => ({
            dataKey: y.name,
            label: y.title,
            valueFormatter: (value) => (value ? value?.toString() : ""),
            area,
          }))}
          dataset={formatData}
          grid={{ vertical: grid, horizontal: grid }}
        />
      </ResizeListener>
    </MUI>
  );
};
