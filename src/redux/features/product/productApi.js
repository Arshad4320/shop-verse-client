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
      }),
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
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
