import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const instanse = axios.create({
  // baseURL: process.env.REACT_APP_SERVER_KEY,
  baseURL:"http://1.244.223.183:5000"
});

instanse.interceptors.request.use((config) => {
  const accessToken =
    document.cookie &&
    document.cookie
      .split(";")
      .filter((cookies) => cookies.includes("accessToken"))[0]
      ?.split("=")[1];
  const refreshToken =
    document.cookie &&
    document.cookie
      .split(";")
      .filter((cookies) => cookies.includes("refreshToken"))[0]
      ?.split("=")[1];
  if (accessToken) config.headers.accesstoken = accessToken;
  if (!accessToken && refreshToken) config.headers.Authorization = refreshToken;
  return config;
});

instanse.interceptors.response.use((config) => {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);
  const expires = expirationDate.toUTCString();
  document.cookie = `accessToken=${config.headers.accesstoken}; expires=${expires} path=/;`;
  config.headers.authorization &&
    (document.cookie = `refreshToken=${config.headers.authorization}; path=/;`);
});

const axiosBaseQuery =
  () =>
  async ({ url, method, data, types }) => {
    try {
      switch (types) {
        case "addpost":
          const addpost = await instanse({
            method,
            url,
            data,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return { data: addpost.data };
        default:
          console.log("data", data);
          const res = await instanse({ method, url, data });
          return { data: res.data };
      }
    } catch (error) {
      return console.log("에러", error);
    }
  };

export const inobaoQuery = createApi({
  baseQuery: axiosBaseQuery(),
  tagTypes: ["POSTS", "COMMENTS"],
  endpoints: (builder) => ({
    // Login
    postLoginRTK: builder.mutation({
      query: (payload) => ({
        url: "/api/user/login",
        method: "post",
        data: payload,
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
      providesTags: ["COMMENTS"],
    }),
    // About PostComment (2) CREATE
    postCommentsRTK: builder.mutation({
      query: ({ postid, data }) => ({
        url: `/api/posts/${postid}/comments`,
        method: "post",
        data,
      }),
      invalidatesTags: ["COMMENTS"],
    }),
    // About PostComment (3) DELETE
    deleteCommentsRTK: builder.mutation({
      query: ({ postid, commentid }) => ({
        url: `/api/posts/${postid}/comments/${commentid}`,
        method: "delete",
      }),
      invalidatesTags: ["COMMENTS"],
    }),
    // About PostComment (4) PATCH
    patchCommentsRTK: builder.mutation({
      query: ({ postid, commentid, data }) => ({
        url: `/api/posts/${postid}/comments/${commentid}`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["COMMENTS"],
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
  useDeleteCommentsRTKMution,
  usePatchCommentsRTKMution
} = inobaoQuery;
