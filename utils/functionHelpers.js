import { toast } from "react-hot-toast";

export const handleEdit = (item, setViewState,setModalState) => {
  setModalState(true);
  setViewState(item);

};
  
export  const handleDelete = async (item, updateItem, refetch) => {
    try {
      const response = await updateItem({ id: item._id, isDeleted: true }).unwrap();
      if (response.success) {
        toast.success(response.message);
        refetch();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("خطا رد حذف ", error);
    }
  };

 export const handleStatus = async (item, updateItem,refetch) => {
    try {
      console.log(item)
      console.log(updateItem)

      const response = await updateItem({
        id: item._id,
        status: !item.status,
      }).unwrap();
  
      if (response.success) {
        toast.success(response.message);
        refetch();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("خطا در تغییر ");
      console.error("Error toggling status", error);
    }
  };
  
// تابع عمومی برای نمایش اطلاعات (view)
export const handleView = (item, setViewState, togglePopover) => {
    setViewState(item);
    togglePopover(item);
  };
  
  // تابع عمومی برای باز کردن modal
  export const openModal = (setModalState, setViewState) => {
    setModalState(true);
    setViewState(null);
  };
  
  // تابع عمومی برای تغییر حالت Popover
  export const toggleTooltipPopover = (item, setViewState, setPopoverState, isPopoverOpen) => {
    setViewState(item);
    setPopoverState(!isPopoverOpen);
  };
  
  // تابع عمومی برای بستن modal و reset کردن
  export const handleClose = (setTagToEdit, setEditModalState, setModalState) => {
    setTagToEdit(null);
    setEditModalState(false);
    setModalState(false);
  };
  