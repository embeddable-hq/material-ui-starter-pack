import { Granularity, TimeRange, Value } from "@embeddable.com/core";
import {
  EmbeddedComponentMeta,
  Inputs,
  defineComponent,
} from "@embeddable.com/react";
import { endOfDay, startOfDay } from "date-fns";

import { timeRangeToUTC } from "../hooks/useTimezone";
import Component from "./index";

export const meta = {
  name: "MUIDateRangePicker",
  label: "Date range picker",
  defaultWidth: 300,
  defaultHeight: 50,
  classNames: ["on-top"],
  category: "Controls: inputs & dropdowns",
  inputs: [
    {
      name: "title",
      type: "string",
      label: "Title",
      category: "Settings",
    },
    {
      name: "value",
      type: "timeRange",
      label: "Value",
      category: "Settings",
    },
  ],
  events: [
    {
      name: "onChange",
      label: "Change Period",
      properties: [
        {
          name: "value",
          type: "timeRange",
          label: "value",
        },
      ],
    },
  ],
  variables: [
    {
      name: "date range value",
      type: "timeRange",
      inputs: ["value"],
      defaultValue: Value.noFilter(),
      events: [{ name: "onChange", property: "value" }],
    },
  ],
} as const satisfies EmbeddedComponentMeta;

export default defineComponent(Component, meta, {
  /* @ts-expect-error - to be fixed in @embeddable.com/react */
  props: (inputs: Inputs<typeof meta>) => {
    return {
      ...inputs,
    };
  },
  events: {
    onChange: (v) => {
      if (!v) return { value: Value.noFilter() };

      return { value: v };
    },
  },
});
