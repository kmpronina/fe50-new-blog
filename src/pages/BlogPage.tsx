import Blog from '#containers/blog';
import ContentWithDrawer from '#containers/contentWithDrawer';
import React from 'react';

const BlogPage: React.FC = () => {
  return (
    <ContentWithDrawer title={'Blog'}>
      <Blog />
    </ContentWithDrawer>
  );
};
export default BlogPage;
