import { EmbeddedComponentMeta, defineComponent } from "@embeddable.com/react";

import Component from "./index";
import { Inputs } from "@embeddable.com/react";
import { isDimension, isMeasure, loadData } from "@embeddable.com/core";

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
      name: 'granularity',
      type: 'granularity',
      label: 'Granularity',
      defaultValue: 'week',
      category: 'Variables to configure',
    }
  ]
} as const satisfies EmbeddedComponentMeta;

export default defineComponent(Component, meta, {
  props: (inputs: Inputs<typeof meta>) => {
    return {
      ...inputs,
      results: loadData({
        from: inputs.ds,
        timeDimensions: [{
          dimension: inputs.xAxis.name,
          granularity: inputs.granularity
        }],
        measures: inputs.yAxis
      })
    };
  },
});
