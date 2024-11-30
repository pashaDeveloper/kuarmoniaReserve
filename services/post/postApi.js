const { kuarmoniaApi } = require("../kuarmonia");

const postApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addpost: builder.mutation({
      query: (body) => ({
        url: "/post/",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "post",
      
      ],
    }),

    getposts: builder.query({
      query: ({ page = 1, limit = 7, search = "", userId }) => ({
        url: `/post/?page=${page}&limit=${limit}&search=${search}&userId=${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getpost: builder.query({
      query: (id) => ({
        url: `/post/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["User"],
    }),

    getAllposts: builder.query({
      query: ({ page = 1, limit = 8 }) => ({
        url: `/post/?page=${page}&limit=${limit}`,
        method: "GET",
        params: { type: "client" }, 
      }),
      providesTags: ["post", "Tag", "User","Category"],
    }),


    deletepost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
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
 
    updatepost: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/post/${id}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: data,
        };
      },
    }),
    
  }),

 
});

export const {
  useAddpostMutation,
  useGetpostsQuery,
  useGetAllpostsQuery,
  useDeletepostMutation,
  useGetpostQuery,
  useUpdatepostMutation,
} = postApi;
