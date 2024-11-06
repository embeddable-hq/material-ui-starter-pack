import { DataResponse, Dataset, Dimension, Measure } from "@embeddable.com/core";
import React from "react";
import { PieChart } from '@mui/x-charts';
import Loading from "../util/Loading";
import Error from "../util/Error";
import MUI from "../MUI";

type Props = {
  ds: Dataset;
  slice: Dimension;
  metric: Measure;
  showLegend: boolean;
  results: DataResponse;
  onItemClick: (event: any) => void;
};

const mapDataResponseToSeries = (responseData: Array<any>, slice: Dimension, metric: Measure) => {
  const data = responseData.map(it => ({
    value: it[metric.name],
    label: it[slice.name]
  }))
  return [{ data }]
}

export default (props: Props) => {
  const { slice, metric, results, showLegend, onItemClick } = props;
  const { isLoading, data, error } = results;

  if (isLoading) {
    return <Loading/>
  }
  if (error) {
    return <Error msg={error}/>;
  }
  const seriesData = mapDataResponseToSeries(data, slice, metric)
  return (
    <MUI>
      <PieChart
        series={seriesData}
        onItemClick={(
          event,
          params,
          pieValue
        ) => {
          const { value, formattedValue, label } = pieValue
          onItemClick({ value, formattedValue, label })
        }}
        slotProps={{ legend: { hidden: !showLegend } }}
      />
    </MUI>
  )
}