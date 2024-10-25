import Panel from "@/layouts/Panel";
import { FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Modal from "@/components/shared/modal/Modal";
import { useGetTagsQuery, useUpdateTagMutation } from "@/services/tag/tagApi";
import AddTag from "./add";
import DeleteConfirmationModal from "@/components/shared/modal/DeleteConfirmationModal";
import { toast } from "react-hot-toast";
import { FiEdit3, FiTrash } from "react-icons/fi";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import Pagination from "@/components/shared/pagination/Pagination"; // اضافه‌شده
import AddButton from "@/components/shared/button/AddButton";

const ListTag = () => {
  const { data, isLoading, error, refetch } = useGetTagsQuery();
  const [updateTag] = useUpdateTagMutation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
console.log(data)
  // State های مرتبط با Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // تعداد آیتم در هر صفحه
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 1;

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (tag) => {
    setSelectedTag(tag);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedTag(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (tag) => {
    setSelectedTag(tag);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedTag(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await updateTag({
        id: selectedTag._id,
        isDeleted: true,
      }).unwrap();
      closeDeleteModal();
      if (response.success) {
        toast.success(response.message);
        refetch();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("خطا در حذف تگ");
      console.error("Error deleting tag", error);
    }
  };

  const toggleStatus = async (tagId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const response = await updateTag({ id: tagId, status: newStatus }).unwrap();
      if (response.success) {
        toast.success(response.message);
        refetch();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("خطا در تغییر وضعیت");
      console.error("Error toggling status", error);
    }
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت تگ‌ها...", { id: "tag-loading" });
    }
    if (data && !isLoading) {
      toast.dismiss("tag-loading");
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "tag-loading" });
    }
  }, [data, error, isLoading]);

  // تغییر صفحه برای Pagination
  const onPageChange = (page) => setCurrentPage(page);

  return (
    <>
      <Panel>
      <AddButton   onClick={openAddModal}/>     
        {/* نمایش داده‌های تگ‌ها */}
        {isLoading ? (
          <SkeletonItem repeat={10} />
        ) : data?.data?.length > 0 ? (
          data.data
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((tag) => (
              <div
                key={tag._id}
                className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100"
              >
                <div className="col-span-5 lg:col-span-3 text-center flex items-center">
                  <StatusIndicator isActive={tag.status === "active"} />
                  <div className="py-2 flex justify-center items-center gap-x-2">
                    <span className="line-clamp-1 text-sm lg:text-base">{tag.title}</span>
                  </div>
                </div>
                <div className="lg:col-span-2 col-span-3 text-center flex items-center">
                  <span className="line-clamp-1 text-sm lg:text-base">{tag.description}</span>
                </div>
                <div className="lg:col-span-2 col-span-2 text-center flex items-center">
  {tag.robots && tag.robots.length > 0
    ? tag.robots.map((robot) => robot.value).join(", ")
    : "هیچ رباتی وجود ندارد"}
</div>

<div className="lg:col-span-2 col-span-2 text-center flex items-center">
  {tag.keywords && tag.keywords.length > 0 ? tag.keywords.join(', ') : 'ندارد'}
</div>
                <div className="lg:col-span-2 col-span-2 text-center flex items-center">
                  {new Date(tag.createdAt).toLocaleDateString("fa-IR")}
                </div>
                <div className="lg:col-span-1 col-span-2 text-gray-500 text-right flex justify-right flex-row-reverse items-center">
                  <article className="flex-col flex  gap-y-1 ">
                    <span
                      className="line-clamp-1 cursor-pointer rounded-full border border-green-500/5 bg-green-500/5 p-2 text-green-500 transition-colors hover:border-green-500/10 hover:bg-green-500/10 hover:!opacity-100 group-hover:opacity-70"
                      onClick={() => openEditModal(tag)} 

                    >
                      <FiEdit3 className="w-5 h-5" />
                    </span>
                    <span className="line-clamp-1 cursor-pointer rounded-full border border-red-500/5 bg-red-500/5 p-2 text-red-500 transition-colors hover:border-red-500/10 hover:bg-red-500/10 hover:!opacity-100 group-hover:opacity-70" onClick={() => openDeleteModal(tag)}
                    >
                      <FiTrash className="w-5 h-5" />
                    </span>
                  </article>
                </div>
               
              </div>
            ))
        ) : (
          <div className="text-center text-gray-500">تگی وجود ندارد.</div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />

        {/* مودال حذف */}
        {isDeleteModalOpen && (
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            onConfirm={handleDelete}
            message={`آیا مطمئن هستید که می‌خواهید تگ "${selectedTag?.title}" را حذف کنید؟`}
          />
        )}

        {/* مودال افزودن/ویرایش */}
        {(isAddModalOpen || isEditModalOpen) && (
          <AddTag
            isOpen={isAddModalOpen || isEditModalOpen}
            onClose={isAddModalOpen ? closeAddModal : closeEditModal}
            onSuccess={refetch}
            tagToEdit={selectedTag}
          />
        )}
      </Panel>
    </>
  );
};

export default ListTag;
