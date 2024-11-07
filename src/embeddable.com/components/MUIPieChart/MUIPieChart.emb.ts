import { EmbeddedComponentMeta, defineComponent } from '@embeddable.com/react';

import Component from './index';
import { Inputs } from '@embeddable.com/react';
import { loadData } from '@embeddable.com/core';

export const meta = {
  name: 'MUIPieChart',
  label: 'Pie Chart',
  defaultHeight: 100,
  defaultWidth: 400,
  category: 'Material UI',
  inputs: [
    {
      name: 'ds',
      type: 'dataset',
      label: 'Dataset to display',
      category: 'Configure chart',
    },
    {
      name: 'slice',
      type: 'dimension',
      label: 'Slice',
      config: {
        dataset: 'ds',
      },
      category: 'Chart data',
    },
    {
      name: 'metric',
      type: 'measure',
      label: 'Metric',
      config: {
        dataset: 'ds',
      },
      category: 'Chart data',
    },
    {
      name: 'showLegend',
      type: 'boolean',
      label: 'Show Legend',
      category: 'Chart settings',
      defaultValue: false,
    },
    {
      name: 'innerRadius',
      type: 'number',
      label: 'Inner Radius',
      category: 'Chart settings',
    },
  ],
  events: [
    {
      name: 'onItemClick',
      label: 'On Item click',
      properties: [
        {
          name: 'value',
          type: 'number',
        },
        {
          name: 'formattedValue',
          type: 'string',
        },
        {
          name: 'label',
          type: 'string',
        },
      ],
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
        dimensions: [inputs.slice],
        measures: [inputs.metric],
      }),
    };
  },
  events: {
    onItemClick: (event) => event,
  },
});
