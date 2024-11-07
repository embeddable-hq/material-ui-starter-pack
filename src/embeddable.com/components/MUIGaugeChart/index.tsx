import React, { useEffect } from 'react';
import { DataResponse, DimensionOrMeasure } from '@embeddable.com/core';

import { Box, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts';

import Error from '../util/Error';
import Loading from '../util/Loading';
import MUI from '../MUI';
import ResizeListener from '../util/ResizeListener';
import { MUITheme } from '../types';

interface Props {
  cols?: DimensionOrMeasure[];
  description?: string;
  endAngle?: number;
  fontSize?: number;
  maxValue?: number;
  minValue?: number;
  results: DataResponse;
  showTotal?: boolean;
  startAngle?: number;
  theme?: MUITheme;
  title?: string;
}

const Component: React.FC<Props> = (props: Props) => {
  const {
    cols,
    description,
    endAngle,
    fontSize,
    maxValue,
    minValue,
    results,
    showTotal,
    startAngle,
    theme,
    title,
  } = props;

  // Data from the query
  const { data, error, isLoading } = results;

  // Calculated values
  const val = parseInt(data?.[0]?.[cols?.[0].name || ''], 10);
  const text = showTotal ? `${val} / ${maxValue}` : `${val}`;

  // Component state
  const [chartWidth, setChartWidth] = React.useState<number>(0);
  const [chartHeight, setChartHeight] = React.useState<number>(0);
  const [gaugeWidth, setGaugeWidth] = React.useState<number>(0);
  const [gaugeHeight, setGaugeHeight] = React.useState<number>(0);
  const [innerRadius, setInnerRadius] = React.useState<number>(0);
  const [isCalculating, setIsCalculating] = React.useState<boolean>(true);
  const [outerRadius, setOuterRadius] = React.useState<number>(0);

  // Runs whenever the chart is resized to make the gauge fit as well as possible
  const handleChartResize = (w: number, h: number) => {
    // Store these values for use in the useEffect below
    setChartWidth(w);
    setChartHeight(h);

    // Default to full chart if no values are set
    if (startAngle === undefined || endAngle === undefined) {
      setGaugeWidth(w);
      setGaugeHeight(h);
      setInnerRadius(Math.min(w, h) / 4);
      setOuterRadius(Math.min(w, h) / 3);
      return;
    }

    // Adjust spacing if the chart is an arch or half-circle
    let isArch = false;
    if (
      (startAngle >= 40 && startAngle <= 140) ||
      (startAngle <= -40 && startAngle >= -140)
    ) {
      isArch = true;
    }

    // Handle title and description height adjustments
    let heightMod = 0;
    if (title) {
      heightMod += 30;
    }
    if (description) {
      heightMod += 30;
    }

    // Calculate the gauge size based on the chart shape
    if (isArch) {
      setGaugeWidth(w);
      setGaugeHeight(h - heightMod);
      setInnerRadius(Math.floor(w / 2.5));
      setOuterRadius(Math.floor(w / 2.1));
    } else {
      setGaugeWidth(w);
      setGaugeHeight(h - heightMod);
      setInnerRadius(Math.min(w, h) / 4);
      setOuterRadius(Math.min(w, h) / 3);
    }
  };

  // Don't render the chart until we have values from the initial resize calculation
  useEffect(() => {
    if (
      gaugeWidth > 0 &&
      gaugeHeight > 0 &&
      innerRadius > 0 &&
      outerRadius > 0
    ) {
      setIsCalculating(false);
    }
  }, [gaugeWidth, gaugeHeight, innerRadius, outerRadius, setIsCalculating]);

  // Run a resize if the inputs change but the chart size doesn't
  useEffect(() => {
    if (!isCalculating) {
      handleChartResize(chartWidth, chartHeight);
    }
  }, [props]);

  if (isLoading || (isCalculating && !error)) {
    return (
      <ResizeListener onResize={handleChartResize} debounce={300}>
        <Loading />
      </ResizeListener>
    );
  }
  if (error) {
    return <Error msg={error} />;
  }

  return (
    <MUI theme={theme}>
      <ResizeListener onResize={handleChartResize} debounce={300}>
        <Box style={{ height: 'inherit', width: 'inherit' }}>
          {title && <Typography variant="h6">{title}</Typography>}
          {description && (
            <Typography variant="body1" gutterBottom>
              {description}
            </Typography>
          )}
          <Gauge
            desc={description}
            endAngle={endAngle}
            height={gaugeHeight}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: { fontSize },
              },
            }}
            text={text}
            title={title}
            value={val}
            valueMax={maxValue}
            valueMin={minValue}
            width={gaugeWidth}
          />
        </Box>
      </ResizeListener>
    </MUI>
  );
};

export default Component;
