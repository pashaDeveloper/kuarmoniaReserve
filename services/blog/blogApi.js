const { kuarmoniaApi } = require("../kuarmonia");

const blogApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addBlog: builder.mutation({
      query: (body) => ({
        url: "/blog/",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "Blog",
      
      ],
    }),

    getBlogs: builder.query({
      query: ({ page = 1, limit = 7 }) => ({
        url: `/blog/?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
 
    updateBlog: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/blog/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useAddBlogMutation,
  useGetBlogsQuery,
  useUpdateBlogMutation,
} = blogApi;
