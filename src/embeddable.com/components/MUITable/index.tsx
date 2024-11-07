import React, { useState, useRef } from "react";
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
} from "@mui/material";
import {
  DataResponse,
  Dataset,
  DimensionOrMeasure,
} from "@embeddable.com/core";
import { useEmbeddableState } from "@embeddable.com/react";
import MUI from "../MUI";
import Error from "../util/Error";
import ResizeListener from "../util/ResizeListener";

export type Props = {
  ds: Dataset;
  cols: DimensionOrMeasure[];
  results: DataResponse;
  pageSize: number;
  pageSizeOptions: number[];
  onPageSizeChange?: (newPageSize: number) => void;
};

type PaginationState = {
  page: number;
  pageSize: number;
};

export default function MUITable({
  cols,
  results,
  pageSize,
  pageSizeOptions,
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
            height: "100%",
            display: "flex",
            flexDirection: "column",
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
              transition: "opacity 0.2s",
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
                        backgroundColor: "#f5f5f5",
                        fontWeight: 600,
                        borderBottom: "2px solid rgba(224, 224, 224, 1)",
                        "&:hover": {
                          backgroundColor: "#eeeeee",
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
          <TablePagination
            ref={paginationRef}
            component="div"
            count={-1}
            page={paginationState?.page ?? 0}
            onPageChange={handleChangePage}
            rowsPerPage={paginationState?.pageSize ?? pageSize}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={pageSizeOptions}
            sx={{
              flexShrink: 0,
              borderTop: "1px solid rgba(224, 224, 224, 1)",
              position: "relative",
            }}
            slotProps={{
              select: {
                MenuProps: {
                  container: containerRef.current,
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                  PaperProps: {
                    style: {
                      marginTop: "2px",
                      minWidth: "80px",
                      position: "absolute",
                      zIndex: 1300,
                    },
                  },
                  sx: {
                    "& .MuiMenu-list": {
                      padding: "4px 0",
                    },
                    "& .MuiPopover-root": {
                      position: "absolute !important",
                      left: "unset !important",
                      top: "unset !important",
                    },
                    "& .MuiMenu-paper": {
                      top: "100% !important",
                    },
                  },
                  disablePortal: true,
                  keepMounted: false,
                },
              },
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
      </ResizeListener>
    </MUI>
  );
}
