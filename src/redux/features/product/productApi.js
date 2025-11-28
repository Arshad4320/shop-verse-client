import { apiSlice } from "../../api/apiSlice";
// router.get("/products", ProductController.getProducts);
// router.get("/product/:id", ProductController.getSingleProduct);
// router.patch("/product-update/:id", ProductController.updateProduct);
// router.delete("/product-delete/:id", ProductController.deleteProduct);
const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getProduct: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    queryProducts: builder.query({
      query: ({ search = "", page = 1, limit = 8, category = "" } = {}) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (category) params.append("category", category);

        return {
          url: `/products/query?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product-update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductQuery,
  useQueryProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
