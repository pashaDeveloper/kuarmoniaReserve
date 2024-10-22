import Panel from "@/layouts/Panel";
import React, { useState, useEffect } from "react";
import Popover from "@/components/shared/modal/Popover";
import InfoTable from "@/components/shared/table/InfoTable";
import AddButton from "@/components/shared/button/AddButton";
import {
  useGetBlogsQuery,
  useUpdateBlogMutation,
} from "@/services/blog/blogApi";
import {
  handleView,
  toggleTooltipPopover,
  handleClose,
  handleEdit,
  handleDelete,
  handleStatus,
} from "@/utils/functionHelpers";
import { toast } from "react-hot-toast";
import { blogColumns } from "@/utils/columnsConfig";
import  Metrics  from "@/components/shared/tools/Metrics";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import { useRouter } from "next/router";
import LoadImage from "@/components/shared/image/LoadImage";
import { SlLike, SlDislike } from "react-icons/sl";

const ListBlog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, refetch } = useGetBlogsQuery({
    page: currentPage,
    limit: 7,
  });
  const [updateBlog] = useUpdateBlogMutation();
  const [blogToView, setBlogToView] = useState(null);
  const [isActive, setIsActive] = useState();
  const [isMobilePopoverOpen, setIsMobilePopoverOpen] = useState(false);
  const router = useRouter();

  console.log(data);

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
    router.push("/dashboard/blogs/add");
  };
  return (
    <>
      <Panel>
        <div className="my-6 flex flex-col items-center rounded-xl bg-green-500 dark:bg-red-500 px-5 py-4 text-white md:flex-row">
          <div className="mb-2 inline-block rounded-full bg-white/20 p-1 md:mb-0 md:ml-2"></div>
          <div className="flex-1 text-justify text-sm md:text-base">
            <a className="font-bold cursor-pointer	">اینجا</a> کلیک کنید.{" "}
          </div>
        </div>
        {/* نمایش داده‌های بلاگ‌ها */}
        <AddButton onClick={handleAddItem} />

        {data &&
          data?.data?.length > 0 &&
          data?.data?.map((blog) => (
            <div
              key={blog.id}
              className="mt-4 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2  transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-slate-700"
            >
              <div className=" col-span-11 lg:col-span-3 text-center flex items-center">
                <StatusIndicator isActive={blog.status === "active"} />
                <div className=" py-2 flex flex-row gap-x-2 hover:text-white transition-colors rounded cursor-pointer  items-center">
                  <LoadImage
                    src={`/${blog?.authorId?.avatar?.url}`}
                    alt={``}
                    height={60}
                    width={60}
                    className="rounded-secondary object-cover "
                  />
                  <article className="flex-col gap-y-0.5  ">
                    <h2 className="line-clamp-1 text-base ">
                      <span className="hidden lg:flex">{blog?.authorId?.name}</span>
                      <span className="flex lg:hidden">{blog.title}</span>
                      
                    </h2>
                    <span className="text-xs hidden lg:flex">
                      {new Date(blog.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                  </article>
                </div>
              </div>

              <div className=" hidden lg:col-span-6 text-center lg:first-letter:flex items-center">
                <p className="text-gray-500 dark:text-gray-300">{blog.title}</p>
              </div>

              <div className="hidden lg:col-span-2 gap-2 text-center lg:flex justify-center  items-center ">
              <Metrics 
  likeCount={30} 
  dislikeCount={20} 
  views={50}
  rating={4.5} 
  iconSize={18}
/>
              </div>

              <div className="col-span-1 text-gray-500 text-center flex justify-right flex-row-reverse items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M2.5 7.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m15 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m-7.274 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5"
                  />
                </svg>
              </div>
            </div>
          ))}
      </Panel>

      <Popover
        isOpen={isMobilePopoverOpen}
        onClose={() => setIsMobilePopoverOpen(false)}
        content={<InfoTable data={blogToView} fields={blogColumns} />}
        details
        in
        the
        popover
      />
    </>
  );
};

export default ListBlog;
