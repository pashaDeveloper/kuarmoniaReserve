import Panel from "@/layouts/Panel";
import { FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Popover from "@/components/shared/modal/Popover";
import InfoTable from "@/components/shared/table/InfoTable";
import { useGetBlogsQuery, useUpdateBlogMutation } from "@/services/blog/blogApi"; // Blog API hooks
import TableComponent from "@/components/shared/table/Table";
import { handleView, toggleTooltipPopover, handleClose, handleEdit, handleDelete, handleStatus } from '@/utils/functionHelpers';
import { toast } from "react-hot-toast";
import { blogColumns } from '@/utils/columnsConfig';
import { useRouter } from 'next/router';

const ListBlog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, refetch } = useGetBlogsQuery({ page: currentPage, limit: 7 }); 
  const [updateBlog] = useUpdateBlogMutation(); 
  const [blogToView, setBlogToView] = useState(null);
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

  return (
    <>

  <button
        className="fixed bottom-16 right-[20px] md:right-[30px] lg:right-[400px] cursor-pointer bg-green-400 rounded-full flex items-center z-50 justify-center transition-all duration-300 hover:bg-green-700 active:scale-95"
        style={{ width: '64px', height: '64px', transition: 'background-color 0.3s !important, transform 0.1s !important' }}
        onClick={() => router.push('/dashboard/blogs/add')}
      >
        <FaPlus size={24} color="white" />
      </button>

      <Panel>
        <section className="h-full w-full">
        
          <TableComponent
            columns={blogColumns} 
            data={Array.isArray(data?.data) ? data.data : []}
            onEdit={(blog) => handleEdit(blog, setBlogToEdit, setIsEditModalOpen)} 
            onDelete={(blog) => handleDelete(blog, updateBlog, refetch)} 
            onClose={() => handleClose(setBlogToView, setIsEditModalOpen, setIsModalOpen)}
            onView={(blog) => handleView(blog, setBlogToView, toggleTooltipPopover)}
            toggleTooltipPopover={(blog) => toggleTooltipPopover(blog, setBlogToView, setIsMobilePopoverOpen, isMobilePopoverOpen)}
            onEnable={(blog) => handleStatus(blog, updateBlog, refetch)} 
            currentPage={currentPage}
            totalPages={Math.ceil(data?.total / 10)} 
            onPageChange={handlePageChange}
            itemsPerPage={7}
          />
        </section>
      </Panel>

      {/* <Modal
        isOpen={isModalOpen || isEditModalOpen}
        onClose={() => handleClose(setBlogToEdit, setIsEditModalOpen, setIsModalOpen)}
        className="lg:w-1/3 md:w-1/2 w-full z-50"
      >
        <AddBlog
          onClose={() => handleClose(setBlogToEdit, setIsEditModalOpen, setIsModalOpen)} 
          onSuccess={refetch} 
          blogToEdit={blogToEdit}
        />
      </Modal> */}

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
