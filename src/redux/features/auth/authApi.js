import { apiSlice } from "../../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/register-user",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/login-user",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getAllUser: builder.query({
      query: () => ({
        method: "GET",
        url: "/get-users",
      }),
      providesTags: ["User"],
    }),

    getSingleUser: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/get-user/${id}`,
      }),
      providesTags: ["User"],
    }),

    selfGetUser: builder.query({
      query: () => ({
        method: "GET",
        url: "/self-user",
      }),
      providesTags: ["User"],
    }),

    selfUserUpdate: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/self-user/update",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/update-user/${id}`,
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/delete-user/${id}`,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useSelfGetUserQuery,
  useSelfUserUpdateMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
  useLoginUserMutation,
} = userApi;
