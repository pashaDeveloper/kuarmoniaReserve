const { kuarmoniaApi } = require("../kuarmonia");

const categoryApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new Category
    addCategory: builder.mutation({
      query: (body) => ({
        url: "/category/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: [
        "Rent",
        "User",
        "Cart",
        "Favorite",
        "Purchase",
        "Review",
      ],
    }),

    // get all Categorys
    GetCategories: builder.query({
      query: () => ({
        url: "/category/",
        method: "GET",
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),

    //Delete
    softDeleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Category"],
    }),

    //Change Status
    toggleCategoryStatus: builder.mutation({
      query: (categoryId) => ({
        url: `/categories/${categoryId}/toggle-status`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useSoftDeleteCategoryMutation,
  useGetFilteredCategorysMutation,
} = categoryApi;
