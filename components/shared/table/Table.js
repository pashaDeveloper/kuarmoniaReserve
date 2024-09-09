import React, { useState } from "react";
import Tooltip from '@/components/shared/tooltip/Tooltip';
import Popover from '@/components/shared/modal/Popover';
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai';
import { LiaInfoCircleSolid } from 'react-icons/lia';
import { BsThreeDotsVertical } from 'react-icons/bs';
import DeleteConfirmationModal from "@/components/shared/modal/DeleteConfirmationModal";

const Table = ({ columns, data, onEdit, onDelete, toggleTooltipPopover }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isMobilePopoverOpen, setIsMobilePopoverOpen] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState({ top: null, right: null });

    const toggleMobilePopover = (e) => {
        const rect = e.target.getBoundingClientRect();
        setPopoverPosition({
            top: rect.top + rect.height + 20,
            left: rect.left - 50,
        });
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
                        <tr key={item._id} className="bg-white hover:bg-green-50 transition-colors">
                            <td className="px-6 py-4 text-right">{index + 1}</td>
                            <td className="px-6 py-4 ltr text-right">
                                <div className="flex items-center justify-end gap-1">
                                    <div className="hidden sm:flex gap-1">
                                        <Tooltip text="حذف" bgColor="bg-red-500" txtColor="text-white">
                                            <AiTwotoneDelete
                                                className="w-6 h-6 hover:text-red-500 cursor-pointer"
                                                onClick={() => confirmDelete(item)}
                                            />
                                        </Tooltip>
                                        <Tooltip text="ویرایش" bgColor="bg-blue-500" txtColor="text-white">
                                            <AiTwotoneEdit
                                                className="w-6 h-6 hover:text-blue-500 cursor-pointer"
                                                onClick={() => onEdit(item)}
                                            />
                                        </Tooltip>
                                        <Tooltip text="جزئیات" bgColor="bg-green-500" txtColor="text-white">
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
                                                onClose={() => setIsMobilePopoverOpen(false)}
                                                top={popoverPosition.top}
                                                left={popoverPosition.left}
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
