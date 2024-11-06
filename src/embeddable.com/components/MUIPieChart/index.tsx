import { DataResponse, Dataset, Dimension, DimensionOrMeasure, Measure } from "@embeddable.com/core";
import React, { useState } from "react";
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
};

const mapDataResponseToSeries = (responseData: Array<any>, slice: Dimension, metric: Measure) => {
  const data = responseData.map(it => ({
    value: it[metric.name],
    label: it[slice.name]
  }))
  return [{ data }]
}

export default (props: Props) => {
  const { slice, metric, results, showLegend } = props;
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
        slotProps={{ legend: { hidden: !showLegend } }}
      />
    </MUI>
  )
}