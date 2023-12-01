import React from "react";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Box, IconButton, List, ListItem } from "@mui/material";
import useThemeColors from "#hooks/useThemeColors";

interface Props {
  onPageChange: (newPage: number) => void;
  activePage: number;
  totalPostsCount: number;
  rowsPerPage: number;
}

const Pagination: React.FC<Props> = (props) => {
  const { onPageChange, activePage, totalPostsCount, rowsPerPage } = props;

  const { buttonTextColor, buttonBgHoverColor, buttonBgColor } =
    useThemeColors();

  const handleBackwardClick = () => {
    onPageChange(activePage - 1);
  };

  const handleForwardClick = () => {
    onPageChange(activePage + 1);
  };

  const handlePageSelect = (newPage: number) => {
    onPageChange(newPage);
  };

  const buttonStyle = {
    color: buttonTextColor,
    transition: "0.2s",
    "&:hover": {
      color: buttonBgHoverColor,
    },
  };

  const TotalCountOfPages = Math.ceil(totalPostsCount / rowsPerPage);

  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translate( -50%, 0)",
      }}
    >
      <List
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={handleBackwardClick}
          sx={buttonStyle}
          disabled={activePage <= 1}
        >
          <ArrowLeft />
        </IconButton>

        {Array.from({ length: TotalCountOfPages }).map((_, index) => (
          <ListItem
            sx={{
              display:
                index === 0 ||
                index === activePage ||
                index - 1 === activePage ||
                index + 1 === activePage ||
                index + 2 === activePage ||
                index + 1 === TotalCountOfPages
                  ? "flex"
                  : "none",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "6px",
              width: "27px",
              height: "27px",
              background:
                index + 1 === activePage ? buttonBgHoverColor : buttonBgColor,
              color: buttonTextColor,
            }}
            onClick={() => handlePageSelect(index + 1)}
          >
            {index + 1}
          </ListItem>
        ))}
        <IconButton onClick={handleForwardClick} sx={buttonStyle}>
          <ArrowRight />
        </IconButton>
      </List>
    </Box>
  );
};

export default Pagination;
