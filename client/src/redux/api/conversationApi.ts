import emptyApi from "./emptyApi";

export const extendedConversationApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    createConversation: builder.mutation({
      query: (body) => ({
        url: "/conversation",
        method: "POST",
        body,
      }),
    }),
    getConversation: builder.query({
      query: (id) => `/conversation/${id}`,
    }),
  }),
});

export const { useCreateConversationMutation, useGetConversationQuery } =
  extendedConversationApi;
