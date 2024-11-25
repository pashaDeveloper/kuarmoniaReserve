import LoadImage from "@/components/shared/image/LoadImage";
import React, { useState, useEffect, useMemo } from "react";
import { BiRightArrowAlt, BiRightArrowCircle } from "react-icons/bi";
import { useGetAllBlogsQuery } from "@/services/blog/blogApi";
import Pagination from "@/components/shared/pagination/Pagination";
import SkeletonCard from "@/components/shared/card/SkeletonCard";
import { useRouter } from "next/router";

const BlogPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const { isLoading, data, error } = useGetAllBlogsQuery({ page: 1, limit: 8 });
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const blogs = useMemo(() => data?.data || [], [data]);
  const superAdmin = useMemo(() => data?.superAdmin || [], [data]);
  const router = useRouter();

  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
      {blogs?.length === 0 || isLoading
        ? Array.from({ length: 8 }, (_, index) => <SkeletonCard key={index} />)
        : blogs.map((blog, index) => (
            <div
              key={index}
              className="group flex flex-col gap-y-4 border rounded h-fit break-inside-avoid bg-white transition-color ease-linear delay-100 hover:border-primary relative"
              onClick={() => router.push(`/blog/${blog.id}`)}
            >
              <img
                src={blog.featuredImage?.url} // استفاده از تصویر ویژه پست
                alt={blog.title}
                width={427}
                height={350}
                className="rounded-t w-full object-cover"
              />
              <article className="flex flex-col gap-y-2.5 px-4 pb-4 relative">
                {blog.isFeatured && (
                  <span
                    className="absolute px-2 py-0.5 text-xs top-0 left-0  "
                    title="ویژه"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="-mt-0.5 h-5 w-5 text-yellow-700"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                )}
                <h2 className="text-lg line-clamp-1">{blog.title}</h2>
                <div className="mt-auto flex flex-col gap-y-2.5">
                  <p className="text-sm line-clamp-4 text-justify">
                    {blog.description || "No summary available"}
                  </p>
                  <p className="text-xs border border-secondary transition-colors ease-linear delay-100 group-hover:border-primary px-2 py-0.5 rounded-primary text-slate-500 flex items-center justify-between relative">
                    <span>
                      {new Date(blog.publishDate).toLocaleDateString("fa-IR", {
                        weekday: "long",
                      })}{" "}
                      - {new Date(blog.publishDate).toLocaleDateString("fa-IR")}
                    </span>
                    <div className="flex items-center space-x-3">
                      <img
                        alt={blog?.authorId.name}
                        title={blog?.authorId.name}
                        src={blog?.authorId?.avatar?.url}
                        className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
                      />
                      {blog?.authorId?.name !== superAdmin?.name && (
                        <img
                          alt={blog?.authorId.name}
                          title={blog?.authorId.name}
                          src={blog?.authorId?.avatar?.url}
                          className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
                        />
                      )}
                    </div>
                  </p>
                </div>
              </article>
            </div>
          ))}
    </section>
  );
};

export default BlogPosts;
