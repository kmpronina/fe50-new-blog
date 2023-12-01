import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "#store/store";
import { getBlogPostsToStoreFromTMS } from "#store/reducers/blogTMSReducer/actions";
import { BlogPostFromTMS } from "#models/BlogPost";
import AddPostDialog from "./addPostDialog";
import PostItem from "./PostItem";
import useThemeColors from "#hooks/useThemeColors";
import Pagination from "#components/pagination";
import { UpdatePostsByDataType } from "./types";

const Blog: React.FC = () => {
  const { posts: postsData } = useAppSelector((state) => state.blogTMSReducer);
  const { total, data: posts } = postsData;
  const dispatch = useAppDispatch();
  const { buttonBgColor, buttonTextColor, buttonBgHoverColor } =
    useThemeColors();

  const [activePage, setActivePage] = useState<number>(1);

  const [isAddPostDialogOpen, setIsAddPostDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    // dispatch(getBlogPostsToStoreFromTMS({ offset: 0, search: 'ф' }));
    //  dispatch(getBlogPostsToStoreFromTMS({ordering: 'title', search: 't'}))
    // dispatch( getBlogPostsToStoreFromTMS({limit: 1, search: 'фы'}))
    dispatch(getBlogPostsToStoreFromTMS({ offset: 0, limit: postPerPage }));
    // dispatch( getBlogPostsToStoreFromTMS({limit: 1, search: 'ф', offset: 1, ordering: 'title', author__course_group: 1}))
  }, []);

  const handleChangeDialogIsOpenStatus = (newStatus: boolean) => {
    setIsAddPostDialogOpen(newStatus);
  };

  // Logic for pagination
  const postPerPage = 10;

  const updatePosts = (data: UpdatePostsByDataType) => {
    const { currentPage } = data;
    setActivePage(currentPage);
    dispatch(
      getBlogPostsToStoreFromTMS({
        offset: (currentPage - 1) * postPerPage,
        limit: postPerPage,
      })
    );
  };

  const handlePageSelect = (newPage: number) => {
    updatePosts({ currentPage: newPage });
  };

  const buttonStyle = {
    backgroundColor: buttonBgColor,
    color: buttonTextColor,
    transition: "0.2s",
    marginLeft: "15px",
    "&:hover": {
      backgroundColor: buttonBgHoverColor,
    },
  };

  return (
    <Box>
      <Box
        sx={{
          display: " flex",
          gap: "15px",
          flexWrap: " wrap",
          justifyContent: "space-around",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={() => handleChangeDialogIsOpenStatus(true)}
          >
            Add new post
          </Button>
        </Box>
        <AddPostDialog
          open={isAddPostDialogOpen}
          onClose={() => setIsAddPostDialogOpen(false)}
        />
        {posts.map((post: BlogPostFromTMS) => (
          <PostItem post={post} />
        ))}
      </Box>
      <Pagination
        onPageChange={handlePageSelect}
        activePage={activePage}
        totalPostsCount={total}
        rowsPerPage={postPerPage}
      />
    </Box>
  );
};
export default Blog;
