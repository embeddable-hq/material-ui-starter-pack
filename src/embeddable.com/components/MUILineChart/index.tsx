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
import { Button } from "@mui/material";

type Props = {
  title: string;
  area?: boolean;
  grid?: boolean;
  ds: Dataset;
  xAxis: Dimension;
  yAxis: Measure[];
  results: DataResponse;
  availablePeriod: TimeRange;
  showCut: boolean;
  onXAxisClick: (period: { from: Date; to: Date } | null) => void;
};

export default (props: Props) => {
  const {
    xAxis,
    yAxis,
    results,
    title,
    area,
    grid,
    onXAxisClick,
    availablePeriod,
    showCut,
  } = props;

  const [cut, setCut] = useState<"beforeAxis" | "afterAxis">("beforeAxis");
  const [allowCut, setAllowCut] = useState(false);

  const { isLoading, data, error } = results;
  const [maxHeight, setMaxHeight] = useState(1000);

  if (isLoading) {
    return <Loading />;
  }
  if (!xAxis || !yAxis) {
    return <Error msg="Configuration misssing..." />;
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
        (!availablePeriod?.from || x[xAxis.name] >= availablePeriod.from) &&
        (!availablePeriod?.to || x[xAxis.name] <= availablePeriod.to)
    );

  const handleReset = () => {
    onXAxisClick(null);
  };
  const handleSetInterval = (param: any) => {
    const { axisValue } = param;

    if (cut === "beforeAxis") {
      const lastDate =
        availablePeriod?.to ||
        (results?.data
          ? new Date(results.data[results.data?.length - 1][xAxis.name])
          : null);

      setPointValue({ from: axisValue, to: lastDate } as any);
    }

    if (cut === "afterAxis") {
      const firstDate =
        availablePeriod?.from ||
        (results?.data ? new Date(results.data[0][xAxis.name]) : null);

      setPointValue({ from: firstDate, to: axisValue } as any);
    }

    setCut((prev) => (prev === "beforeAxis" ? "afterAxis" : "beforeAxis"));
  };
  const setPointValue = (value: any) => {
    onXAxisClick(value);
  };

  return (
    <MUI>
      <ResizeListener onResize={(w, h) => setMaxHeight(h)} debounce={300}>
        <h1 style={{ position: "absolute", top: -20, left: 50 }}>{title}</h1>

        {showCut && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 50,
              color: "white",
              background: "grey",
              padding: 10,
              borderRadius: 5,
              zIndex: 1000,
              display: "flex",
              gap: 10,
            }}
          >
            <Button onClick={() => setAllowCut((prev) => !prev)}>
              {allowCut ? "Disable" : "Enable"} cut
            </Button>
            {allowCut
              ? cut === "beforeAxis"
                ? "click axis to remove what is before <-"
                : "click axis to remove what is after ->"
              : null}
            {availablePeriod && <Button onClick={handleReset}>Reset</Button>}
          </div>
        )}
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
