import { Value, loadData } from '@embeddable.com/core';
import {
  EmbeddedComponentMeta,
  Inputs,
  defineComponent,
} from '@embeddable.com/react';

import Component, { Props } from './index';

export const meta = {
  name: 'MUIDropdown',
  label: 'Dropdown',
  defaultWidth: 300,
  defaultHeight: 80,
  classNames: ['on-top'],
  category: 'Controls: inputs & dropdowns',
  inputs: [
    {
      name: 'ds',
      type: 'dataset',
      label: 'Dataset',
      description: 'Dataset',
      category: 'Dropdown values',
    },
    {
      name: 'property',
      type: 'dimension',
      label: 'Property',
      config: {
        dataset: 'ds',
      },
      category: 'Dropdown values',
    },
    {
      name: 'clearable',
      type: 'boolean',
      label: 'Clearable',
      category: 'Settings',
      defaultValue: true,
    },
    {
      name: 'multiValue',
      type: 'boolean',
      label: 'MultiValue',
      category: 'Settings',
      defaultValue: false,
    },
    {
      name: 'defaultValue',
      type: 'string',
      array: true,
      label: 'Default value',
      category: 'Pre-configured variables',
    },
    {
      name: 'placeholder',
      type: 'string',
      label: 'Placeholder',
      category: 'Settings',
    },
  ],
  events: [
    {
      name: 'onChange',
      label: 'Change',
      properties: [
        {
          name: 'value',
          type: 'string',
          array: true,
        },
      ],
    },
  ],
  variables: [
    {
      name: 'dropdown choice',
      type: 'string',
      array: true,
      defaultValue: Value.noFilter(),
      inputs: ['defaultValue'],
      events: [{ name: 'onChange', property: 'value' }],
    },
  ],
} as const satisfies EmbeddedComponentMeta;

export default defineComponent<Props, typeof meta>(Component, meta, {
  props: (inputs: Inputs<typeof meta>, [], clientContext) => {
    if (!inputs.ds)
      return {
        ...inputs,
        ...clientContext,
        options: [] as never,
      };

    return {
      ...inputs,
      options: loadData({
        from: inputs.ds,
        dimensions: inputs.property ? [inputs.property] : [],
      }),
    };
  },
  events: {
    onChange: (value) => {
      const newValue = value || [];
      return {
        value: newValue.length === 0 ? Value.noFilter() : newValue,
      };
    },
  },
});
