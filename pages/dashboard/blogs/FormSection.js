// FormSection.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import Button from "@/components/shared/button/Button";
import RTEditor from "@/components/shared/editor/RTEditor";
import SearchableDropdown from "@/components/shared/dropdownmenu/SearchableDropdown";
import AddCategory from "../categories/add";
import AddTag from "../tags/add";
import { FaPlus } from "react-icons/fa"; // ایمپورت آیکون +

const FormSection = ({
  handleSubmit,
  handleAddOrUpdateBlog,
  register,
  selectedTags,
  editorData,
  setEditorData,
  galleryPreview,
  setGalleryPreview,
  blogToEdit,
  publishDate,
  categoryOptions,
  tagsOptions,
  handleTagsChange,
  handleCategoryChange,
  onCategoryAdded, // تابع برای به‌روزرسانی دسته‌بندی‌ها پس از افزودن
}) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "add", // نوع مدال، در اینجا فقط افزودن
    category: null,
  });

  const openModal = (type = "add", category = null) => {
    setModalState({ isOpen: true, type, category });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: "add", category: null });
  };

  const handleAddCategorySuccess = () => {
    closeModal();
    if (onCategoryAdded) {
      onCategoryAdded(); // فراخوانی تابع والد برای به‌روزرسانی لیست دسته‌بندی‌ها
    }
  };

  return (
    <>
      <form
        className="text-sm w-full h-full flex flex-col gap-y-4 mb-3"
        onSubmit={handleSubmit(handleAddOrUpdateBlog)}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
          <div className="flex-1">
            <label htmlFor="title" className="flex flex-col gap-y-2">
              عنوان
              <input
                type="text"
                name="title"
                id="title"
                maxLength={70}
                placeholder="عنوان بلاگ را تایپ کنید..."
                className="rounded"
                autoFocus
                {...register("title", { required: true })}
              />
            </label>
          </div>
          <div className="flex-1">
            <label htmlFor="publishDate" className="flex flex-col gap-y-2 ">
              تاریخ انتشار
              <input
                type="date"
                name="publishDate"
                id="publishDate"
                className="rounded"
                {...register("publishDate")}
                defaultValue={publishDate} // مقدار پیش‌فرض تاریخ امروز
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
          <div className="flex-1 relative">
            {" "}
            {/* اضافه کردن relative برای موقعیت دکمه + */}
            <label htmlFor="tags" className="flex flex-col gap-y-2">
              تگ ها
              <MultiSelectDropdown
                options={tagsOptions}
                selectedOptions={selectedTags}
                handleChange={handleTagsChange}
                className="w-full"
                name="tags"
              />
            </label>
          </div>
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2">
            <div className="flex flex-col  flex-1 ">
              <label htmlFor="category">
                دسته‌بندی
                <SearchableDropdown
                  categoryOptions={categoryOptions}
                  handleCategoryChange={handleCategoryChange}
                />
              </label>
            </div>
            <div className="mt-5 flex justify-start">
  <button
    type="button"
    className="p-3 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600dark:hover:bg-blue-400 transition-colors"
    onClick={() => openModal("add")}
    aria-label="افزودن دسته‌بندی جدید"
  >
    <FaPlus />
  </button>
</div>
          </div>
        </div>

        <label htmlFor="description" className="flex flex-col gap-y-2">
          توضیحات
          <textarea
            name="description"
            id="description"
            maxLength={276}
            placeholder="توضیحات بلاگ را تایپ کنید..."
            className="rounded h-20"
            {...register("description")}
          />
        </label>

        <label htmlFor="content" className="flex flex-col gap-y-2">
          محتوا
          <RTEditor value={editorData} onChange={setEditorData} />
        </label>
        <label htmlFor="content" className="flex flex-col gap-y-2">
          تصویر عنوان وبلاگ
          <GalleryUpload
            galleryPreview={galleryPreview}
            setGalleryPreview={setGalleryPreview}
            register={register}
            maxFiles={1}
            required={true}
          />
        </label>

        <Button type="submit" className="py-2 mt-4 mb-4">
          {blogToEdit ? "ویرایش کردن" : "ایجاد کردن"}
        </Button>
      </form>

      {/* مدال افزودن دسته‌بندی */}
      <AddCategory
        isOpen={modalState.isOpen && modalState.type === "add"}
        onClose={closeModal}
        onSuccess={handleAddCategorySuccess}
        categoryToEdit={null} // در حالت افزودن، دسته‌بندی برای ویرایش نیست
      />
    </>
  );
};

export default FormSection;
