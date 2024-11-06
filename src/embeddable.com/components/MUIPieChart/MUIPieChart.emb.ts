import { EmbeddedComponentMeta, defineComponent } from '@embeddable.com/react';

import Component from './index';
import { Inputs } from '@embeddable.com/react';

export const meta = {
  name: 'MUIPieChart',
  label: 'Pie Chart',
  defaultHeight: 100,
  defaultWidth: 400,
  category: 'Material UI',
  classNames: ['overflow-scroll'], //defined in global.css
  inputs: [
    {
      name: 'ds',
      type: 'dataset',
      label: 'Dataset to display',
      category: 'Configure chart'
    }
  ]
} as const satisfies EmbeddedComponentMeta;

export default defineComponent(Component, meta, {
  props: (inputs: Inputs<typeof meta>) => {
    return null
  }
});
