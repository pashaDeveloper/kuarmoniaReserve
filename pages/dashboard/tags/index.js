import Panel from "@/layouts/Panel";
import { FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Modal from "@/components/shared/modal/Modal";
import Popover from "@/components/shared/modal/Popover";
import { useGetTagsQuery, useUpdateTagMutation } from "@/services/tag/tagApi";
import AddTag from "./add";
import Info from "./info";
import Table from "@/components/shared/table/Table";
import { handleView, openModal, toggleTooltipPopover, handleClose, handleEdit, handleDelete } from '@/utils/functionHelpers';
import { toast } from "react-hot-toast";

const ListTag = () => {
  const {data, isLoading, error, refetch} = useGetTagsQuery();
  const [updateTag] = useUpdateTagMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tagToEdit, setTagToEdit] = useState(null);
  const [tagToView, setTagToView] = useState(null);
  const [isMobilePopoverOpen, setIsMobilePopoverOpen] = useState(false);

  const columns = [
    { key: 'tagId', label: 'شناسه' },
    { key: 'title', label: 'عنوان' },
    { key: 'description', label: 'توضیحات' },
    { key: 'keywords', label: 'کلمات کلیدی', render: (item) => item.keywords && item.keywords.length > 0 ? item.keywords.join(", ") : "ندارد" },
    { key: 'robots', label: 'ربات‌ها', render: (item) => item.robots && item.robots.length > 0 ? item.robots.map((robot) => robot.value).join(", ") : "ندارد" },
    { key: 'canonicalUrl', label: 'URL کاننیکال' },
    { key: 'createdAt', label: 'تاریخ ایجاد', render: (item) => new Date(item.createdAt).toLocaleDateString("fa-IR") },
    { key: 'slug', label: 'اسلاگ' },
  ];

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
        style={{ width: "64px", height: "64px", transition: "background-color 0.3s !important, transform 0.1s !important" }}
        onClose={() => handleClose(setTagToView, setIsEditModalOpen, setIsModalOpen)}
        onClick={() => {
          openModal(setIsModalOpen, setTagToView);
        }}        
      >
        <FaPlus size={24} color="white" />
      </button>

      <Panel>
        <section className="h-full w-full">
          <Table
            columns={columns}
            data={Array.isArray(data?.data) ? data.data : []}
            onEdit={(tag) => handleEdit(tag, setTagToEdit,setIsEditModalOpen)}
            onDelete={(tag) => handleDelete(tag, updateTag, refetch)}
            onClose={() => handleClose(setTagToView, setIsEditModalOpen, setIsModalOpen)}
            onView={(tag) => handleView(tag, setTagToView, toggleTooltipPopover)}
            toggleTooltipPopover={(tag) => toggleTooltipPopover(tag, setTagToView, setIsMobilePopoverOpen, isMobilePopoverOpen)}
          />
        </section>
      </Panel>

      <Modal
        isOpen={isModalOpen || isEditModalOpen}
        onClose={() => handleClose(setTagToEdit, setIsEditModalOpen, setIsModalOpen)}
        className="lg:w-1/3 md:w-1/2 w-full z-50"
      >
        <AddTag
          onClose={() => handleClose(setTagToEdit, setIsEditModalOpen, setIsModalOpen)}
          onSuccess={refetch}
          tagToEdit={tagToEdit}
        />
      </Modal>

      <Popover
        isOpen={isMobilePopoverOpen}
        onClose={() => setIsMobilePopoverOpen(false)}
        content={<Info tag={tagToView} />}
      />
    </>
  );
};

export default ListTag;
