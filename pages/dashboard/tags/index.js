import Panel from "@/layouts/Panel";
import { FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Modal from "../../../components/shared/modal/Modal";
import {
  useGetTagsQuery,useUpdateTagMutation} from "@/services/tag/tagApi";
import AddTag from "./add";
import { LiaInfoCircleSolid } from "react-icons/lia";
import DeleteConfirmationModal from "../../../components/shared/modal/DeleteConfirmationModal";
import { toast } from "react-hot-toast";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import Tooltip from "../../../components/shared/tooltip/Tooltip";
import Info from "./info";
const ListTag = () => {
  const { data, isLoading, error, refetch } = useGetTagsQuery();
  const [updateTag] = useUpdateTagMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = Array.isArray(data?.data) ? data.data : [];
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [TagToDelete, setTagToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [TagToEdit, setTagToEdit] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [TagToView, setTagToView] = useState(null);

  const openModal = () => { 
    setIsModalOpen(true);
  };

  const closeModal = (Tag) => {
    setIsModalOpen(false);
  };

  const openDeleteModal = (Tag) => {
    setTagToDelete(Tag);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTagToDelete(null);
  };

  const openEditModal = (Tag) => {
    setTagToEdit(Tag);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTagToEdit(null);
  };

  const openInfoModal = (Tag) => {
    setTagToView(Tag);
    setIsInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
    setTagToView(null);
  };
  const handleDelete = async () => {
    try {
      const response = await updateTag({
        id: TagToDelete._id,
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
      toast.error(error.message);
      console.error("Error deleting Tag", error);
    }
  };
  
  const toggleStatus = async (tagId, currentStatus) => {
    console.log("tags before deletion:", tags);

    try {
      const response = await updateTag({
        id: TagId,
        status: !currentStatus,
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
  
  const handleAddTagSuccess = () => {
    refetch();
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت تگ...", { id: "add-Tag" });
    }

    if (data) {
      toast.success(data?.message, { id: "add-Tag" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "add-Tag" });
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
                {categories.map((Tag, index) => (

                  <tr
                    key={Tag._id}
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
                            onClick={() => openDeleteModal(Tag)}
                          />
                        </Tooltip>
                        <Tooltip
                          text="ویرایش"
                          bgColor="bg-blue-500"
                          txtColor="text-white"
                        >
                          <AiTwotoneEdit
                            className="w-10 h-6 hover:text-blue-500 cursor-pointer"
                            onClick={() => openEditModal(Tag)}
                          />
                        </Tooltip>
                        <Tooltip
                          text="جزئیات"
                          bgColor="bg-green-500"
                          txtColor="text-white"
                        >
                          <LiaInfoCircleSolid
                            className="w-6 h-6 hover:text-green-500 cursor-pointer"
                            onClick={() => openInfoModal(Tag)}
                          />
                        </Tooltip>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {Tag.TagId}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      <label class="inline-flex items-center me-5 cursor-pointer">
                        <input
                          type="checkbox"
                          class="sr-only peer"
                          checked={Tag.status}
                          onChange={() => toggleStatus(Tag._id, Tag.status)}                        />
                        <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {Tag.status ? "فعال" : "غیرفعال"}
                        </span>
                      </label>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {Tag.title}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {Tag.description}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      ---
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {new Date(Tag.createdAt).toLocaleDateString("fa-IR")}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {Tag.slug}
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

      {/* مدال افزودن/ویرایش دسته‌بندی */}
      <Modal
        isOpen={isModalOpen || isEditModalOpen}
        onClose={isModalOpen ? closeModal : closeEditModal}
        className="lg:w-1/3 md:w-1/2 w-full z-50"
      >
        <AddTag
          onClose={isModalOpen ? closeModal : closeEditModal}
          onSuccess={handleAddTagSuccess}
          TagToEdit={TagToEdit}
        />
      </Modal>

      <Info
        isOpen={isInfoModalOpen}
        onClose={closeInfoModal}
        Tag={TagToView}
      />
    </>
  );
};

export default ListTag;
