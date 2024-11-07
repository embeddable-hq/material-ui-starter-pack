import React, { useState, useRef, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Box,
  TextField,
} from '@mui/material';
import {
  DataResponse,
  Dataset,
  DimensionOrMeasure,
} from '@embeddable.com/core';
import { useEmbeddableState } from '@embeddable.com/react';
import Error from '../util/Error';
import MUI from '../MUI';
import ResizeListener from '../util/ResizeListener';

export type Props = {
  ds: Dataset;
  cols: DimensionOrMeasure[];
  results: DataResponse;
  pageSize: number;
  onPageSizeChange?: (newPageSize: number) => void;
};

type PaginationState = {
  page: number;
  pageSize: number;
};

export default function MUITable({
  results,
  pageSize,
  onPageSizeChange,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const { isLoading, data, error } = results;
  const [maxHeight, setMaxHeight] = useState(1000);

  const [paginationState, setPaginationState] = useEmbeddableState({
    page: 0,
    pageSize: pageSize,
  }) as [
    PaginationState,
    (f: (state: PaginationState) => PaginationState) => void,
  ];

  const [inputPageSize, setInputPageSize] = useState(pageSize);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputPageSize > 0) {
        setPaginationState((state) => ({
          ...state,
          page: 0,
          pageSize: inputPageSize,
        }));
        onPageSizeChange?.(inputPageSize);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [inputPageSize, onPageSizeChange]);

  if (error) {
    return <Error msg={error} />;
  }

  const columns = data && data[0] ? Object.keys(data[0]) : [];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPaginationState((state) => ({ ...state, page: newPage }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPaginationState((state) => ({
      ...state,
      page: 0,
      pageSize: newPageSize,
    }));
    onPageSizeChange?.(newPageSize);
  };

  return (
    <MUI>
      <ResizeListener onResize={(w, h) => setMaxHeight(h)} debounce={300}>
        <Box
          ref={containerRef}
          position="relative"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
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
          <TableContainer
            sx={{
              flexGrow: 1,
              maxHeight: `calc(${maxHeight}px - 52px)`,
              opacity: isLoading ? 0.3 : 1,
              transition: 'opacity 0.2s',
            }}
            component={Paper}
          >
            <Table
              stickyHeader
              sx={{ minWidth: 0 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column}
                      sx={{
                        backgroundColor: '#f5f5f5',
                        fontWeight: 600,
                        borderBottom: '2px solid rgba(224, 224, 224, 1)',
                        '&:hover': {
                          backgroundColor: '#eeeeee',
                        },
                      }}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row: any, index: number) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column}>{row[column]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              borderTop: '1px solid rgba(224, 224, 224, 1)',
              minHeight: '52px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                type="number"
                size="small"
                value={inputPageSize}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (value > 0) {
                    setInputPageSize(value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const delta = e.key === 'ArrowUp' ? 10 : -10;
                    const newValue = Math.max(10, inputPageSize + delta);
                    setInputPageSize(newValue);
                  }
                }}
                sx={{
                  width: '50px',
                  marginRight: 1,
                  '& input': {
                    textAlign: 'right',
                    padding: '2px 4px',
                    fontSize: '0.875rem',
                  },
                  '& .MuiOutlinedInput-root': {
                    height: '28px',
                  },
                }}
                slotProps={{
                  input: {
                    inputProps: {
                      min: 10,
                      style: { paddingTop: 0, paddingBottom: 0 },
                    },
                  },
                }}
              />
              <span style={{ fontSize: '0.875rem' }}>Rows per page</span>
            </Box>

            <Box
              sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
            >
              <TablePagination
                ref={paginationRef}
                component="div"
                count={-1}
                page={paginationState?.page ?? 0}
                onPageChange={handleChangePage}
                rowsPerPage={paginationState?.pageSize ?? pageSize}
                rowsPerPageOptions={[]}
                labelRowsPerPage=""
                sx={{
                  flexShrink: 0,
                  position: 'relative',
                  '.MuiTablePagination-spacer': { display: 'none' },
                  '.MuiTablePagination-selectLabel': { display: 'none' },
                  '.MuiTablePagination-select': { display: 'none' },
                  '.MuiTablePagination-selectIcon': { display: 'none' },
                }}
                slotProps={{
                  actions: {
                    nextButton: {
                      disabled:
                        isLoading ||
                        (data?.length ?? 0) <
                          (paginationState?.pageSize ?? pageSize),
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </ResizeListener>
    </MUI>
  );
}
