import React, { useState, useEffect, useMemo } from "react";
import Panel from "@/layouts/Panel";
import { FaPlus } from "react-icons/fa";
import { useGetCategoriesQuery, useUpdateCategoryMutation } from "@/services/category/categoryApi";
import AddCategory from "./add";
import { LiaInfoCircleSolid } from "react-icons/lia";
import DeleteConfirmationModal from "../../../components/shared/modal/DeleteConfirmationModal";
import { toast } from "react-hot-toast";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import Tooltip from "../../../components/shared/tooltip/Tooltip";
import Info from "./info";
import LoadImage from "@/components/shared/image/LoadImage";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import AddButton from "@/components/shared/button/AddButton";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem"; // اضافه کردن SkeletonItem
import { FiEdit3,FiTrash } from "react-icons/fi";

const ListCategory = () => {
  const { data, isLoading, error, refetch } = useGetCategoriesQuery();
  const [updateCategory] = useUpdateCategoryMutation();
  const categories = useMemo(() => Array.isArray(data?.data) ? data.data : [], [data]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedCategory(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedCategory(null);
    setIsDeleteModalOpen(false);
  };

  const openInfoModal = (category) => {
    setSelectedCategory(category);
    setIsInfoModalOpen(true);
  };
  const closeInfoModal = () => {
    setSelectedCategory(null);
    setIsInfoModalOpen(false);
  };

  const handleDelete = async () => {
    const categoryToDelete = selectedCategory;
    try {
      const response = await updateCategory({
        id: categoryToDelete._id,
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
      toast.error(error.message || "خطا در حذف دسته‌بندی");
      console.error("Error deleting category", error);
    }
  };

  const toggleStatus = async (categoryId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const response = await updateCategory({
        id: categoryId,
        status: newStatus,
      }).unwrap();

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
      toast.loading("در حال دریافت دسته بندی...", { id: "category-loading" });
    }

    if (data && !isLoading) {
      toast.dismiss("category-loading");
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "category-loading" });
    }
  }, [data, error, isLoading]);

  return (
    <>
      <Panel>
        {/* دکمه افزودن دسته‌بندی */}
        <AddButton onClick={openAddModal} />

        {/* نمایش داده‌های دسته‌بندی‌ها */}
        {isLoading ||categories && categories.length == 0 ? (
          <SkeletonItem repeat={10} /> // نمایش اسکلتون در حالت بارگذاری
        ) : categories && categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100"
            >
              <div className="col-span-5 lg:col-span-3 text-center flex items-center">
                <StatusIndicator isActive={category.status === "active"} />
                <div className="py-2 flex justify-center items-center flex-row gap-x-2 hover:text-white transition-colors rounded-full cursor-pointer ">
           
                  <article className="flex-col flex gap-y-2">
                    <span className="line-clamp-1 text-sm lg:text-base dark:text-blue-400">
                      <span className="flex">{category.title}</span>
                    </span>
                  </article>
                </div>
              </div>

              <div className="lg:col-span-3 col-span-5 gap-2 text-center flex justify-left items-center">
                <article className="flex-col flex gap-y-2">
                  <span className="line-clamp-1 text-sm lg:text-base">
                    <span className="flex">{category.description}</span>
                  </span>
                </article>
              </div>

              <div className="lg:col-span-2 lg:flex hidden gap-2 text-center flex justify-center items-center">
              {new Date(category.createdAt).toLocaleDateString("fa-IR")}
              </div>

              <div className="hidden lg:col-span-3 col-span-5 gap-2 text-center lg:flex justify-center items-center">
                <article className="flex-col flex gap-y-2">
                  <span className="flex">
                    {category.slug}
                  </span>
                </article>
              </div>
              <div className="lg:col-span-1 col-span-2 text-gray-500 text-right flex justify-right flex-row-reverse items-center">
                  <article className="flex-col flex  gap-y-1 ">
                    <span
                      className="line-clamp-1 cursor-pointer rounded-full border border-green-500/5 bg-green-500/5 p-2 text-green-500 transition-colors hover:border-green-500/10 hover:bg-green-500/10 hover:!opacity-100 group-hover:opacity-70"
                      onClick={() => openEditModal(category)}

                    >
                      <FiEdit3 className="w-5 h-5" />
                    </span>
                    <span className="line-clamp-1 cursor-pointer rounded-full border border-red-500/5 bg-red-500/5 p-2 text-red-500 transition-colors hover:border-red-500/10 hover:bg-red-500/10 hover:!opacity-100 group-hover:opacity-70" onClick={() => openDeleteModal(category)}
                    >
                      <FiTrash className="w-5 h-5" />
                    </span>
                  </article>
                </div>
             
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">دسته‌بندی‌ای وجود ندارد.</div>
        )}

        {/* مودال حذف */}
        {isDeleteModalOpen && (
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            onConfirm={handleDelete}
            message={`آیا مطمئن هستید که می‌خواهید دسته‌بندی "${selectedCategory.title}" را حذف کنید؟`}
          />
        )}

        {/* مودال ویرایش */}
        {isEditModalOpen && (
          <AddCategory
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            onSuccess={refetch}
            categoryToEdit={selectedCategory}
          />
        )}

        {/* مودال جزئیات */}
        {isInfoModalOpen && (
          <Modal
            isOpen={isInfoModalOpen}
            onClose={closeInfoModal}
            className="lg:w-1/3 md:w-1/2 w-full z-50"
          >
            <Info category={selectedCategory} onClose={closeInfoModal} />
          </Modal>
        )}

        {/* مودال افزودن */}
        {isAddModalOpen && (
          <AddCategory
            isOpen={isAddModalOpen}
            onClose={closeAddModal}
            onSuccess={refetch}
          />
        )}
      </Panel>
    </>
  );
};

export default ListCategory;
