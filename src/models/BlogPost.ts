export type BlogPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// export type PostComment = {
//   postId: number
//   id: number
//   name: string
//   body: string
//   email: string
// }

export type BlogPostFromTMS = {
  id: number;
  image: string;
  text: string;
  date: string;
  lesson_num: number;
  title: string;
  description: string;
  author: number;
};

export type PostDataType = {
  data: BlogPostFromTMS[];
  total: number;
};
