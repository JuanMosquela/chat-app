import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const emptyApi = createApi({
  reducerPath: "emptyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default emptyApi;
