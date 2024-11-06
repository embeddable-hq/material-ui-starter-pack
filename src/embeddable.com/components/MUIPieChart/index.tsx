import { DataResponse, Dataset, Dimension, DimensionOrMeasure, Measure } from "@embeddable.com/core";
import React, { useState } from "react";
import Loading from "../util/Loading";
import Error from "../util/Error";

type Props = {
  ds: Dataset;
  slice: Dimension;
  metric: Measure;
  results: DataResponse;
};

export default (props: Props) => {
  const { slice, metric, results } = props;
  const { isLoading, data, error } = results;

  if (isLoading) {
    return <Loading/>
  }
  if (error) {
    return <Error msg={error}/>;
  }

  return (
    <div>
      {data?.length}
    </div>
  )
}