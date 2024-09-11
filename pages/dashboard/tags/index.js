import Panel from "@/layouts/Panel";
import { FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Modal from "@/components/shared/modal/Modal";
import Popover from "@/components/shared/modal/Popover";
import InfoTable from "@/components/shared/table/InfoTable";
import { useGetTagsQuery, useUpdateTagMutation } from "@/services/tag/tagApi";
import AddTag from "./add";
import Table from "@/components/shared/table/Table";
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
      <div className="mt-4 grid grid-cols-3 rounded-xl border border-white/10 bg-slate-800 px-2 py-6 transition-all hover:border-slate-700 hover:bg-slate-700 md:grid-cols-5"><div className="col-span-2 px-5 text-right text-sky-500 md:col-span-1"><div className="flex items-center"><span className="relative ml-3 mr-0.5 flex h-3 w-3"><span className="animate-ping bg-teal-400 absolute inline-flex h-full w-full rounded-full opacity-75"></span><span className="bg-teal-400 relative inline-flex h-3 w-3 rounded-full"></span></span><a href="/projects/YXGnM42Ghe/servers/H3K5NOnQXw0q1nnx" className="overflow-hidden text-ellipsis whitespace-nowrap text-lg transition-all hover:text-slate-100">v222222</a></div></div><div className="hidden px-5 text-right text-slate-200 md:block"><div className="flex cursor-pointer items-center font-sans text-base font-light"><button className="ml-2 appearance-none"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-sky-500 transition-all hover:text-sky-200"><path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z"></path><path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z"></path></svg></button> 87.107.102.146</div></div><div className="hidden px-5 text-right text-slate-200 md:block"><div className="flex items-center"> پارسیان</div></div><div className="hidden px-5 text-right text-slate-200 md:block">۱۴۰۳/۴/۱۹, ۱۶:۳۵</div><div className="px-5 text-right text-slate-400"><div className="flex items-center"><a href="/projects/YXGnM42Ghe/servers/H3K5NOnQXw0q1nnx" className="appearance-none"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-sky-500 transition-all hover:text-sky-200"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path><path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd"></path></svg></a><div data-headlessui-state="" className="relative  text-right mr-5 "><div><button id="headlessui-menu-button-16" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mt-2 h-5 w-5 text-sky-400  transition-all hover:text-sky-200"><path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"></path></svg></button></div></div></div></div></div>
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
          <Table
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
