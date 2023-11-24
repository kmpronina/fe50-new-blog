import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { GetPostsFromTMSOptionsType } from '#api/services/postServices/types';
import { getPostsFromTMS } from '#api/services/postServices/postServices';
import { BlogPostFromTMS } from '#models/BlogPosts';
import { BlogTMSReducerEnum } from './actionTypes';

export const getBlogPostsToStoreFromTMS = (
  options?: GetPostsFromTMSOptionsType
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoadingStatusFromTMS(true));
    const dataPosts = await getPostsFromTMS(options);
    if (dataPosts === undefined) return;

    dispatch(setBlogPostsToStoreFromTMS(dataPosts || []));

    dispatch(setIsLoadingStatusFromTMS(false));
  };
};

export const setBlogPostsToStoreFromTMS = (posts: BlogPostFromTMS[]) => {
  return {
    type: BlogTMSReducerEnum.SET_BLOG_POSTS_TMS,
    posts,
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
