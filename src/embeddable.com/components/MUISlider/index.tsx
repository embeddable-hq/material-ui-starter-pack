import React from "react";
import MUI from "../MUI";
import { Slider } from "@mui/material";

type Props = {
  onChange: (event: any) => void;
  value: number;
  size: string;
  step: number;
  min: number;
  max: number
};


export default (props: Props) => {
  const { value, onChange, size, step, min, max } = props;
  // TODO: 1) debounce; 2)
  return (
    <MUI>
      <Slider
        value={value}
        step={step}
        min={min}
        max={max}
        size={"medium"}
        onChange={onChange}
      />
    </MUI>
  )
}