import React, { useState } from "react";
import  { LineChart } from '@mui/x-charts';
import MUI from "../MUI";
import {
  DataResponse,
  Dataset,
  Dimension,
  Measure,
} from "@embeddable.com/core";
import Loading from "../util/Loading";
import Error from "../util/Error";
import ResizeListener from "../util/ResizeListener";

type Props = {
  ds: Dataset;
  xAxis: Dimension;
  yAxis: Measure[];
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

  const formatData = data?.map(d => {
    const val =  {
      ...d,
      [xAxis.name]: new Date(d[xAxis.name])
    }
    yAxis.forEach(y => val[y.name] = parseInt(val[y.name]))
    return val
  })

  return (
    <MUI>
      <ResizeListener onResize={(w, h) => setMaxHeight(h)} debounce={300}>
        <LineChart
          xAxis={[
            {
              label: xAxis.title,
              dataKey: xAxis.name,
              valueFormatter: (value) => new Date(value).toLocaleDateString()
            }
          ]}
          series={
            yAxis.map(y => (
              {
                dataKey: y.name, 
                label: y.title,
                valueFormatter: (value) => value ? value?.toString() : ''
              })
            )
          }
          dataset={formatData}
        />
      </ResizeListener>
    </MUI>
  );
};
