import { isDimension, isMeasure, loadData } from '@embeddable.com/core';
import {
  defineComponent,
  EmbeddedComponentMeta,
  Inputs,
} from '@embeddable.com/react';

import Component from './index';

export const meta = {
  name: 'MUITable',
  label: 'Table',
  defaultHeight: 100,
  defaultWidth: 400,
  category: 'Material UI',
  classNames: ['overflow-scroll'], //defined in global.css
  inputs: [
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
  ],
} as const satisfies EmbeddedComponentMeta;

export default defineComponent(Component, meta, {
  props: (inputs: Inputs<typeof meta>) => {
    return {
      ...inputs,
      results: loadData({
        from: inputs.ds,
        dimensions: inputs.cols.filter((c) => isDimension(c)),
        measures: inputs.cols.filter((c) => isMeasure(c)),
      }),
    };
  },
});
