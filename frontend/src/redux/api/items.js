import { apiSlice } from "./apiSlice";

import { ITEMS_URL } from "../constants";

export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createItem: builder.mutation({
      query: (data) => ({
        url: `${ITEMS_URL}/add-item/`,
        method: "POST",
        body: data,
      }),
    }),
    editItem: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ITEMS_URL}/edit-item/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteItem: builder.mutation({
      query: ({ id }) => ({
        url: `${ITEMS_URL}/delete-item/${id}`,
        method: "DELETE",
      }),
    }),
    getItems: builder.query({
      query: () => ({
        url: `${ITEMS_URL}`,
        method: "GET",
      }),
    }),
    getItem: builder.query({
      query: ({ id }) => ({
        url: `${ITEMS_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateItemMutation,
  useEditItemMutation,
  useDeleteItemMutation,
  useGetItemQuery,
  useGetItemsQuery,
} = itemsApiSlice;
