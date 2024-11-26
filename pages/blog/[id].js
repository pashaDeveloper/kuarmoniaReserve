// pages/BlogContent.js

import Main from "@/layouts/Main";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { useGetBlogQuery } from "@/services/blog/blogApi";
import MainContent from "@/components/shared/content/MainContent";
import Content from "./Content";
import LeftSidebar from "./leftSidebar";  
import RightSidebar from "./rightSidebar";

const BlogContent = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError,
  } = useGetBlogQuery(id);

  return (
    <main>
      <Head>
        <title>{fetchData?.data?.title}</title>
      </Head>

      <Main>
        <div className="grid grid-cols-1 md:grid-cols-20 gap-4 p-4 relative">
          <LeftSidebar />
          <Content 
            title={fetchData?.data?.title}
            content={fetchData?.data?.content}
            galleryPreview={fetchData?.data?.featuredImage?.url}
            isLoading={fetching}
            publishDate={fetchData?.data?.publishDate}
            author={fetchData?.data?.authorId?.name}
            avatar={fetchData?.data?.authorId?.avatar?.url}
            selectedTags={fetchData?.data?.tags}
          />

          <RightSidebar />
        </div>
      </Main>
    </main>
  );
};

export default BlogContent;
