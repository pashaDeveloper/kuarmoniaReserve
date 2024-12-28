import React, {  useMemo,useState } from "react";
import { useGetAllMediaQuery } from "@/services/media/mediaApi";
import VideoCard from "@/components/shared/card/VideoCard"; 
import Pagination from "@/components/shared/pagination/Pagination";
import SkeletonCard from "@/components/shared/card/SkeletonCard";

const VideoGallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const { isLoading, data } = useGetAllMediaQuery({ page: 1, limit: 8 });
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const medias = useMemo(() => data?.data || [], [data]);
  const superAdmin = useMemo(() => data?.superAdmin || [], [data]);
  return (
    <>
<section className="grid grid-cols-1 gap-4 sm:grid-cols-2  lg:grid-cols-4 ">
{isLoading || medias.length === 0
        ? Array.from({ length: 4 }, (_, index) => (
          <SkeletonCard />
          ))
          : posts.map((post) => (
          <VideoCard
          key={post.id}
          id={post.id}
          title={post.title}
          slug={post.slug}
          description={post.description}
          thumbnailPreview={post.featuredImage}
          publishDate={post.publishDate}
          isLoading={isLoading}
          author={post?.authorId?.name}
          avatar={post?.authorId?.avatar?.url}
          superAdmin={superAdmin}
          category={post?.category?.title}
          />
        ))}
          
    </section>
    <Pagination 
           currentPage={currentPage}
           totalPages={totalPages}
           onPageChange={(page) => setCurrentPage(page)}
    />
        </>
  );
};

export default VideoGallery;
