import { defineOption, defineType } from "@embeddable.com/core";

enum MUIVariantOptions {
  STANDARD = "standard",
  OUTLINED = "outlined",
  FILLED = "filled",
}

const MUIVariant = defineType("muiVariant", {
  label: "MUI Variant",
  optionLabel: (variant: string) => variant,
});

defineOption(MUIVariant, MUIVariantOptions.STANDARD);
defineOption(MUIVariant, MUIVariantOptions.OUTLINED);
defineOption(MUIVariant, MUIVariantOptions.FILLED);

export default MUIVariant;
