// import { baseUrl } from "#constants/baseUrl";
import { AuthMethodsReturnType } from "#hooks/useAuth";
import { UserReducerEnum } from "#store/reducers/userReducer/actionTypes";
import { store } from "#store/store";
import { getLocalStorageWithTime } from "#utils/addTimeToExpireToStorage";
import { refresh } from "#utils/refreshAuthToken";
import {
  CreatePostDataType,
  EditPostDataType,
  GetPostsFromTMSOptionsType,
  GetPostsFromTMSResponseType,
} from "./types";

const getQueryParams = (options: any) => {
  if (options === undefined) return "";
  if (
    Object.keys(options).filter((key) => options[key] !== undefined).length ===
    0
  ) {
    return "";
  }
  let queryParamsString: string = "?";
  Object.keys(options).forEach((key, index, arr) => {
    queryParamsString += `${key}=${options[key]}${
      index === arr.length - 1 ? "" : "&"
    }`;
  });
  return queryParamsString;
};

export const getPostByIdFromTMS = async (postId: number) => {
  const rawData = await fetch(
    `https://studapi.teachmeskills.by/blog/posts/${postId}`
  );

  return await rawData.json();
};

export const getPostsFromTMS = async (
  options?: GetPostsFromTMSOptionsType
): Promise<GetPostsFromTMSResponseType | false> => {
  let authToken = getLocalStorageWithTime("authToken");
  if (authToken === false) {
    const response = await refresh();
    if (!response) {
      store.dispatch({ type: UserReducerEnum.LOGOUT_BY_REFRESH });
      return false;
    }
  }

  authToken = getLocalStorageWithTime("authToken") as string;

  const rawData = await fetch(
    `https://studapi.teachmeskills.by/blog/posts${getQueryParams(options)}`
  );
  const data: GetPostsFromTMSResponseType = await rawData.json();
  if (!data) return false;

  return data;
};

export const createPostFromTMS = async (
  createPostData: CreatePostDataType
): Promise<AuthMethodsReturnType> => {
  let authToken = getLocalStorageWithTime("authToken");
  if (authToken === false) {
    const response = await refresh();
    if (!response) {
      store.dispatch({ type: UserReducerEnum.LOGOUT_BY_REFRESH });
      return { isSuccess: false };
    }
  }

  authToken = getLocalStorageWithTime("authToken");

  const { title, image, description, lesson_num, text } = createPostData;
  const formData = new FormData();
  formData.append("image", image);
  formData.append("text", text);
  formData.append("lesson_num", String(lesson_num));
  formData.append("title", title);
  formData.append("description", description);

  const rawData = await fetch(`https://studapi.teachmeskills.by/blog/posts/`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (!rawData.ok) {
    return { isSuccess: false };
  }
  return await { isSuccess: true, data: rawData.json() };
};

export const generateImage = async () => {
  let authToken = getLocalStorageWithTime("authToken");
  if (authToken === false) {
    const response = await refresh();
    if (!response) {
      store.dispatch({ type: UserReducerEnum.LOGOUT_BY_REFRESH });
      return false;
    }
  }

  authToken = getLocalStorageWithTime("authToken");

  const rawData = await fetch("https://random.imagecdn.app/150/150");
  return await rawData.blob();
};

export const editPostFromTMS = async (
  editPostData: EditPostDataType
): Promise<AuthMethodsReturnType> => {
  let authToken = getLocalStorageWithTime("authToken");
  if (authToken === false) {
    const response = await refresh();
    if (!response) {
      store.dispatch({ type: UserReducerEnum.LOGOUT_BY_REFRESH });
      return { isSuccess: false };
    }
  }

  authToken = getLocalStorageWithTime("authToken");

  const { title, image, description, lesson_num, text, id, author, date } =
    editPostData;
  const formData = new FormData();
  formData.append("image", image);
  formData.append("text", text);
  formData.append("lesson_num", String(lesson_num));
  formData.append("title", title);
  formData.append("description", description);
  formData.append("author", author);
  formData.append("date", date);

  const rawData = await fetch(
    `https://studapi.teachmeskills.by/blog/posts/${id}`,
    {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  if (!rawData.ok) {
    return { isSuccess: false };
  }
  return await { isSuccess: true, data: rawData.json() };
};
