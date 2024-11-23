const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    isOpen && (
      <Modal></Modal>
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-lg font-bold">آیا مطمئن هستید؟</h2>
          <p className="my-2">این عملیات غیرقابل بازگشت است.</p>
          <div className="flex justify-end gap-2">
           
            <article className="w-full flex gap-x-4 justify-evenly">
              <Button
                type="submit"
                className="py-2 !bg-red-500 !border-red-600 w-full !hover:bg-red-900/90"
                onClick={onConfirm}
              >
                حذف 
              </Button>
              <Button
                className="py-2 w-full"
                onClick={onClose}
              >
                انصراف
              </Button>
            </article>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteConfirmationModal;
