import { EmbeddedComponentMeta, defineComponent } from '@embeddable.com/react';

import Component from './index';
import { Inputs } from '@embeddable.com/react';
import { Value } from "@embeddable.com/core";

export const meta = {
  name: 'MUISlider',
  label: 'Slider',
  defaultHeight: 75,
  defaultWidth: 400,
  category: 'Material UI',
  classNames: ['margin-top-20'], //defined in global.css
  inputs: [
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
      category: 'Slider settings',
      defaultValue: 1
    },
    {
      name: 'min',
      type: 'number',
      label: 'Min',
      category: 'Slider settings',
      defaultValue: 0
    },
    {
      name: 'max',
      type: 'number',
      label: 'Max',
      category: 'Slider settings',
      defaultValue: 100
    },
    {
      name: 'enabled',
      type: 'boolean',
      label: 'Enabled',
      category: 'Slider settings',
      defaultValue: true
    },
    {
      name: 'marks',
      type: 'boolean',
      label: 'Show marks',
      category: 'Slider settings',
      defaultValue: false
    },
    {
      name: 'valueLabelDisplay',
      type: 'boolean',
      label: 'Show label values',
      category: 'Slider settings',
      defaultValue: false
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
  ],
  variables: [
    {
      name: 'Slider Value',
      type: 'number',
      defaultValue: Value.noFilter(),
      inputs: ['value'],
      events: [{ name: 'onChange', property: 'value' }]
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
    onChange: (value) => ({ value })
  }
});
