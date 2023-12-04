export type UpdatePostsByDataType = {
  currentPage: number;
};

export type AddPostFormikValueType = {
  image: string | null;
  title: string;
  text: string;
};

export type EditPostFormikValueType = {
  image: string | null;
  title: string;
  text: string;
  date: string;
  author: string;
};
