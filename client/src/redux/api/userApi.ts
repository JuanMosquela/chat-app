import emptyApi from "./emptyApi";

export const extendedUserApi = emptyApi
  .enhanceEndpoints({ addTagTypes: ["User"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsers: builder.query({
        query: () => `/users`,
      }),
      getUser: builder.query({
        query: (id) => `/users/${id}`,
        providesTags: ["User"],
      }),
      editUserInfo: builder.mutation({
        query: (body) => ({
          url: `/users`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["User"],
      }),
    }),
  });

export const { useGetUsersQuery, useGetUserQuery, useEditUserInfoMutation } =
  extendedUserApi;
