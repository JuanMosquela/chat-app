import emptyApi from "./emptyApi";

export const extendedUserApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/users`,
    }),
  }),
});

export const { useGetUsersQuery } = extendedUserApi;
