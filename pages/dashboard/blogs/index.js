import Panel from "@/layouts/Panel";
import React, { useState, useEffect } from "react";
import Popover from "@/components/shared/modal/Popover";
import InfoTable from "@/components/shared/table/InfoTable";
import AddButton from "@/components/shared/button/AddButton";
import { useGetBlogsQuery, useUpdateBlogMutation } from "@/services/blog/blogApi"; 
import { handleView, toggleTooltipPopover, handleClose, handleEdit, handleDelete, handleStatus } from '@/utils/functionHelpers';
import { toast } from "react-hot-toast";
import { blogColumns } from '@/utils/columnsConfig';
import  StatusIndicator  from "@/components/shared/tools/StatusIndicator";
import { useRouter } from 'next/router';
import LoadImage from "@/components/shared/image/LoadImage";
import { SlLike ,SlDislike } from "react-icons/sl";

const ListBlog = () => {  
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, refetch } = useGetBlogsQuery({ page: currentPage, limit: 7 }); 
  const [updateBlog] = useUpdateBlogMutation(); 
  const [blogToView, setBlogToView] = useState(null);
  const [isActive, setIsActive] = useState();
  const [isMobilePopoverOpen, setIsMobilePopoverOpen] = useState(false);
  const router = useRouter();

console.log(data)

  const handlePageChange = (newPage) => {
    console.log("Current Page:", newPage);
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت بلاگ...", { id: "fetch-Blog" });
    }

    if (data) {
      toast.success(data?.message, { id: "fetch-Blog" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "fetch-Blog" });
    }
  }, [data, error, isLoading]);
  const handleAddItem = () => {
    router.push('/dashboard/blogs/add');
  };
  return (
    <>
      <Panel>
      <div className="my-6 flex flex-col items-center rounded-xl bg-red-500 px-5 py-4 text-white md:flex-row"><div className="mb-2 inline-block rounded-full bg-white/20 p-1 md:mb-0 md:ml-2"></div><div className="flex-1 text-justify text-sm md:text-base"> 
       
        <a  className="font-bold cursor-pointer	">اینجا</a> کلیک کنید. </div></div>
          {/* نمایش داده‌های بلاگ‌ها */}
          <AddButton onClick={handleAddItem} />

          {data && data?.data?.length > 0 && data?.data?.map((blog) => (
        <div key={blog.id} className="mt-4 grid grid-cols-5 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2  transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-slate-700">
            <div className="col-span-1 text-center flex items-center">

          <StatusIndicator isActive={blog.status === 'active'} />
          <div
          className=" py-2 flex flex-row gap-x-2 hover:text-white transition-colors rounded cursor-pointer  items-center"
         
          
        >
          <LoadImage
            src={`/${blog?.authorId?.avatar?.url}`}
            alt={``}
            height={60}
            width={60}
            className="rounded-secondary object-cover "
          />
          <article className="flex flex-col gap-y-0.5">
            <h2 className="line-clamp-1 text-base">{blog?.authorId?.name}</h2>
            <span className="text-xs">{new Date(blog.createdAt).toLocaleDateString('fa-IR')}</span>
          </article>
        </div>
        </div>
        
        <div className="col-span-2 text-center flex items-center">
        <p className="text-gray-500 dark:text-gray-300">{blog.title}</p>
        </div>
 
  
        <div className="ccol-span-2 gap-2 text-center flex justify-center  items-center">
  {/* آیکون لایک */}
  <div className="flex flex-col gap-1 justify-center items-center text-green-500">
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 1024 1024">
	<path fill="currentColor" fill-opacity="0.15" d="M273 495.9v428l.3-428zm538.2-88.3H496.8l9.6-198.4c.6-11.9-4.7-23.1-14.6-30.5c-6.1-4.5-13.6-6.8-21.1-6.7c-19.6.1-36.9 13.4-42.2 32.3c-37.1 134.4-64.9 235.2-83.5 302.5V852h399.4a56.85 56.85 0 0 0 33.6-51.8c0-9.7-2.3-18.9-6.9-27.3l-13.9-25.4l21.9-19a56.76 56.76 0 0 0 19.6-43c0-9.7-2.3-18.9-6.9-27.3l-13.9-25.4l21.9-19a56.76 56.76 0 0 0 19.6-43c0-9.7-2.3-18.9-6.9-27.3l-14-25.5l21.9-19a56.76 56.76 0 0 0 19.6-43c0-19.1-11-37.5-28.8-48.4" />
	<path fill="currentColor" d="M112 528v364c0 17.7 14.3 32 32 32h65V496h-65c-17.7 0-32 14.3-32 32m773.9 5.7c16.8-22.2 26.1-49.4 26.1-77.7c0-44.9-25.1-87.5-65.5-111a67.67 67.67 0 0 0-34.3-9.3H572.3l6-122.9c1.5-29.7-9-57.9-29.5-79.4a106.4 106.4 0 0 0-77.9-33.4c-52 0-98 35-111.8 85.1l-85.8 310.8l-.3 428h472.1c9.3 0 18.2-1.8 26.5-5.4c47.6-20.3 78.3-66.8 78.3-118.4c0-12.6-1.8-25-5.4-37c16.8-22.2 26.1-49.4 26.1-77.7c0-12.6-1.8-25-5.4-37c16.8-22.2 26.1-49.4 26.1-77.7c0-12.6-1.8-25-5.4-37M820.4 499l-21.9 19l14 25.5a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.1 32.2-19.6 43l-21.9 19l13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.1 32.2-19.6 43l-21.9 19l13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H345V506.8c18.6-67.2 46.4-168 83.5-302.5a44.28 44.28 0 0 1 42.2-32.3c7.5-.1 15 2.2 21.1 6.7c9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.1 32.2-19.6 43" />
</svg>

    <span className="text-green-500">{blog.likeCount}</span>
  </div>

  {/* آیکون دیسلایک */}
  <div className="flex flex-col gap-1 items-center text-red-500">
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 1024 1024">
	<path fill="currentColor" fill-opacity="0.15" d="M273 100.1v428h.3zM820.4 525l-21.9-19l14-25.5a56.2 56.2 0 0 0 6.9-27.3c0-16.5-7.1-32.2-19.6-43l-21.9-19l13.9-25.4a56.2 56.2 0 0 0 6.9-27.3c0-16.5-7.1-32.2-19.6-43l-21.9-19l13.9-25.4a56.2 56.2 0 0 0 6.9-27.3c0-22.4-13.2-42.6-33.6-51.8H345v345.2c18.6 67.2 46.4 168 83.5 302.5a44.28 44.28 0 0 0 42.2 32.3c7.5.1 15-2.2 21.1-6.7c9.9-7.4 15.2-18.6 14.6-30.5l-9.6-198.4h314.4C829 605.5 840 587.1 840 568c0-16.5-7.1-32.2-19.6-43" />
	<path fill="currentColor" d="M112 132v364c0 17.7 14.3 32 32 32h65V100h-65c-17.7 0-32 14.3-32 32m773.9 358.3c3.6-12 5.4-24.4 5.4-37c0-28.3-9.3-55.5-26.1-77.7c3.6-12 5.4-24.4 5.4-37c0-28.3-9.3-55.5-26.1-77.7c3.6-12 5.4-24.4 5.4-37c0-51.6-30.7-98.1-78.3-118.4a66.1 66.1 0 0 0-26.5-5.4H273l.3 428l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4c20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3c40.4-23.5 65.5-66.1 65.5-111c0-28.3-9.3-55.5-26.1-77.7m-74.7 126.1H496.8l9.6 198.4c.6 11.9-4.7 23.1-14.6 30.5c-6.1 4.5-13.6 6.8-21.1 6.7a44.28 44.28 0 0 1-42.2-32.3c-37.1-134.4-64.9-235.2-83.5-302.5V172h399.4a56.85 56.85 0 0 1 33.6 51.8c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4l21.9 19a56.76 56.76 0 0 1 19.6 43c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4l21.9 19a56.76 56.76 0 0 1 19.6 43c0 9.7-2.3 18.9-6.9 27.3l-14 25.5l21.9 19a56.76 56.76 0 0 1 19.6 43c0 19.1-11 37.5-28.8 48.4" />
</svg>
<span className="text-red-500">{blog.dislikeCount}</span>

  </div>

  {/* آیکون بازدید */}
  <div className="flex flex-col gap-1 items-center text-gray-500 ">
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
	<g fill="none" stroke="currentColor" stroke-width="1.5">
		<path d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4s7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704Z" />
		<path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
	</g>
</svg>
<p className="!text-gray-500 ">{blog.views}</p>

  </div>

  {/* آیکون نرخ */}
  <div className="flex flex-col gap-1 items-center text-gray-500 ">
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
	<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m8.587 8.236l2.598-5.232a.911.911 0 0 1 1.63 0l2.598 5.232l5.808.844a.902.902 0 0 1 .503 1.542l-4.202 4.07l.992 5.75c.127.738-.653 1.3-1.32.952L12 18.678l-5.195 2.716c-.666.349-1.446-.214-1.319-.953l.992-5.75l-4.202-4.07a.902.902 0 0 1 .503-1.54z" />
</svg>
  <p className="!text-gray-500 ">0</p>
  </div>

  {/* آیکون بوکمارک */}
  <div className="flex flex-col gap-1 items-center text-gray-500 ">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
	<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 3H8a2 2 0 0 0-2 2v16l6-3l6 3V5a2 2 0 0 0-2-2" />
</svg>
     <p className="!text-gray-500 ">0</p>
  </div>
</div>

        <div className="col-span-1 text-gray-500 text-center flex justify-center  items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 20 20">
	<path fill="currentColor" fill-rule="evenodd" d="M2.5 7.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m15 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m-7.274 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5" />
</svg>

        </div>
      </div>
      
       
        ))}
      </Panel>

 

      <Popover
        isOpen={isMobilePopoverOpen}
        onClose={() => setIsMobilePopoverOpen(false)}
        content={<InfoTable data={blogToView} fields={blogColumns} />} 
        details in the popover
      />
    </>
  );
};

export default ListBlog;
