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
      query: ({ page = 1, limit = 7 }) => ({
        url: `/tag/?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
 
    updateTag: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/tag/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["tag"],
    }),
  }),
});
export const {
  useAddTagMutation,
  useGetTagsQuery,
  useUpdateTagMutation,
} = tagApi;
