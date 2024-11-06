import { EmbeddedComponentMeta, defineComponent } from '@embeddable.com/react';

import Component from './index';
import { Inputs } from '@embeddable.com/react';
import { loadData } from "@embeddable.com/core";

export const meta = {
  name: 'MUISlider',
  label: 'Slider',
  defaultHeight: 100,
  defaultWidth: 400,
  category: 'Material UI',
  classNames: ['overflow-scroll'], //defined in global.css
  inputs: [
    {
      name: 'size',
      type: 'string',
      label: 'Size',
      category: 'Slider settings'
    },
    {
      name: 'value',
      type: 'number',
      label: 'Value',
      category: 'Slider settings'
    },
    {
      name: 'step',
      type: 'number',
      label: 'Step',
      category: 'Slider settings'
    },
    {
      name: 'min',
      type: 'number',
      label: 'Min',
      category: 'Slider settings'
    },
    {
      name: 'max',
      type: 'number',
      label: 'Max',
      category: 'Slider settings'
    },
  ],
  events: [
    {
      name: "onChange",
      label: "On slider change",
      properties: [
        {
          name: "value",
          type: "number"
        }
      ]
    }
  ]
} as const satisfies EmbeddedComponentMeta;

export default defineComponent(Component, meta, {
  props: (inputs: Inputs<typeof meta>) => {
    return {
      ...inputs
    };
  },
  events: {
    onChange: (event) => ({
      value: event.target.value
    })
  }
});
