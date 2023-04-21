import emptyApi from "./emptyApi";

export const extendedAuthApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    singUp: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    singIn: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSingUpMutation, useSingInMutation } = extendedAuthApi;
