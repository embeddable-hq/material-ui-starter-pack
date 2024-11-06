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

let timeout: number | null = null;

export default (props: Props) => {
  const { onChange, size, step, min, max } = props;
  const [value, setValue] = React.useState(props.value);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => {
      onChange(e.target.value);
    }, 100);
  }

  return (
    <MUI>
      <Slider
        value={value}
        step={step}
        min={min}
        max={max}
        size={"medium"}
        onChange={handleChange}
      />
    </MUI>
  )
}