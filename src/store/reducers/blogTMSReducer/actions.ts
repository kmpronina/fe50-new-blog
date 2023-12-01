import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { GetPostsFromTMSOptionsType } from "#api/services/postServices/types";
import { getPostsFromTMS } from "#api/services/postServices/postServices";
import { BlogPostFromTMS, PostDataType } from "#models/BlogPost";
import { BlogTMSReducerEnum } from "./actionTypes";

export const getBlogPostsToStoreFromTMS = (
  options?: GetPostsFromTMSOptionsType
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoadingStatusFromTMS(true));
    const data = await getPostsFromTMS(options);
    if (!data) return;
    const { results, count } = data;

    dispatch(
      setBlogPostsWithCountToStoreFromTMS({
        data: results || [],
        total: count || 0,
      })
    );

    dispatch(setIsLoadingStatusFromTMS(false));
  };
};

export const setBlogPostsToStoreFromTMS = (posts: BlogPostFromTMS[]) => {
  return {
    type: BlogTMSReducerEnum.SET_BLOG_POSTS_TMS,
    posts,
  };
};

export const setBlogPostsWithCountToStoreFromTMS = (data: PostDataType) => {
  return {
    type: BlogTMSReducerEnum.SET_BLOG_POSTS_WITH_COUNT_TMS,
    data,
  };
};

export const setActivePostFromTMS = (activePost: BlogPostFromTMS | null) => {
  return {
    type: BlogTMSReducerEnum.SET_ACTIVE_POST_TMS,
    activePost,
  };
};

export const setIsLoadingStatusFromTMS = (newStatus: boolean) => {
  return {
    type: BlogTMSReducerEnum.SET_IS_LOADING_STATUS_TMS,
    newStatus,
  };
};

export const setSearchStringToStoreFromTMS = (newSearchString: string) => {
  return {
    type: BlogTMSReducerEnum.SET_SEARCH_STRING_TMS,
    newSearchString,
  };
};
