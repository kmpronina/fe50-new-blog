import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '#store/store';
import { getBlogPostsToStoreFromTMS } from '#store/reducers/blogTMSReducer/actions';
import { BlogPostFromTMS } from '#models/BlogPosts';
import AddPostDialog from './AddPostDialog';

const Blog: React.FC = () => {
  const { posts } = useAppSelector((state) => state.blogTMSReducer);
  const dispatch = useAppDispatch();

  const [isAddPostDialogOpen, setIsAddPostDialogOpen] =
    useState<boolean>(false);

  const handleChangeDialogIsOpenStatus = (newStatus: boolean) => {
    setIsAddPostDialogOpen(newStatus);
  };

  useEffect(() => {
    // dispatch(getBlogPostsToStoreFromTMS({ offset: 0, search: 'ф' }));
    //  dispatch(getBlogPostsToStoreFromTMS({ordering: 'title', search: 't'}))
    // dispatch( getBlogPostsToStoreFromTMS({limit: 1, search: 'фы'}))
    dispatch(getBlogPostsToStoreFromTMS());
    // dispatch( getBlogPostsToStoreFromTMS({limit: 1, search: 'ф', offset: 1, ordering: 'title', author__course_group: 1}))
  }, []);

  return (
    <Box
      sx={{
        display: ' flex',
        gap: '15px',
        flexWrap: ' wrap',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Button onClick={() => handleChangeDialogIsOpenStatus(true)}>
          Add new post
        </Button>
      </Box>
      <AddPostDialog
        open={isAddPostDialogOpen}
        onClose={() => setIsAddPostDialogOpen(false)}
      />
      {posts.map((post: BlogPostFromTMS) => (
        <Paper sx={{ width: '550px', padding: '15px' }}>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Box sx={{ width: '250px', height: '250px' }}>
              <img
                style={{ width: '100%', height: '100%' }}
                src={post.image}
                alt={'random pic'}
              />
            </Box>
            <Box sx={{ width: '50%' }}>
              <Typography variant="h5" sx={{ marginBottom: '25px' }}>
                {post.title} {post.author}
              </Typography>
              <Typography variant="h6">{post.text}</Typography>
              <Typography>{post.description}</Typography>
              <Typography> {post.date}</Typography>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};
export default Blog;
