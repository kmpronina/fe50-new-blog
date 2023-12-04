import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "#store/store";
import {
  getBlogPostsToStoreFromTMS,
  setAuthors,
} from "#store/reducers/blogTMSReducer/actions";
import { BlogPostFromTMS } from "#models/BlogPost";
import AddPostDialog from "../addPostDialog";
import PostItem from "./PostItem";
import useThemeColors from "#hooks/useThemeColors";
import Pagination from "#components/pagination";
import { UpdatePostsByDataType } from "./types";
import EditPostDialog from "#containers/editPostDialog";
import { getPostsFromTMS } from "#api/services/postServices/postServices";

const Blog: React.FC = () => {
  const { posts: postsData } = useAppSelector((state) => state.blogTMSReducer);
  const { searchString } = useAppSelector((state) => state.blogTMSReducer);
  const { total, data: posts } = postsData;
  const dispatch = useAppDispatch();
  const { buttonBgColor, buttonTextColor, buttonBgHoverColor } =
    useThemeColors();

  const [activePage, setActivePage] = useState<number>(1);
  // const [searchedPosts, setSearchedPosts] = useState<BlogPostFromTMS[]>([]);

  const [isAddPostDialogOpen, setIsAddPostDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(getBlogPostsToStoreFromTMS({ offset: 0, limit: postPerPage }));
  }, [dispatch]);

  useEffect(() => {
    if (searchString.length > 0) {
      dispatch(
        getBlogPostsToStoreFromTMS({ search: searchString, limit: total })
      );
      // setSearchedPosts(
      //   posts.filter((post) =>
      //     post.title.toLowerCase().includes(searchString.toLowerCase())
      //   )
      // );
    } else {
      // If searchString is empty return 10 posts per page with pagination
      dispatch(getBlogPostsToStoreFromTMS({ offset: 0, limit: postPerPage }));
      setActivePage(1);
    }
  }, [searchString, searchString.length, dispatch, total]);

  useEffect(() => {
    const getData = async () => {
      const data = await getPostsFromTMS({ limit: total + 1, offset: 0 });
      console.log(data);
      if (!data) return;
      const authorsIdsCollection = Array.from(
        new Set(data.results?.map((post) => String(post.author)))
      );
      dispatch(setAuthors(authorsIdsCollection));
    };

    getData();
  }, [total]);

  const handleChangeDialogIsOpenStatus = (newStatus: boolean) => {
    setIsAddPostDialogOpen(newStatus);
  };

  // Logic for pagination
  const postPerPage = 10;

  const updatePosts = (data: UpdatePostsByDataType) => {
    const { currentPage } = data;
    setActivePage(currentPage);
    console.log("current page", currentPage);
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
          <Button onClick={() => console.log(posts)}>
            console current posts
          </Button>
        </Box>
        <EditPostDialog />
        <AddPostDialog
          open={isAddPostDialogOpen}
          onClose={() => setIsAddPostDialogOpen(false)}
        />

        {posts.map((post: BlogPostFromTMS) => (
          <PostItem post={post} />
        ))}
      </Box>
      {!(searchString.length > 0) && (
        <Pagination
          onPageChange={handlePageSelect}
          activePage={activePage}
          totalPostsCount={total}
          rowsPerPage={postPerPage}
        />
      )}
    </Box>
  );
};
export default Blog;
