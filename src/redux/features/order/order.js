import { apiSlice } from "./../../api/apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/create-order",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

    getAllOrders: builder.query({
      query: () => ({
        method: "GET",
        url: "/get-orders",
      }),
      providesTags: ["Order"],
    }),
    getQueryOrder: builder.query({
      query: ({ search, limit, page } = {}) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        return {
          method: "Get",
          url: `query/get-orders?${params.toString()}`,
        };
      },
      providesTags: ["Order"],
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/get-order/${id}`,
      }),
      providesTags: ["Order"],
    }),

    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/update-order/${id}`,
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/delete-order/${id}`,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetQueryOrderQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;

export default orderApi;
