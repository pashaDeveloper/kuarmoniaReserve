import React, { useState, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/router";
import { useGetAllPostsQuery } from "@/services/post/postApi";

const PostCard = () => {
  const { isLoading, data } = useGetAllPostsQuery({ page: 1, limit: 8 });
  const posts = useMemo(() => data?.data || [], [data]);
  const router = useRouter();
console.log("data",data)
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {isLoading || posts.length === 0
        ? Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className="flex flex-col justify-center rtl dark:text-white"
            >
              <div className="relative flex flex-row space-x-3 space-x-reverse rounded-primary shadow-lg p-3 w-full md:min-w-[600px] max-w-[650px] mx-auto border border-white dark:border-gray-700 dark:bg-gray-800/70 bg-white/70">
                <div className="w-1/3 grid place-items-center min-h-[170px]">
                  <Skeleton height={170} width={170} />
                </div>
                <div className="w-2/3 flex flex-col space-y-2 p-3">
                  <Skeleton height={20} width={200} />
                  <Skeleton height={20} width={80} />
                  <Skeleton width={"100%"} height={40} />
                  <Skeleton width={"100%"} height={20} count={4} />
                </div>
              </div>
            </div>
          ))
        : posts.map((post) => (
            <div
              key={post.id}
              onClick={() => router.push(`/post/${post.id}`)}
              className="flex flex-col justify-center cursor-pointer rtl dark:text-white"
            >
              <div className="relative flex flex-row rounded-primary shadow-lg p-3 w-full md:min-w-[600px] lg:min-h-[200px] max-w-[650px] mx-auto border border-white dark:border-gray-700 dark:bg-gray-800/70 bg-white/70">
                <div className="w-1/3 grid place-items-center ">
                  {post.featuredImage?.url ? (
                    post.featuredImage.type === "image" ? (
                      <img
                      src={post.featuredImage.url}
                      alt={post.title}
                      height={170}
                      width={170}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    ) : (
                      <video
                        src={post.featuredImage.url}
                        controls
                        height={170}
                        width={170}
                        className="w-full h-full object-cover rounded-xl"
                      />
                     
                    )
                  ) : (
                    <Skeleton height={170} width={170} />
                  )}
                </div>
                <div className="w-2/3 flex flex-col space-y-2 p-3">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 font-medium">
                      {post.category || <Skeleton height={20} width={200} />}
                    </p>
                    {post.isFeatured ? (
                      <span className="inline-block px-3 py-1 text-sm text-yellow-800 dark:text-blue-200 bg-yellow-200 rounded-md border border-yellow-300 dark:border-blue-500 dark:bg-blue-600">
                        پست ویژه
                      </span>
                    ) : (
                      <Skeleton width={80} height={20} />
                    )}
                  </div>
                  <h3 className="text-gray-800 dark:text-gray-100 md:text-lg">
                    {post.title || <Skeleton width={"100%"} height={40} />}
                  </h3>
                  <p className="text-sm text-justify text-gray-500 line-clamp-3">
                    {post.description || (
                      <Skeleton width={"100%"} height={20} count={4} />
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
    </section>
  );
};

export default PostCard;
