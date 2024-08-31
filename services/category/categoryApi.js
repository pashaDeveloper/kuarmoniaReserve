

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

    // get Category
 
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetFilteredCategorysMutation,
} = categoryApi;
