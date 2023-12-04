import { BlogPostFromTMS } from "#models/BlogPost";

export type GetPostsFromTMSResponseType = {
  count?: number;
  next?: string;
  previous?: string;
  results?: BlogPostFromTMS[];
};

export type CreatePostDataType = {
  image: string;
  text: string;
  lesson_num: number;
  title: string;
  description: string;
};

export type GetPostsFromTMSOptionsType = {
  author__course_group?: number;
  limit?: number;
  offset?: number;
  ordering?: string;
  search?: string;
};

export type EditPostDataType = {
  image: string;
  text: string;
  lesson_num: number;
  title: string;
  description: string;
  author: string;
  date: string;
  id: number;
};
