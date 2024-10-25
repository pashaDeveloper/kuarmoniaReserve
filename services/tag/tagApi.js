const { kuarmoniaApi } = require("../kuarmonia");

const tagApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addTag: builder.mutation({
      query: (body) => ({
        url: "/tag/",
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

    GetTags: builder.query({
      query: ({ page = 1, limit = 7 } = {}) => ({
        url: `/tag/?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),

    getTagsForDropDownMenu: builder.query({
      query: () => ({
        url: "/tag/",
        method: "GET",
        params: { type: "dropdown" }, 
      }),
      providesTags: ["TagDropdown"], 
    }),


    updateTag: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/tag/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Tag"],
    }),
  }),
});
export const {
  useAddTagMutation,
  useGetTagsQuery,
  useGetTagsForDropDownMenuQuery,
  useUpdateTagMutation,
} = tagApi;
