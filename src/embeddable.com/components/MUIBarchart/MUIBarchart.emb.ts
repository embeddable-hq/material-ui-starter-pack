import {
  defineComponent,
  EmbeddedComponentMeta,
  Inputs,
} from '@embeddable.com/react';
import { loadData } from '@embeddable.com/core';

import Component, { Props } from './index';

export const meta = {
  name: 'MUIBarchart',
  label: 'BarChart',
  category: 'Material UI',
  inputs: [
    {
      name: 'ds',
      type: 'dataset',
      label: 'Dataset',
      description: 'Dataset',
    },
    {
      name: 'xAxis',
      type: 'dimension',
      label: 'xAxis',
      description: 'X-Axis',
      config: {
        dataset: 'ds',
      },
    },
    {
      name: 'metrics',
      type: 'measure',
      label: 'Metrics',
      description: 'Metrics',
      array: true,
      config: {
        dataset: 'ds',
      },
    },
  ],
} as const satisfies EmbeddedComponentMeta;

export default defineComponent(Component, meta, {
  props: (inputs: Inputs<typeof meta>, [], clientContext) => {
    return {
      ...inputs,
      ...clientContext,
      results: loadData({
        from: inputs.ds,
        dimensions: [inputs.xAxis],
        measures: inputs.metrics,
      }),
    };
  },
});
