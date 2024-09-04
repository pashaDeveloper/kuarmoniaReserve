import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddTagMutation, useUpdateTagMutation } from "@/services/tag/tagApi";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const AddTag = ({ onClose, onSuccess, TagToEdit = null }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [addTag, { isLoading: isAdding, data: addData, error: addError }] = useAddTagMutation();
  const [updateTag, { isLoading: isUpdating, data: updateData, error: updateError }] = useUpdateTagMutation();

  useEffect(() => {
    if (TagToEdit) {
      // پر کردن فرم با داده‌های موجود
      setValue("title", tagToEdit.title);
      setValue("description", tagToEdit.description);
    }
  }, [TagToEdit, setValue]);

  useEffect(() => {
    const isLoading = isAdding || isUpdating;
    const data = addData || updateData;
    const error = addError || updateError;

    if (isLoading) {
      toast.loading("در حال پردازش...", { id: "tag" });
    }

    if (data) {
      toast.success(data?.message, { id: "tag" });
      reset();
      if (onSuccess) {
        onSuccess(); // به‌روزرسانی لیست
      }
      if (onClose) {
        onClose(); // بستن مدال
      }
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "Tag" });
    }
  }, [addData, updateData, addError, updateError, isAdding, isUpdating, reset, onClose, onSuccess]);

  const handleAddOrUpdateTag = (formData) => {
    try {
      if (TagToEdit) {
        updateTag({ id: TagToEdit._id, ...formData }).unwrap();
      } else {
        console.log(formData)
        addTag(formData).unwrap();
      }
    } catch (err) {
      console.error("خطا در هنگام پردازش تگ: ", err);
    }
  };

  return (
    <form
      className="text-sm w-full h-full flex flex-col gap-y-4"
      onSubmit={handleSubmit(handleAddOrUpdateTag)}
    >
      <div className="flex gap-4 flex-col">
        <label htmlFor="title" className="flex flex-col gap-y-2">
          عنوان
          <input
            type="text"
            name="title"
            id="title"
            maxLength={50}
            placeholder="عنوان تگ را تایپ کنید..."
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
            placeholder="توضیحات تگ را تایپ کنید..."
            className="rounded h-32"
            {...register("description")}
          />
        </label>
        
        <Button type="submit" className="py-2 mt-4">
          {TagToEdit ? "ویرایش کردن" : "ایجاد کردن"}
        </Button>
      </div>
    </form>
  );
};

export default AddTag;
