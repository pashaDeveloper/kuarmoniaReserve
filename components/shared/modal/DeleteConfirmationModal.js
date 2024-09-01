const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-lg font-bold">آیا مطمئن هستید؟</h2>
          <p className="my-2">این عملیات غیرقابل بازگشت است.</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              خیر
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              بله
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteConfirmationModal;
