import Panel from "@/layouts/Panel";
import React, { useState, useEffect } from "react";
import Popover from "@/components/shared/modal/Popover";
import InfoTable from "@/components/shared/table/InfoTable";
import AddButton from "@/components/shared/button/AddButton";
import { useGetBlogsQuery, useUpdateBlogMutation } from "@/services/blog/blogApi"; 
import TableComponent from "@/components/shared/table/Table";
import { handleView, toggleTooltipPopover, handleClose, handleEdit, handleDelete, handleStatus } from '@/utils/functionHelpers';
import { toast } from "react-hot-toast";
import { blogColumns } from '@/utils/columnsConfig';
import  StatusIndicator  from "@/components/shared/tools/StatusIndicator";
import { useRouter } from 'next/router';

const ListBlog = () => {  
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, refetch } = useGetBlogsQuery({ page: currentPage, limit: 7 }); 
  const [updateBlog] = useUpdateBlogMutation(); 
  const [blogToView, setBlogToView] = useState(null);
  const [isActive, setIsActive] = useState();
  const [isMobilePopoverOpen, setIsMobilePopoverOpen] = useState(false);
  const router = useRouter();



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
      <div className="my-6 flex flex-col items-center rounded-xl bg-sky-500 px-5 py-4 text-white md:flex-row"><div className="mb-2 inline-block rounded-full bg-white/20 p-1 md:mb-0 md:ml-2"></div><div className="flex-1 text-justify text-sm md:text-base"> 
       
        <a  className="font-bold cursor-pointer	">اینجا</a> کلیک کنید. </div></div>
      <AddButton onClick={handleAddItem} />
      <div class="mt-4 grid grid-cols-3 rounded-xl border border-gray-200 dark:border-white/10 dark:bg-slate-800 bg-white px-2 py-6 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-slate-700  md:grid-cols-5 ">
      <div class="col-span-2 px-5 text-right text-sky-500 md:col-span-1">
     <StatusIndicator isActive={isActive} />
          </div>
          </div>
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
