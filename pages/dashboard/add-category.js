import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddCategoryMutation } from "@/services/category/categoryApi";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const AddCategory = ({ onClose, onSuccess }) => {
  const { register, handleSubmit, reset } = useForm();
  const [addCategory, { isLoading, data, error }] = useAddCategoryMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال ساخت دسته بندی...", { id: "add-category" });
    }

    if (data) {
      toast.success(data?.message, { id: "add-category" });
      reset();
      if (onSuccess) {
        onSuccess(); // فراخوانی callback برای به‌روزرسانی لیست
      }
      if (onClose) {
        onClose(); 
      }
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "add-category" });
    }
  }, [data, error, isLoading, reset, onClose, onSuccess]);

  const handleAddCategory = (formData) => {
    try {
      addCategory(formData).unwrap();
    } catch (err) {
      console.error("خطا در نگام ساخت دسته بندی: ", err);
    }
  };

  return (
    <form
      className="text-sm w-full h-full flex flex-col gap-y-4"
      onSubmit={handleSubmit(handleAddCategory)}
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
          ایجاد کردن
        </Button>
      </div>
    </form>
  );
};

export default AddCategory;
