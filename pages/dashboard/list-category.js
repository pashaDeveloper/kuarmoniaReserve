import Panel from "@/layouts/Panel";
import { FaPlus } from "react-icons/fa";
import React, { useState,useEffect } from "react";
import Modal from "../../components/shared/modal/Modal";
import { useGetCategoriesQuery,useSoftDeleteCategoryMutation  } from "@/services/category/categoryApi";
import AddCategory from "./add-category";
import { LiaInfoCircleSolid } from "react-icons/lia";
import DeleteConfirmationModal from '../../components/shared/modal/DeleteConfirmationModal'; // Import the modal
import { toast } from "react-hot-toast";

import {
  AiTwotoneDelete,
  AiTwotoneEdit,
} from "react-icons/ai";

const ListCategory = () => {
  const { data, isLoading, error,refetch } = useGetCategoriesQuery();
  const [softDeleteCategory] = useSoftDeleteCategoryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = Array.isArray(data?.data) ? data.data : [];
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (category) => {
    setIsModalOpen(false);
    
  };

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };
  const openEditModal = (category) => {
    setCategoryToEdit(category);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCategoryToEdit(null);
  };
  const handleDelete = async () => {
    try {
      const response = await softDeleteCategory(categoryToDelete._id).unwrap();
      closeDeleteModal();

      if (response.success) {
        toast.success(response.message );
        refetch(); 

      } else {
        toast.error(response.message );
      }
    } catch (error) {
      toast.error(error.message);
      console.error('Error deleting category', error);
    }
  };

  const handleAddCategorySuccess = () => {
    refetch();
  }
  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال ساخت دسته بندی...", { id: "add-category" });
    }

    if (data) {
      toast.success(data?.message, { id: "add-category" });
    
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "add-category" });
    }
  }, [data, error, isLoading]);
  return (
    <>
      <button
        className="fixed bottom-16 right-[400px] cursor-pointer bg-green-400 rounded-full flex items-center z-50 justify-center transition-all duration-300 hover:bg-green-700 active:scale-95"
        style={{
          width: "64px",
          height: "64px",
          transition:
            "background-color 0.3s !important, transform 0.1s !important",
        }}
        onClick={openModal}
      >
        <FaPlus size={24} color="white" />
      </button>

      <Panel>
        <section className="h-full w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 z-10">
              <thead className="text-xs text-gray-700 uppercase text-center bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ردیف
                  </th>
                  <th scope="col" className="px-6 py-3">
                    عملیات
                  </th>
                  <th scope="col" className="px-6 py-3">
                    شناسه
                  </th>
                  <th scope="col" className="px-6 py-3">
                    وضعیت
                  </th>
                  <th scope="col" className="px-6 py-3">
                    عنوان
                  </th>
                  <th scope="col" className="px-6 py-3">
                    توضیحات
                  </th>
                  <th scope="col" className="px-6 py-3">
                    تعداد
                  </th>
                  <th scope="col" className="px-6 py-3">
                    تاریخ ایجاد
                  </th>
                  <th scope="col" className="px-6 py-3">
                    اسلاگ
                  </th>
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
                        <AiTwotoneDelete 
                        className="w-6 h-6 hover:text-red-500 cursor-pointer"
                        onClick={() => openDeleteModal(category)}

                        />
                        <AiTwotoneEdit 
                        className="w-10 h-6  hover:text-blue-500 cursor-pointer" 
                        onClick={() => openEditModal(category)}

                        />
                        <LiaInfoCircleSolid className="w-6 h-6 hover:text-green-500 cursor-pointer" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {category.row}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-green-600"
                          checked={category.status}
                          onChange={() => toggleStatus(category._id)}
                        />
                        <span className="ml-2">
                          {category.status ? "فعال" : "غیرفعال"}
                        </span>
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
                    </td>{" "}
                    {/* تعداد یا سایر اطلاعات */}
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {new Date(category.createdAt).toLocaleDateString("fa-IR")}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {category.slug}
                    </td>
                  </tr>
                ))}
              </tbody>
              <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />
            </table>
          </div>
        </section>
      </Panel>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="lg:w-1/3 md:w-1/2 w-full z-50"
      >
        <AddCategory onClose={closeModal} onSuccess={handleAddCategorySuccess} />
        </Modal>
    </>
  );
};

export default ListCategory;
