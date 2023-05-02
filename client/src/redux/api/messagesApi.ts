import emptyApi from "./emptyApi";

export const extendedMessagesApi = emptyApi
  .enhanceEndpoints({ addTagTypes: ["Message"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createMessage: builder.mutation({
        query: (body) => ({
          url: "/message",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Message"],
      }),
      getMessages: builder.query({
        query: (id) => `/message/${id}`,
        providesTags: ["Message"],
      }),
    }),
  });

export const { useGetMessagesQuery, useCreateMessageMutation } =
  extendedMessagesApi;
