import {
  EmbeddedComponentMeta,
  Inputs,
  defineComponent,
} from "@embeddable.com/react";
import {
  OrderBy,
  isDimension,
  isMeasure,
  loadData,
} from "@embeddable.com/core";
import Component from "./index";
import type { Props } from "./index";

export const meta = {
  name: "MUITable",
  label: "Table",
  defaultHeight: 100,
  defaultWidth: 400,
  category: "Material UI",
  classNames: ["overflow-scroll"],
  inputs: [
    {
      name: "ds",
      type: "dataset",
      label: "Dataset to display",
      category: "Configure chart",
    },
    {
      name: "cols",
      type: "dimensionOrMeasure",
      array: true,
      label: "Columns",
      config: {
        dataset: "ds",
      },
      category: "Configure chart",
    },
    {
      name: "pageSize",
      type: "number",
      label: "Rows per page",
      defaultValue: 10,
      category: "Pagination",
    },
  ],
} as const satisfies EmbeddedComponentMeta;

type State = {
  page: number;
  pageSize: number;
};

export default defineComponent<Props, typeof meta, State>(Component, meta, {
  props: (inputs: Inputs<typeof meta>, [state]) => {
    const { ds, cols } = inputs;
    const currentPage = state?.page || 0;
    const currentPageSize = state?.pageSize || inputs.pageSize || 10;

    return {
      ...inputs,
      pageSize: currentPageSize,
      results: loadData({
        from: ds,
        dimensions: cols.filter((c) => isDimension(c)),
        measures: cols.filter((c) => isMeasure(c)),
        limit: currentPageSize,
        offset: currentPageSize * currentPage,
      }),
    };
  },
});
