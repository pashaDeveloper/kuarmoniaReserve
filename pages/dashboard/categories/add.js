// AddCategory.jsx
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddCategoryMutation, useUpdateCategoryMutation } from "@/services/category/categoryApi";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import Modal from "../../../components/shared/modal/Modal"; // اطمینان حاصل کنید که مسیر درست است

const AddCategory = ({ isOpen, onClose, onSuccess, categoryToEdit = null }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [addCategory, { isLoading: isAdding, data: addData, error: addError }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdating, data: updateData, error: updateError }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (categoryToEdit) {
      // پر کردن فرم با داده‌های موجود
      setValue("title", categoryToEdit.title);
      setValue("description", categoryToEdit.description);
    } else {
      reset(); // ریست کردن فرم اگر در حالت افزودن هستیم
    }
  }, [categoryToEdit, setValue, reset]);

  useEffect(() => {
    const isLoading = isAdding || isUpdating;
    const data = addData || updateData;
    const error = addError || updateError;

    if (isLoading) {
      toast.loading("در حال پردازش...", { id: "category" });
    }

    if (data) {
      toast.success(data?.message, { id: "category" });
      reset();
      if (onSuccess) {
        onSuccess(); // به‌روزرسانی لیست
      }
      if (onClose) {
        onClose(); // بستن مدال
      }
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "category" });
    }
  }, [addData, updateData, addError, updateError, isAdding, isUpdating, reset, onClose, onSuccess]);

  const handleAddOrUpdateCategory = (formData) => {
    try {
      if (categoryToEdit) {
        updateCategory({ id: categoryToEdit._id, ...formData }).unwrap();
      } else {
        addCategory(formData).unwrap();
      }
    } catch (err) {
      console.error("خطا در هنگام پردازش دسته بندی: ", err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="lg:w-1/3 md:w-1/2 w-full z-50"
    >
      <form
        className="text-sm w-full h-full flex flex-col gap-y-4"
        onSubmit={handleSubmit(handleAddOrUpdateCategory)}
      >
        <div className="flex gap-4 flex-col">
          <label htmlFor="title" className="flex flex-col gap-y-2">
            عنوان
            <input
              type="text"
              name="title"
              id="title"
              maxLength={50}
              placeholder="عنوان دسته‌بندی را تایپ کنید..."
              className="rounded"
              autoFocus
              {...register("title", { required: true })}
            />
          </label>
          <label htmlFor="description" className="flex flex-col gap-y-2">
            توضیحات
            <textarea
              name="description"
              id="description"
              maxLength={200}
              placeholder="توضیحات دسته‌بندی را تایپ کنید..."
              className="rounded h-32"
              {...register("description")}
            />
          </label>
          
          <Button type="submit" className="py-2 mt-4">
            {categoryToEdit ? "ویرایش کردن" : "ایجاد کردن"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCategory;
