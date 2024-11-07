import React, { useState } from 'react';
import {
  DataResponse,
  Dataset,
  DimensionOrMeasure,
} from '@embeddable.com/core';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import Error from '../util/Error';
import Loading from '../util/Loading';
import MUI from '../MUI';
import ResizeListener from '../util/ResizeListener';

type Props = {
  ds: Dataset;
  cols: DimensionOrMeasure[];
  results: DataResponse;
};

export default (props: Props) => {
  const { cols, results } = props;
  const { isLoading, data, error } = results;
  const [maxHeight, setMaxHeight] = useState(1000);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error msg={error} />;
  }

  return (
    <MUI>
      <ResizeListener onResize={(w, h) => setMaxHeight(h)} debounce={300}>
        <TableContainer sx={{ maxHeight: maxHeight }} component={Paper}>
          <Table
            stickyHeader
            sx={{ minWidth: 0 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                {cols.map((col) => (
                  <TableCell
                    key={col.name}
                    align={col.nativeType == 'number' ? 'right' : 'left'}
                  >
                    {col.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {cols.map((col) => (
                    <TableCell
                      key={col.name}
                      align={col.nativeType == 'number' ? 'right' : 'left'}
                    >
                      {row[col.name]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ResizeListener>
    </MUI>
  );
};
