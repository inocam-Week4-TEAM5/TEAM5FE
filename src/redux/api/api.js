import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const instanse = axios.create({
  baseURL:  process.env.REACT_APP_INOCAM_KEY
});

instanse.interceptors.request.use((config) => {
  const accessToken =
    document.cookie &&
    document.cookie
      .split(";")
      .filter((cookies) => cookies.includes("accessToken"))[0]
      ?.split("=")[1];
  if (accessToken) config.headers.authorization = accessToken;
  return config;
});

instanse.interceptors.response.use((config) => {
  config.headers.authorization &&
    (document.cookie = `accessToken=${config.headers.authorization};  path=/;`); // expires=${exp}

  return config;
});

const axiosBaseQuery =
  () =>
  async ({ url, method, data, types }) => {
    try {
      switch (types) {
        case "addpost":
          const postres = await instanse({
            method,
            url,
            data,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return { data: postres.data };
        case "login":
          const auth = await instanse({ method, url, data });
          return { data: auth.data };
        default:
          const res = await instanse({ method, url, data });
          return { data: res.data };
      }
    } catch (error) {
      // 오류를 직렬화 가능한 형태로 변환하여 반환
      const serializedError = {
        message: error.message,
        name: error.name,
        code: error.code,
      };
      return { error: serializedError };
    }
  };

export const inobaoQuery = createApi({
  baseQuery: axiosBaseQuery(),
  tagTypes: ["POSTS"],
  endpoints: (builder) => ({
    // Login
    postLoginRTK: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/login",
        method: "post",
        data: payload,
        types: "login",
      }),
    }),
    // About Post (1) READ
    getPostRTK: builder.query({
      query: () => ({ url: "/api/posts", method: "get" }),
      providesTags: ["POSTS"],
    }),
    // About Post (2) CREATE
    postPostsRTK: builder.mutation({
      query: (payload) => ({
        url: "/api/posts",
        method: "post",
        data: payload,
        types: "addpost",
      }),
      invalidatesTags: ["POSTS"],
    }),
    // About Post (3) DELETE
    deletePostsRTK: builder.mutation({
      query: (payload) => ({ url: `/api/posts/${payload}`, method: "delete" }),
      invalidatesTags: ["POSTS"],
    }),
    // About Post (4) PATCH
    patchPostsRTK: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/posts/${id}`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["POSTS"],
    }),
    // About PostComment (1) READ
    getCommentsRTK: builder.query({
      query: (postid) => ({
        url: `/api/posts/${postid}/comments`,
        method: "get",
      }),
      providesTags: ["POSTS"],
    }),
    // About PostComment (2) CREATE
    postCommentsRTK: builder.mutation({
      query: ({ postid, data }) => ({
        url: `/api/posts/${postid}/comments`,
        method: "post",
        data,
      }),
      invalidatesTags: ["POSTS"],
    }),
    // About PostComment (3) DELETE
    deleteCommentsRTK: builder.mutation({
      query: ({ postid, commentsId }) => ({
        url: `/api/posts/${postid}/comments/${commentsId}`,
        method: "delete",
      }),
      invalidatesTags: ["POSTS"],
    }),
    // About PostComment (4) PATCH
    patchCommentsRTK: builder.mutation({
      query: ({ postid, commentsId, data }) => ({
        url: `/api/posts/${postid}/comments/${commentsId}`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["POSTS"],
    }),
    // About PostLiked (1)
    likedPostRTK: builder.mutation({
      query: (postId) => ({
        url: `/api/posts/${postId}/like`,
        method: "post",
      }),
      invalidatesTags: ["POSTS"],
    }),
    // About CommentLiked (1)
    likedCommentRTK: builder.mutation({
      query: (commentId) => ({
        url: `/api/comments/${commentId}/like`,
        method: "post",
      }),
      invalidatesTags: ["POSTS"],
    }),
  }),
});

export const {
  usePostLoginRTKMutation,
  useGetPostRTKQuery,
  usePostPostsRTKMutation,
  useDeletePostsRTKMutation,
  usePatchPostsRTKMutation,
  useGetCommentsRTKQuery,
  usePostCommentsRTKMutation,
  useDeleteCommentsRTKMutation,
  usePatchCommentsRTKMutation,
  useLikedPostRTKMutation,
  useLikedCommentRTKMutation,
} = inobaoQuery;
