import { kuarmoniaApi } from "../kuarmonia";

const categoryApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
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

    GetCategories: builder.query({
      query: () => ({
        url: "/category/",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    getCategoriesForDropDownMenu: builder.query({
      query: () => ({
        url: "/category/",
        method: "GET",
        params: { type: "dropdown" }, 
      }),
      providesTags: ["CategoryDropdown"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoriesForDropDownMenuQuery,
  useUpdateCategoryMutation,
} = categoryApi;
