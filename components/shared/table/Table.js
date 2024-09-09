import React, { useState } from "react";
import Tooltip from "@/components/shared/tooltip/Tooltip";
import Popover from "@/components/shared/modal/Popover";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { LiaInfoCircleSolid } from "react-icons/lia";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteConfirmationModal from "@/components/shared/modal/DeleteConfirmationModal";

const Table = ({ columns, data, onEdit, onDelete, toggleTooltipPopover }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isMobilePopoverOpen, setIsMobilePopoverOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: null, right: null });


  const toggleMobilePopover = (e) => {
  
    const { clientX, clientY } = e;
    const left = window.innerWidth - clientX + 140;

    setPopoverPosition({ top: clientY-20, left });
    setIsMobilePopoverOpen(!isMobilePopoverOpen);
  };

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      onDelete(itemToDelete);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left mb-8 whitespace-nowrap text-gray-500">
        <thead className="text-xs text-gray-700 text-center bg-gray-50">
          <tr>
            <th className="px-6 py-3">ردیف</th>
            <th className="px-6 py-3">عملیات</th>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-right">
          {data.map((item, index) => (
            <tr
              key={item._id}
              className="bg-white hover:bg-green-50 transition-colors"
            >
              <td className="px-6 py-4 text-right">{index + 1}</td>
              <td className="px-6 py-4 ltr text-right">
                <div className="flex items-center justify-end gap-1">
                  <div className="hidden sm:flex gap-1">
                    <Tooltip
                      text="حذف"
                      bgColor="bg-red-500"
                      txtColor="text-white"
                    >
                      <AiTwotoneDelete
                        className="w-6 h-6 hover:text-red-500 cursor-pointer"
                        onClick={() => confirmDelete(item)}
                      />
                    </Tooltip>
                    <Tooltip
                      text="ویرایش"
                      bgColor="bg-blue-500"
                      txtColor="text-white"
                    >
                      <AiTwotoneEdit
                        className="w-6 h-6 hover:text-blue-500 cursor-pointer"
                        onClick={() => onEdit(item)}
                      />
                    </Tooltip>
                    <Tooltip
                      text="جزئیات"
                      bgColor="bg-green-500"
                      txtColor="text-white"
                    >
                      <LiaInfoCircleSolid
                        className="w-6 h-6 hover:text-green-500 cursor-pointer"
                        onClick={() => toggleTooltipPopover(item)}
                      />
                    </Tooltip>
                  </div>
                  <div className="sm:hidden relative">
                    <BsThreeDotsVertical
                      className="w-6 h-6 cursor-pointer"
                      onClick={toggleMobilePopover}
                    />
                    {isMobilePopoverOpen && (
                      <Popover
                        className="absolute w-[120px]"
                        isOpen={isMobilePopoverOpen}
                        position={popoverPosition}

                        onClose={() => setIsMobilePopoverOpen(false)}
                        content={
                        <div className="flex gap-2 flex-col">
                            <div className="px-8  flex items-center justify-center font-medium text-gray-900 m-0 text-center whitespace-nowrap bg-gray-100 py-2 border-[1px] rounded">
                              <label className="inline-flex  items-center cursor-pointer ">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={item.status}
                                  onChange={() => toggleStatus(item._id, item.status)}
                                  />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                              </label>
                            </div>
                          
                            <button
                                                     onClick={() => confirmDelete(item)}

                              className="flex items-center gap-2 w-full text-right hover:text-red-500 bg-gray-100  border-[1px] hover:bg-red-100 hover:border-red-500 p-2 rounded"
                              >
                              <AiTwotoneDelete className="w-5 h-5" />
                              حذف
                            </button>
                          
                            <button
                                                   onClick={() => onEdit(item)}

                              className="flex items-center gap-2 w-full text-right hover:text-blue-500 bg-gray-100  border-[1px] hover:bg-blue-100 hover:border-blue-500 p-2 rounded"
                              >
                              <AiTwotoneEdit className="w-5 h-5" />
                              ویرایش
                            </button>
                          
                            <button
                        onClick={() => toggleTooltipPopover(item)}

                                className="flex items-center gap-2 w-full text-right hover:text-green-500  bg-gray-100  border-[1px] hover:bg-green-100 hover:border-green-500 p-2 rounded"
                                >
                              <LiaInfoCircleSolid className="w-5 h-5" />
                              جزئیات
                            </button>
                          
                    </div>
                        }
                      />
                    )}
                  </div>
                </div>
              </td>
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4">
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Table;
