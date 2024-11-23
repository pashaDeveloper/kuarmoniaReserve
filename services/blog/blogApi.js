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

    getBlog: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["User"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
  
      invalidatesTags: [
        "User",
        "Cart",
        "Rent",
        "Favorite",
        "Purchase",
        "Review",
      ],
    }),
 
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blog/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),

 
});

export const {
  useAddBlogMutation,
  useGetBlogsQuery,
  useDeleteBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
} = blogApi;
