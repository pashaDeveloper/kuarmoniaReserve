import Panel from "@/layouts/Panel";
import { FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Modal from "@/components/shared/modal/Modal";
import Popover from "@/components/shared/modal/Popover";
import InfoTable from "@/components/shared/table/InfoTable";
import { useGetTagsQuery, useUpdateTagMutation } from "@/services/tag/tagApi";
import AddTag from "./add";
import TableComponent from "@/components/shared/table/Table";
import { handleView, openModal, toggleTooltipPopover, handleClose, handleEdit, handleDelete ,handleStatus } from '@/utils/functionHelpers';
import { tagColumns } from '@/utils/columnsConfig';
import { toast } from "react-hot-toast";

const ListTag = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {data, isLoading, error, refetch} = useGetTagsQuery({ page: currentPage, limit: 7 });
  const [updateTag] = useUpdateTagMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tagToEdit, setTagToEdit] = useState(null);
  const [tagToView, setTagToView] = useState(null);
  const [isMobilePopoverOpen, setIsMobilePopoverOpen] = useState(false);

 
  const handlePageChange = (newPage) => {
    console.log("Current Page:", newPage);
    setCurrentPage(newPage);

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
        className="fixed bottom-16 right-[20px] md:right-[30px] lg:right-[400px] cursor-pointer bg-green-400 rounded-full flex items-center z-50 justify-center transition-all duration-300 hover:bg-green-700 active:scale-95"
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
          <TableComponent
            columns={tagColumns}
            data={Array.isArray(data?.data) ? data.data : []}
            onEdit={(tag) => handleEdit(tag, setTagToEdit,setIsEditModalOpen)}
            onDelete={(tag) => handleDelete(tag, updateTag, refetch)}
            onClose={() => handleClose(setTagToView, setIsEditModalOpen, setIsModalOpen)}
            onView={(tag) => handleView(tag, setTagToView, toggleTooltipPopover)}
            toggleTooltipPopover={(tag) => toggleTooltipPopover(tag, setTagToView, setIsMobilePopoverOpen, isMobilePopoverOpen)}
            onEnable={(tag)=>handleStatus(tag,updateTag,refetch)}
            currentPage={currentPage}
            totalPages={Math.ceil(data?.total / 10)} // محاسبه تعداد کل صفحات
            onPageChange={handlePageChange}
            itemsPerPage={7} 
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
        content={<InfoTable data={tagToView} fields={tagColumns} />}
      />
    </>
  );
};

export default ListTag;
