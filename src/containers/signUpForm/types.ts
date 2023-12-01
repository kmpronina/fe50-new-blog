export type SingUpDataType = {
  username: string;
  password: string;
  email: string;
  course_group: number;
};

export type ActivateDataType = {
  userId: string;
  token: string;
};
