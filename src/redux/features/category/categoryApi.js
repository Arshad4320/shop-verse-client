import { apiSlice } from "./../../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    getCategory: builder.query({
      query: () => "/category",
      providesTags: ["Category"],
    }),
    getSingleCategory: builder.query({
      query: (id) => `/category/${id}`,
    }),
    updateCategory: builder.mutation({
      query: ({ data, id }) => ({
        url: `/category-update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `/category-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
