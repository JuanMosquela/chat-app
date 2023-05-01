import emptyApi from "./emptyApi";

export const extendedMessagesApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    // createConversation: builder.mutation({
    //   query: (body) => ({
    //     url: "/conversation",
    //     method: "POST",
    //     body,
    //   }),
    // }),
    getMessages: builder.query({
      query: (id) => `/message/${id}`,
    }),
  }),
});

export const { useGetMessagesQuery } = extendedMessagesApi;
