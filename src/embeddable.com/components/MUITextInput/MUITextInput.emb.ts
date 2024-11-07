import { Value } from '@embeddable.com/core';
import {
  defineComponent,
  EmbeddedComponentMeta,
  Inputs,
} from '@embeddable.com/react';
import Component from './index';
import MUISize from '../../../types/MUISize.type.emb';
import MUIVariant from '../../../types/MUIVariant.type.emb';

export const meta = {
  name: 'MUITextInput',
  label: 'MUI Text Component',
  category: 'Text',
  inputs: [
    {
      name: 'title',
      type: 'string',
      label: 'Title',
      description: 'The title of the component',
      category: 'Basics',
    },
    {
      name: 'value',
      type: 'string',
      label: 'Initial value',
      category: 'Basics',
    },
    {
      name: 'helperText',
      type: 'string',
      label: 'Helper Text',
      description: 'Helper text goes below the component',
      category: 'Basics',
    },
    {
      name: 'variant',
      type: MUIVariant as never,
      defaultValue: 'standard',
      label: 'MUI Variant',
      description: 'Variant of the input field',
      category: 'MUI Props',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      label: 'Full Width',
      description: 'Should the input field take the full width',
      category: 'MUI Props',
      defaultValue: false,
    },
    {
      name: 'size',
      type: MUISize as never,
      defaultValue: 'normal',
      label: 'Size',
      description: 'Size of the input field',
      category: 'MUI Props',
    },
    {
      name: 'multiline',
      type: 'boolean',
      label: 'Multiline',
      description: 'Multiline text input',
      category: 'MUI Props',
      defaultValue: false,
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
        },
      ],
    },
  ],
  variables: [
    {
      name: 'Text Value',
      type: 'string',
      defaultValue: Value.noFilter(),
      inputs: ['value'],
      events: [{ name: 'onChange', property: 'value' }],
    },
  ],
} as const satisfies EmbeddedComponentMeta;

export default defineComponent(Component, meta, {
  props: (inputs: Inputs<typeof meta>, [], clientContext) => {
    return {
      ...inputs,
      ...clientContext,
    };
  },
  events: {
    onChange: (value) => {
      return { value: value || Value.noFilter() };
    },
  },
});
