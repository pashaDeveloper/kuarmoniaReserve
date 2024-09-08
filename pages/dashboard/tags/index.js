import Panel from "@/layouts/Panel";
import { FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Modal from "@/components/shared/modal/Modal";
import Popover from "@/components/shared/modal/Popover";
import DeleteConfirmationModal from "@/components/shared/modal/DeleteConfirmationModal";
import { useGetTagsQuery, useUpdateTagMutation } from "@/services/tag/tagApi";
import AddTag from "./add";
import { LiaInfoCircleSolid } from "react-icons/lia";
import { toast } from "react-hot-toast";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import Tooltip from "@/components/shared/tooltip/Tooltip";
import Info from "./info";
const ListTag = () => {
  const { data, isLoading, error, refetch } = useGetTagsQuery();
  const [updateTag] = useUpdateTagMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tags = Array.isArray(data?.data) ? data.data : [];
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tagToEdit, setTagToEdit] = useState(null);
  const [tagToView, setTagToView] = useState(null);
  // وضعیت پاپ‌آورها
  const [isMobilePopoverOpen, setIsMobilePopoverOpen] = useState(false); // برای موبایل
  const [isTooltipPopoverOpen, setIsTooltipPopoverOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: null, right: null });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (tag) => {
    setIsModalOpen(false);
  };

  const openDeleteModal = (tag) => {
    setTagToDelete(tag);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTagToDelete(null);
  };

  const openEditModal = (tag) => {
    setTagToEdit(tag);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTagToEdit(null);
  };

  const toggleMobilePopover = (e) => {
    const rect = e.target.getBoundingClientRect(); // موقعیت آیکون سه‌نقطه
    setPopoverPosition({
      top: rect.top + rect.height +20, // پایین آیکون
      left: rect.left-50, // هم‌راستای آیکون
    });
    setIsMobilePopoverOpen(!isMobilePopoverOpen);
  };
  const toggleTooltipPopover = (tag) => {
    setTagToView(tag);
    setIsTooltipPopoverOpen(!isTooltipPopoverOpen);
  };

  const handleDelete = async () => {
    try {
      const response = await updateTag({
        id: tagToDelete._id,
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
            <table
              className="w-full text-sm text-left scroll-mb-36 text-gray-500 z-10"
              style={{ marginBottom: "25px" }}
            >
              <thead className="text-xs text-gray-700 uppercase mb-3 text-center bg-gray-50">
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
                  <th scope="col"   className="px-6 py-3 hidden sm:table-cell" 
                  >
                    وضعیت
                  </th>
                  <th scope="col" className="px-6 py-3">
                    عنوان
                  </th>
                  <th scope="col" className="px-6 py-3">
                    توضیحات
                  </th>
                  <th scope="col" className="px-6 py-3">
                    کلمات کلیدی
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ربات‌ها
                  </th>
                  <th scope="col" className="px-6 py-3">
                    URL کاننیکال
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
                {tags.map((tag, index) => (
                  <tr
                    key={tag._id}
                    className="bg-white hover:bg-secondary/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {/* Hidden on mobile, visible on larger screens */}
                        <div className="hidden sm:flex gap-1">
                          <Tooltip
                            text="حذف"
                            bgColor="bg-red-500"
                            txtColor="text-white"
                          >
                            <AiTwotoneDelete
                              className="w-6 h-6 hover:text-red-500 cursor-pointer"
                              onClick={() => openDeleteModal(tag)}
                            />
                          </Tooltip>
                          <Tooltip
                            text="ویرایش"
                            bgColor="bg-blue-500"
                            txtColor="text-white"
                          >
                            <AiTwotoneEdit
                              className="w-10 h-6 hover:text-blue-500 cursor-pointer"
                              onClick={() => openEditModal(tag)}
                            />
                          </Tooltip>
                          <Tooltip
                            text="جزئیات"
                            bgColor="bg-green-500"
                            txtColor="text-white"
                          >
                            <LiaInfoCircleSolid
                              className="w-6 h-6 hover:text-green-500 cursor-pointer"
                              onClick={() => toggleTooltipPopover(tag)}
                            />
                          </Tooltip>
                        </div>

                        {/* Three-dot menu on mobile */}
                        <div className="sm:hidden relative">
                          <BsThreeDotsVertical
                            className="w-6 h-6 cursor-pointer"
                            onClick={toggleMobilePopover}

                            />

                          {/* Popover for mobile */}
                          {isMobilePopoverOpen && (
                            <Popover
                              isOpen={isMobilePopoverOpen}
                              onClose={() => setIsMobilePopoverOpen(false)}
                              position={popoverPosition} // موقعیت پاپ‌آور
                              className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                              content={
                                 <div className="flex flex-col item-center p-2">
                                                             <button
  onClick={() => {
    toggleStatus(tag._id, tag.status);
    setIsMobilePopoverOpen(false);
  }}
  className="flex items-center justify-center gap-2 w-full  p-2 "
>
<div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div> 
</button>
                                <button
                                  onClick={() => {
                                    openDeleteModal(tag);
                                    setIsMobilePopoverOpen(false);
                                  }}
                                  className="flex items-center gap-2 w-full text-right text-red-500 hover:bg-red-100 p-2 rounded"
                                >
                                  <AiTwotoneDelete className="w-5 h-5" />
                                  حذف
                                </button>
                                <button
                                  onClick={() => {
                                    openEditModal(tag);
                                    setIsMobilePopoverOpen(false);
                                  }}
                                  className="flex items-center gap-2 w-full text-right text-blue-500 hover:bg-blue-100 p-2 rounded"
                                >
                                  <AiTwotoneEdit className="w-5 h-5" />
                                  ویرایش
                                </button>
                                <button
                                  onClick={() => {
                                    toggleTooltipPopover(tag);
                                    setIsMobilePopoverOpen(false);
                                  }}
                                  className="flex items-center gap-2 w-full text-right text-green-500 hover:bg-green-100 p-2 rounded"
                                >
                                  <LiaInfoCircleSolid className="w-5 h-5" />
                                  جزئیات
                                </button>

                              </div>}
                       
                       >
                             
                            </Popover>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {tag.tagId}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap hidden sm:table-cell">
                      <input
                        type="checkbox"
                        class="sr-only peer"
                        checked={tag.status}
                        onChange={() => toggleStatus(Tag._id, tag.status)}
                      />
                      <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {tag.title}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {tag.description}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {tag.keywords && tag.keywords.length > 0
                        ? tag.keywords.join(", ")
                        : "ندارد"}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {tag.robots && tag.robots.length > 0
                        ? tag.robots.map((robot) => robot.value).join(", ")
                        : "ندارد"}
                    </td>
                    <td
                      className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap"
                      dir="ltr"
                    >
                      {tag.canonicalUrl ? tag.canonicalUrl : "ندارد"}
                    </td>

                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {new Date(tag.createdAt).toLocaleDateString("fa-IR")}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap">
                      {tag.slug}
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
          tagToEdit={tagToEdit}
        />
      </Modal>

      <Popover
        isOpen={isTooltipPopoverOpen}
        onClose={() => setIsTooltipPopoverOpen(false)}
        content={<Info tag={tagToView} />}
      />
    </>
  );
};

export default ListTag;
