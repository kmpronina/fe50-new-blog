import React, { ChangeEvent, PropsWithChildren } from "react";
import { TextField } from "@mui/material";
import useThemeColors from "#hooks/useThemeColors";

interface Props extends PropsWithChildren {
  width: string;
  name?: string;
  value?: string;
  error?: boolean;
  helperText?: string;
  label?: string;
  onChange: (e: ChangeEvent<any>) => void;
}
const FormInput: React.FC<Props> = (props) => {
  const { width, children, name, value, error, helperText, onChange } = props;

  const { inputBgColor, inputTextColor } = useThemeColors();

  const textfieldStyle = {
    width: width,
    backgroundColor: inputBgColor,
    color: "green",
    transition: "0.2s",
    borderRadius: "3px",
    "$:active": {
      color: inputTextColor,
    },
  };
  return (
    <TextField
      sx={textfieldStyle}
      name={name}
      value={value}
      error={error}
      helperText={helperText}
      onChange={onChange}
    >
      {children}
    </TextField>
  );
};
export default FormInput;
