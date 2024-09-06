import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import { useAddTagMutation, useUpdateTagMutation } from "@/services/tag/tagApi";
import React, { useEffect,useState } from "react";
import { toast } from "react-hot-toast";

const AddTag = ({ onClose, onSuccess, tagToEdit = null }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [addTag, { isLoading: isAdding, data: addData, error: addError }] =
    useAddTagMutation();
  const [
    updateTag,
    { isLoading: isUpdating, data: updateData, error: updateError },
  ] = useUpdateTagMutation();

  useEffect(() => {
    if (tagToEdit) {
      // پر کردن فرم با داده‌های موجود
      setValue("title", TagToEdit.title);
      setValue("description", TagToEdit.description);
      setValue("keywords", TagToEdit.keywords.join(", "));
      setValue("robots", TagToEdit.robots);
      setValue("image", TagToEdit.image);
    }
  }, [tagToEdit, setValue]);

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
  }, [
    addData,
    updateData,
    addError,
    updateError,
    isAdding,
    isUpdating,
    reset,
    onClose,
    onSuccess,
  ]);

  const handleAddOrUpdateTag = (formData) => {
    try {
      formData.keywords = formData.keywords
        .split(",")
        .map((keyword) => keyword.trim());
        
      // ذخیره‌سازی با id و value
      formData.robots = selectedOptions.map(option => ({ id: option.id, value: option.value }));
      
      if (tagToEdit) {
        updateTag({ id: TagToEdit._id, ...formData }).unwrap();
      } else {
        addTag(formData).unwrap();
      }
    } catch (err) {
      console.error("خطا در هنگام پردازش تگ: ", err);
    }
  };
  
 const robotOptions = [
  { id: 1, value: 'index', label: 'Index', tooltip: 'اجازه می‌دهد موتورهای جستجو صفحه را ایندکس کنند' },
  { id: 2, value: 'noindex', label: 'Noindex', tooltip: 'از ایندکس کردن صفحه توسط موتورهای جستجو جلوگیری می‌کند' },
  { id: 3, value: 'follow', label: 'Follow', tooltip: 'اجازه می‌دهد موتورهای جستجو لینک‌های موجود در صفحه را دنبال کنند' },
  { id: 4, value: 'nofollow', label: 'Nofollow', tooltip: 'از دنبال کردن لینک‌های موجود در صفحه توسط موتورهای جستجو جلوگیری می‌کند' }
];
    const handleOptionsChange = (newSelectedOptions) => {
    setSelectedOptions(newSelectedOptions);
  };


  return (
    <>
    <form
      className="text-sm w-full h-full flex flex-col gap-y-4 mb-3"
      onSubmit={handleSubmit(handleAddOrUpdateTag)}
    >

      <div className="flex gap-4 flex-col">
        {/* عنوان */}
        <label htmlFor="title" className="flex flex-col gap-y-2">
          عنوان
          <input
            type="text"
            name="title"
            id="title"
            maxLength={70}
            placeholder="عنوان تگ را تایپ کنید..."
            className="rounded"
            autoFocus
            {...register("title", { required: true })}
            />
        </label>

        {/* توضیحات */}
        <label htmlFor="description" className="flex flex-col gap-y-2">
          توضیحات
          <textarea
            name="description"
            id="description"
            maxLength={160}
            placeholder="توضیحات تگ را تایپ کنید..."
            className="rounded h-32"
            {...register("description")}
            />
        </label>

        {/* کلمات کلیدی */}
        <label htmlFor="keywords" className="flex flex-col gap-y-2">
          کلمات کلیدی
          <input
            type="text"
            name="keywords"
            id="keywords"
            placeholder="کلمات کلیدی را با , جدا کنید"
            className="rounded"
            {...register("keywords")}
            />
        </label>

        {/* robots */}
        ربات‌ها
  
      <MultiSelectDropdown
        options={robotOptions}
        selectedOptions={selectedOptions}
        onChange={handleOptionsChange}
      />
          
     
          
        <Button type="submit" className="py-2 mt-4 mb-4">
          {TagToEdit ? "ویرایش کردن" : "ایجاد کردن"}
        </Button>
      </div>
    </form>
            </>
  );
};

export default AddTag;
