import { defineOption, defineType } from "@embeddable.com/core";

enum MUISizeOptions {
  SMALL = "small",
  MEDIUM = "normal",
}

const MUISize = defineType("muiSize", {
  label: "MUI Size",
  optionLabel: (size: string) => size,
});

defineOption(MUISize, MUISizeOptions.SMALL);
defineOption(MUISize, MUISizeOptions.MEDIUM);

export default MUISize;
