import React from "react";
import { useDispatch } from "react-redux";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BlogPostFromTMS } from "#models/BlogPost";
import useThemeColors from "#hooks/useThemeColors";
import { setEditPostDialogDataFromTMS } from "#store/reducers/blogTMSReducer/actions";

interface Props {
  post: BlogPostFromTMS;
}

const PostItem: React.FC<Props> = (props) => {
  const { post } = props;
  const dispatch = useDispatch();

  const { cardBgColor, textColor, titleColor } = useThemeColors();

  const handleOpenEditDialog = () => {
    dispatch(setEditPostDialogDataFromTMS(post));
  };

  return (
    <Paper
      key={post.id}
      sx={{
        width: "550px",
        padding: "15px",
        backgroundColor: cardBgColor,
        transition: "0.2s",
      }}
    >
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Box sx={{ width: "250px", height: "250px" }}>
          <img
            style={{ width: "100%", height: "100%", borderRadius: "5px" }}
            src={post.image}
            alt={"random pic"}
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: titleColor,
                transition: "0.2s",
              }}
            >
              {post.title}
            </Typography>
            <IconButton
              sx={{ color: textColor, transition: "0.2s" }}
              onClick={handleOpenEditDialog}
            >
              <BorderColorIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            sx={{ color: textColor, transition: "0.2s" }}
          >
            {post.text}
          </Typography>
          <Typography sx={{ color: textColor, transition: "0.2s" }}>
            {post.description}
          </Typography>
          <Typography sx={{ color: textColor, transition: "0.2s" }}>
            {" "}
            {post.date}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default PostItem;
