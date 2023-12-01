import React, { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import useThemeColors from "#hooks/useThemeColors";
import ThemeController from "#components/themeController";

interface Props extends PropsWithChildren {}

const ContentWithPaddings: React.FC<Props> = (props) => {
  const { children } = props;
  const { backgroundColor, textColor, buttonBgColor } = useThemeColors();

  return (
    <Box
      sx={{
        padding: "0 15px",
        height: "100vh",
        background: backgroundColor,
        color: textColor,
        transition: "0.2s",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          display: "flex",
          margin: "0 -15px",
          justifyContent: "end",
          backgroundColor: buttonBgColor,
        }}
      >
        <ThemeController />
      </Box>
      {children}
    </Box>
  );
};
export default ContentWithPaddings;
