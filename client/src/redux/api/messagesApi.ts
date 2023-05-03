import emptyApi from "./emptyApi";

export const extendedMessagesApi = emptyApi
  .enhanceEndpoints({ addTagTypes: ["Message"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getMessages: builder.query({
        query: (id) => `/message/${id}`,
        providesTags: ["Message"],
      }),
    }),
  });

export const { useGetMessagesQuery } = extendedMessagesApi;
