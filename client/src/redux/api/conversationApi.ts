import emptyApi from "./emptyApi";

export const extendedConversationApi = emptyApi
  .enhanceEndpoints({ addTagTypes: ["Chat"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getConversation: builder.query({
        query: (id) => `/conversation/${id}`,
        providesTags: ["Chat"],
      }),
      createConversation: builder.mutation({
        query: (body) => ({
          url: "/conversation",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Chat"],
      }),
    }),
  });

export const { useCreateConversationMutation, useGetConversationQuery } =
  extendedConversationApi;
