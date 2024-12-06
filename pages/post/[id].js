// pages/PostContent.js

import Main from "@/layouts/Main";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { useGetPostQuery } from "@/services/post/postApi";
import Content from "@/components/shared/content/PostContent";

const PostContent = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError,
  } = useGetPostQuery(id);
console.log(fetchData)
  return (
    <main>
      <Head>
        <title>{fetchData?.data?.title}</title>
      </Head>

      <Main>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4  relative">
          <Content
            title={fetchData?.data?.title}
            content={fetchData?.data?.content}
            thumbnailPreview={fetchData?.data?.featuredImage}
            publishDate={fetchData?.data?.publishDate}
            gallery={fetchData?.data?.gallery}
            like={0}
            view={0}
            disLike={0}
            comment={[]}
            isLoading={fetching}
            selectedTags={fetchData?.data?.tags}
          />
        </div>
      </Main>
    </main>
  );
};

export default PostContent;
