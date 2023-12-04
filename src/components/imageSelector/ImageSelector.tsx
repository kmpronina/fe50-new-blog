import useThemeColors from "#hooks/useThemeColors";
import { Box, Typography } from "@mui/material";
import React, { BaseSyntheticEvent, useRef } from "react";

interface Props {
  onChange: (newImage: string) => void;
  image: string | null;
}

const ImageSelector: React.FC<Props> = (props) => {
  const { onChange, image } = props;

  const { buttonBgColor, buttonTextColor } = useThemeColors();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageInput = (e: BaseSyntheticEvent) => {
    if (e.target.files.length === 0) return;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (readerEvent) => {
      onChange(readerEvent.target?.result as string);
    };
  };

  const handleImageSelect = () => {
    inputRef.current && inputRef.current.click();
  };

  return (
    <>
      <Box
        onClick={handleImageSelect}
        sx={{
          width: "150px",
          height: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: " center",
          color: buttonBgColor,
        }}
      >
        {image !== null ? (
          <img
            src={image}
            alt={"your pic"}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Typography sx={{ padding: "10px", color: buttonTextColor }}>
            Choose your image
          </Typography>
        )}
      </Box>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type={"file"}
        onChange={handleImageInput}
        accept="image/png, image/jpeg"
      />
    </>
  );
};

export default ImageSelector;
