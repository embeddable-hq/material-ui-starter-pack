import React, { useState } from "react";
import  { LineChart } from '@mui/x-charts';
import MUI from "../MUI";
import {
  DataResponse,
  Dataset,
  Dimension,
  DimensionOrMeasure,
  Measure,
} from "@embeddable.com/core";
import Loading from "../util/Loading";
import Error from "../util/Error";
import ResizeListener from "../util/ResizeListener";

type Props = {
  ds: Dataset;
  xAxis: Dimension;
  yAxis: Measure;
  results: DataResponse;
};

export default (props: Props) => {
  const { xAxis, yAxis, results } = props;
  const { isLoading, data, error } = results;
  const [maxHeight, setMaxHeight] = useState(1000);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error msg={error} />;
  }
  console.log(xAxis)
  console.log(yAxis)
  console.log(data)
  const customize = {
    height: 300,
    width: 500,
    margin: { top: 5 },
  };

  const formatData = data?.map(d => {
    return {
      ...d,
      [yAxis.name]: parseInt(d[yAxis.name]),
      [xAxis.name]: new Date(d[xAxis.name])
    }
  })

  console.log('for', formatData)

  return (
    <MUI>
      <ResizeListener onResize={(w, h) => setMaxHeight(h)} debounce={300}>
        <LineChart
          xAxis={[
            {
              dataKey: xAxis.name,
              valueFormatter: (value) => {
                console.log('val', new Date(value))
                return new Date(value).toLocaleDateString()              }
            },
          ]}
          series={[
            {
              dataKey: yAxis.name,
            },
          ]}
          dataset={formatData}
          {...customize}
        />
      </ResizeListener>
    </MUI>
  );
};
