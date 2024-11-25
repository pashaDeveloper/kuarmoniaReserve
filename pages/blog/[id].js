import Main from "@/layouts/Main";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import {useGetBlogQuery} from "@/services/blog/blogApi";
import MainContent from "@/components/shared/content/MainContent";

const BlogContent = () => {

    const router = useRouter();
    const { id } = router.query;
  
    const {
      isLoading: fetching,
      data: fetchData,
      error: fetchError,
    } = useGetBlogQuery(id);
    console.log(fetchData)
  return (
    <main>
      <Head>
        <title></title>
      </Head>

      <Main>

       <MainContent
       title={fetchData?.data?.title}
       content={fetchData?.data?.content}
      galleryPreview={fetchData?.data?.featuredImage?.url}
      isLoading={fetching}
      publishDate={fetchData?.data?.publishDate}
      author={fetchData?.data?.authorId?.name}
      avatar={fetchData?.data?.authorId?.avatar?.url}
      selectedTags={fetchData?.data?.tags}
    /> 

      </Main>
    </main>
  );
};

export default BlogContent;
