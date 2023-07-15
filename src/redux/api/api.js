import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios';

const instanse = axios.create({
  baseURL:"http://ec2-3-38-96-84.ap-northeast-2.compute.amazonaws.com:8080"
})

const axiosBaseQuery =
  () =>
  async ({ url, method, data, types }) => {
     for (const x of data.entries()) {
      console.log(x);
    }
    try {
      const res = await instanse({ method, url, data, headers: {
        "Content-Type": "multipart/form-data", 
      }});
      return { data: res.data };
    } catch (error) {
      return console.log("에러", error);
    }
  };

const inobaoQuery = createApi({
  baseQuery:axiosBaseQuery(),
  tagTypes:["POST"],
  endpoints: builder =>({
    postImgRTK : builder.mutation({
      query: (payload) => ({url: "/image3", method: "post", data: payload}),
      invalidatesTags:["POST"]
    })
  }) 
})

export const {usePostImgRTKMutation} = inobaoQuery
export default inobaoQuery