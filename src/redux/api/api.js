import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios';

const instanse = axios.create({
  baseURL:process.env.REACT_APP_SERVER_KEY 
})

const axiosBaseQuery =
  () =>
  async ({ url, method, data, types }) => {

    try {
      switch (types) {
        case "addpost":
          const addpost = await instanse({ method, url, data, headers: {
            "Content-Type": "multipart/form-data", 
          }})
          return  {data:addpost.data}
        default :
          const res = await instanse({ method, url, data });
        return  {data:res.data}
      }
    } catch (error) {
      return console.log("에러", error);
    }
  };

export const inobaoQuery = createApi({
  baseQuery:axiosBaseQuery(),
  tagTypes:["POST"],
  endpoints: builder =>({
    postImgRTK : builder.mutation({
      query: (payload) => ({url: "/api/image3", method: "post", data: payload, types:"addpost"}),
      invalidatesTags:["POST"]
    })
  }) 
})

export const {usePostImgRTKMutation} = inobaoQuery