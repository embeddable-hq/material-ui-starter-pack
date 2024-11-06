import React, { useEffect } from 'react';
import { DataResponse, DimensionOrMeasure } from '@embeddable.com/core';

import { Typography } from '@mui/material';
import { Gauge } from '@mui/x-charts';

import Error from '../util/Error';
import Loading from '../util/Loading';
import MUI from '../MUI';
import ResizeListener from '../util/ResizeListener';

interface Props {
  cols?: DimensionOrMeasure[];
  description?: string;
  endAngle?: number;
  height?: number;
  innerRadius?: number;
  maxValue?: number;
  minValue?: number;
  outerRadius?: number;
  results: DataResponse;
  showTotal?: boolean;
  startAngle?: number;
  title?: string;
  // value?: number;
  width?: number;
}

const Component: React.FC<Props> = (props: Props) => {
  const {
    cols,
    description,
    endAngle,
    height,
    innerRadius,
    maxValue,
    minValue,
    outerRadius,
    results,
    showTotal,
    startAngle,
    title,
    // value,
    width,
  } = props;

  const { data, error, isLoading } = results;
  const val = parseInt(data?.[0]?.[cols?.[0].name || ''], 10);
  const text = showTotal ? `${val} / ${maxValue}` : `${val}`;

  const [calcWidth, setCalcWidth] = React.useState<number>(width || 0);
  const [calcHeight, setCalcHeight] = React.useState<number>(height || 0);
  const [calcInnerRadius, setCalcInnerRadius] = React.useState<number>(
    innerRadius || 0,
  );
  const [calcOuterRadius, setCalcOuterRadius] = React.useState<number>(
    outerRadius || 0,
  );
  const [isCalculating, setIsCalculating] = React.useState<boolean>(true);

  const handleChartResize = (w: number, h: number) => {
    setCalcWidth(w);
    setCalcHeight(h - 80);
    setCalcInnerRadius(Math.min(w, h) / 4);
    setCalcOuterRadius(Math.min(w, h) / 3);
  };

  useEffect(() => {
    if (
      calcWidth > 0 &&
      calcHeight > 0 &&
      calcInnerRadius > 0 &&
      calcOuterRadius > 0
    ) {
      setIsCalculating(false);
    }
  }, [
    calcWidth,
    calcHeight,
    calcInnerRadius,
    calcOuterRadius,
    setIsCalculating,
  ]);

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
    <MUI>
      <ResizeListener onResize={handleChartResize} debounce={300}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1" gutterBottom>
          {description}
        </Typography>
        <Gauge
          endAngle={endAngle}
          height={calcHeight}
          innerRadius={calcInnerRadius}
          outerRadius={calcOuterRadius}
          startAngle={startAngle}
          value={val}
          valueMax={maxValue}
          valueMin={minValue}
          text={text}
          width={calcWidth}
        />
      </ResizeListener>
    </MUI>
  );
};

export default Component;
