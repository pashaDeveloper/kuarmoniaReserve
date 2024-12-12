import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteGalleryMutation, useGetGalleryQuery } from "@/services/gallery/galleryApi";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { MdWarningAmber } from "react-icons/md";
import { FiTrash } from "react-icons/fi";

const Deletegallery = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError,
  } = useGetGalleryQuery(id);
  const gallery = useMemo(() => fetchData?.data || {}, [fetchData]);
  const [
    deletegallery,
    { isLoading: deleting, data: deleteData, error: deleteError },
  ] = useDeleteGalleryMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) {
      toast.loading("در حال به‌روزرسانی اطلاعات گالری...", {
        id: "fetchgallery",
      });
    }

    if (fetchData) {
      toast.success(fetchData?.message, { id: "fetchgallery" });
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.message, { id: "fetchgallery" });
    }

    if (deleting) {
      toast.loading("در حال حذف گالری...", { id: "deletegallery" });
    }

    if (deleteData) {
      toast.success(deleteData?.message, { id: "deletegallery" });
      setIsOpen(false);
    }

    if (deleteError?.data) {
      toast.error(deleteError?.data?.message, { id: "deletegallery" });
    }
  }, [fetching, fetchData, fetchError, deleting, deleteData, deleteError]);

  return (
    <>
          <button
        type="button"
        disable={deleting}
        className="p-1  "
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <FiTrash className="w-5 h-5" />
      </button>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          className="lg:w-3/12 md:w-1/2 w-full z-50"
        >
          <section className="h-full w-full flex flex-col gap-y-4">
            <article className="flex flex-col gap-y-8 h-full overflow-y-auto">
              <div className="flex flex-col gap-y-1">
                <div className="flex flex-col gap-y-4">
                 
                  <h1 className="text-2xl">{gallery?.category?.title}</h1>
                </div>
                <div className="flex flex-col gap-y-1">
                  
                </div>
              </div>
              <div className="text-sm flex flex-col gap-y-2.5">
                <p className="flex flex-row gap-x-1 items-center">
                  <MdWarningAmber className="w-5 h-5" /> این عملیات غیر قابل بازگشت است!
                </p>
              </div>
            </article>
            <div className="flex flex-row gap-x-2 justify-end text-sm">
              <button
                type="button"
                className="flex flex-row items-center gap-x-0.5 bg-red-100/50 border border-red-900 text-red-900 px-2 py-1 rounded uppercase"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <RxCross2 className="h-4 w-4" />
                لغو
              </button>
              <button
                type="button"
                className="flex flex-row items-center gap-x-0.5 bg-green-100/50 border border-green-900 text-green-900 px-2 py-1 rounded uppercase"
                onClick={() => deletegallery(id)}
              >
                <AiOutlineDelete className="h-4 w-4" />
                حذف
              </button>
            </div>
          </section>
        </Modal>
             )}
    </>
  );
};

export default Deletegallery;
