// ListCategory.jsx
import React, { useState, useEffect } from "react";
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

const ListCategory = () => {
  const { data, isLoading, error, refetch } = useGetCategoriesQuery();
  const [updateCategory] = useUpdateCategoryMutation();
  const categories = Array.isArray(data?.data) ? data.data : [];

  // وضعیت‌های جداگانه برای هر نوع مودال
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // توابع باز کردن مودال‌ها
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
      // در صورت نیاز می‌توانید پیام موفقیت‌آمیز اضافه کنید
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "category-loading" });
    }
  }, [data, error, isLoading]);

  return (
    <>
      {/* دکمه افزودن دسته‌بندی */}
      <button
        className="fixed bottom-16 right-[400px] cursor-pointer bg-green-400 rounded-full flex items-center z-50 justify-center transition-all duration-300 hover:bg-green-700 active:scale-95"
        style={{
          width: "64px",
          height: "64px",
          transition:
            "background-color 0.3s !important, transform 0.1s !important",
        }}
        onClick={openAddModal}
      >
        <FaPlus size={24} color="white" />
      </button>

      <Panel>
        <section className="h-full w-full ">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 z-10 ">
              <thead className="text-xs text-gray-700 uppercase text-center bg-gray-50">
                <tr>
                  <th className="px-6 py-3">ردیف</th>
                  <th className="px-6 py-3">عملیات</th>
                  <th className="px-6 py-3">شناسه</th>
                  <th className="px-6 py-3">وضعیت</th>
                  <th className="px-6 py-3">عنوان</th>
                  <th className="px-6 py-3">توضیحات</th>
                  <th className="px-6 py-3">تعداد</th>
                  <th className="px-6 py-3">تاریخ ایجاد</th>
                  <th className="px-6 py-3">اسلاگ</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr
                    key={category._id}
                    className="bg-white hover:bg-secondary/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Tooltip
                          text="حذف"
                          bgColor="bg-red-500"
                          txtColor="text-white"
                        >
                          <AiTwotoneDelete
                            className="w-6 h-6 hover:text-red-500 cursor-pointer"
                            onClick={() => openDeleteModal(category)}
                          />
                        </Tooltip>
                        <Tooltip
                          text="ویرایش"
                          bgColor="bg-blue-500"
                          txtColor="text-white"
                        >
                          <AiTwotoneEdit
                            className="w-6 h-6 hover:text-blue-500 cursor-pointer"
                            onClick={() => openEditModal(category)}
                          />
                        </Tooltip>
                        <Tooltip
                          text="جزئیات"
                          bgColor="bg-green-500"
                          txtColor="text-white"
                        >
                          <LiaInfoCircleSolid
                            className="w-6 h-6 hover:text-green-500 cursor-pointer"
                            onClick={() => openInfoModal(category)}
                          />
                        </Tooltip>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {category.categoryId}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      <label className="inline-flex items-center me-5 cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={category.status === "active"}
                          onChange={() =>
                            toggleStatus(category._id, category.status)
                          }
                        />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {category.title}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {category.description}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      ---
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {new Date(category.createdAt).toLocaleDateString(
                        "fa-IR"
                      )}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {category.slug}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* مودال حذف */}
            {isDeleteModalOpen  && (
              <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                message={`آیا مطمئن هستید که می‌خواهید دسته‌بندی "${selectedCategory.title}" را حذف کنید؟`}
              />
            )}

            {/* مودال ویرایش */}
       
              <AddCategory
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                onSuccess={refetch}
                categoryToEdit={selectedCategory}
              />
       


            {/* مودال جزئیات */}
            {isInfoModalOpen  && (
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
          </div>
        </section>
      </Panel>
    </>
  );
};

export default ListCategory;
