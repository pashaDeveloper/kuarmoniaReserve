import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useGetAllPostsQuery } from "@/services/post/postApi";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import PostCard from "@/components/shared/card/PostCard"; 

const Posts = () => {
  const { isLoading, data } = useGetAllPostsQuery({ page: 1, limit: 8 });
  const posts = useMemo(() => data?.data || [], [data]);
  console.log("data",posts)
  const router = useRouter();
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
      {isLoading || posts.length === 0
        ? Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="flex flex-col justify-center rtl min-h-[120px] lg:min-h-[200px]  dark:text-white"
            >
              <div className="relative flex flex-row space-x-3 h-full space-x-reverse rounded-primary shadow-lg p-3 w-full md:min-w-[600px] max-w-[650px] mx-auto border border-white dark:border-gray-700 dark:bg-gray-800/70 bg-white/70">
                <div className="w-1/3 grid place-items-center ">
                <SkeletonImage borderRadius={"rounded-lg"}  />
                </div>
                <div className="w-2/3 flex flex-col space-y-2  lg:p-3">
                <SkeletonText lines={7} />
               
                </div>
              </div>
            </div>
          ))
        : posts.map((post) => (
          <PostCard
          id={post.id}
          title={post.title}
          description={post.description}
          thumbnailPreview={post.featuredImage}
          publishDate={post.publishDate}
          isLoading={isLoading}
          author={post?.author?.name}
          avatar={post?.author?.avatar?.url}
    
        />
          ))}
    </section>
  );
};

export default Posts;
