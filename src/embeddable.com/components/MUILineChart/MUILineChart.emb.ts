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
      category: "Configure chart",
    },
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
      name: "availablePeriod",
      type: "timeRange",
      label: "Available Period",
      category: "Settings",
    },
    {
      name: "showCut",
      type: "boolean",
      label: "Show cut",
      category: "Settings",
    },
  ],
  events: [
    {
      name: "onXAxisClick",
      label: "On X-Axis Click",
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
      inputs: ["availablePeriod"],
      defaultValue: Value.noFilter(),
      events: [{ name: "onXAxisClick", property: "value" }],
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
            dimension: inputs.xAxis?.name || "",
            granularity: inputs.granularity,
          },
        ],
        measures: inputs.yAxis,
      }),
    };
  },
  events: {
    onXAxisClick: (v) => {
      if (!v) return { value: Value.noFilter() };
      console.log(v);
      return { value: v };
    },
  },
});
