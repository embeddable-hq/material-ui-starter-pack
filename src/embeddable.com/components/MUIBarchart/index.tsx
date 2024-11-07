import {
  DataResponse,
  Dataset,
  Dimension,
  Measure,
} from '@embeddable.com/core';
import React from 'react';
import MUI from '../MUI';
import Error from '../util/Error';
import { BarChart } from '@mui/x-charts';
import { Box, CircularProgress, Paper } from '@mui/material';
import { MUITheme } from '../types';

type Props = {
  theme: MUITheme;
  ds: Dataset;
  xAxis: Dimension;
  metrics: Measure[];
  results: DataResponse;
};

export default (props: Props) => {
  const { xAxis, metrics, results } = props;
  const { isLoading, data, error } = results;

  if (error) {
    return <Error msg={error} />;
  }

  const labels =
    data?.map((d) => {
      return d[xAxis.name];
    }) || ([] as string[]);
  const series =
    metrics?.map((m) => {
      return {
        data: data?.map((d) => parseFloat(d[m.name])) || [],
        label: m.title,
      };
    }) || [];

  return (
    <MUI theme={props.theme}>
      <Paper style={{ height: 'inherit', width: 'inherit' }}>
        {isLoading && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="rgba(255, 255, 255, 0.7)"
            zIndex={1}
          >
            <CircularProgress />
          </Box>
        )}

        <BarChart
          xAxis={[{ scaleType: 'band', data: labels }]}
          series={series}
          barLabel="value"
        />
      </Paper>
    </MUI>
  );
};
