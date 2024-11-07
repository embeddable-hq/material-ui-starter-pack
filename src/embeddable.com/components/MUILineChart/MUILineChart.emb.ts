import { EmbeddedComponentMeta, defineComponent } from "@embeddable.com/react";

import Component from "./index";
import { Inputs } from "@embeddable.com/react";
import { isDimension, isMeasure, loadData, Value } from "@embeddable.com/core";

export const meta = {
  name: "MUILineChart",
  label: "Line Chart",
  defaultHeight: 100,
  defaultWidth: 400,
  category: "Material UI",
  classNames: ["overflow-scroll"], //defined in global.css
  inputs: [
    {
      name: "title",
      type: "string",
      label: "Title",
      category: "Settings",
    },
    {
      name: "area",
      type: "boolean",
      label: "Area",
      category: "Settings",
    },
    {
      name: "grid",
      type: "boolean",
      label: "Grid",
      category: "Settings",
    },
    {
      name: "ds",
      type: "dataset",
      label: "Dataset to display",
      category: "Configure chart",
    },
    {
      name: "xAxis",
      type: "dimension",
      label: "X-Axis",
      config: {
        dataset: "ds",
        supportedTypes: ["time"],
      },
      category: "Configure chart",
    },
    {
      name: "yAxis",
      type: "measure",
      array: true,
      label: "Y-Axis",
      config: {
        dataset: "ds",
      },
      category: "Configure chart",
    },
    {
      name: "granularity",
      type: "granularity",
      label: "Granularity",
      defaultValue: "week",
      category: "Variables to configure",
    },
    {
      name: "value",
      type: "timeRange",
      label: "Value",
      category: "Settings",
    },
  ],
  events: [
    {
      name: "onClick",
      label: "Click on point",
      properties: [
        {
          name: "value",
          type: "timeRange",
          label: "value",
        },
      ],
    },
  ],
  variables: [
    {
      name: "line chart point value",
      type: "timeRange",
      inputs: ["value"],
      defaultValue: Value.noFilter(),
      events: [{ name: "onClick", property: "value" }],
    },
  ],
} as const satisfies EmbeddedComponentMeta;

export default defineComponent(Component, meta, {
  props: (inputs: Inputs<typeof meta>) => {
    return {
      ...inputs,
      results: loadData({
        from: inputs.ds,
        timeDimensions: [
          {
            dimension: inputs.xAxis.name,
            granularity: inputs.granularity,
          },
        ],
        measures: inputs.yAxis,
      }),
    };
  },
  events: {
    onClick: (v) => {
      if (!v) return { value: Value.noFilter() };
      console.log("onClick2", { value: v });
      return { value: v };
    },
  },
  // events: {
  //   onPeriodChange: (v) => {
  //     return { value: v };
  //   },
  // },
});
