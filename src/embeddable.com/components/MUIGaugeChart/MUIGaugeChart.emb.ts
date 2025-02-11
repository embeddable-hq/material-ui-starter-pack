import { isDimension, isMeasure, loadData } from '@embeddable.com/core';
import {
  defineComponent,
  EmbeddedComponentMeta,
  Inputs,
} from '@embeddable.com/react';

import Component from './index';

export const meta = {
  name: 'MUIGaugeChart',
  label: 'MUI Gauge Chart',
  category: 'Charts',
  inputs: [
    {
      name: 'title',
      type: 'string',
      label: 'Title',
      description: 'The title of the component',
      category: 'Text',
    },
    {
      name: 'description',
      type: 'string',
      label: 'Description',
      category: 'Text',
    },
    {
      name: 'fontSize',
      type: 'number',
      label: 'Font Size',
      category: 'Text',
      defaultValue: 24,
    },
    {
      name: 'ds',
      type: 'dataset',
      label: 'Dataset to display',
      category: 'Configure chart',
    },
    {
      name: 'cols',
      type: 'dimensionOrMeasure',
      array: true,
      label: 'Columns',
      config: {
        dataset: 'ds',
      },
      category: 'Configure chart',
    },
    {
      name: 'minValue',
      type: 'number',
      label: 'Min Value',
      category: 'Values',
      defaultValue: 0,
    },
    {
      name: 'maxValue',
      type: 'number',
      label: 'Max Value',
      category: 'Values',
      defaultValue: 100,
    },
    {
      name: 'showTotal',
      type: 'boolean',
      label: 'Show Total',
      category: 'Settings',
      defaultValue: false,
    },
    {
      name: 'startAngle',
      type: 'number',
      label: 'Start Angle',
      category: 'Settings',
      defaultValue: 0,
    },
    {
      name: 'endAngle',
      type: 'number',
      label: 'End Angle',
      category: 'Settings',
      defaultValue: 360,
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
        dimensions: inputs.cols.filter((c) => isDimension(c)),
        measures: inputs.cols.filter((c) => isMeasure(c)),
      }),
    };
  },
});
