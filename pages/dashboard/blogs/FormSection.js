// FormSection.js
import React from "react";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import Button from "@/components/shared/button/Button";
import RTEditor from "@/components/shared/editor/RTEditor";
import SearchableDropdown from "@/components/shared/dropdownmenu/SearchableDropdown";
import { FaPlus } from "react-icons/fa";

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
  handleTagChange,
  handleCategoryChange,
  openTagModal,
  openCategoryModal, // دریافت تابع باز کردن مدال از والد
}) => {
  return (
    <form
      className="text-sm w-full h-full flex flex-col gap-y-4 mb-3"
      onSubmit={handleSubmit(handleAddOrUpdateBlog)}
    >
      {/* گروه عنوان و تاریخ انتشار */}
      <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">        <div className="flex-1">
          <label htmlFor="title" className="flex flex-col gap-y-2">
            عنوان
            <input
              type="text"
              name="title"
              id="title"
              maxLength={70}
              placeholder="عنوان بلاگ را تایپ کنید..."
              className="rounded p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="rounded p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("publishDate")}
              defaultValue={publishDate} // مقدار پیش‌فرض تاریخ امروز
            />
          </label>
        </div>
      </div>

      {/* گروه تگ‌ها و دسته‌بندی */}
      <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
        {/* بخش تگ‌ها */}
        <div className="flex-1 flex items-center justify-between gap-2 gap-y-2">
          <div className="flex flex-col flex-1">
            <label htmlFor="tags" className="flex flex-col gap-y-2">
              تگ‌ها
              <MultiSelectDropdown
                options={tagsOptions}
                selectedOptions={selectedTags}
                handleChange={handleTagChange}
                className="w-full"
                name="tags"
              />
            </label>
          </div>
          <div className="mt-7 flex justify-start">
            <button
              type="button"
              className="p-4 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
              onClick={openTagModal} // استفاده از تابع از والد
              aria-label="افزودن تگ جدید"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* بخش دسته‌بندی */}
        <div className="flex-1 flex items-center justify-between gap-2 gap-y-2">
          <div className="flex flex-col flex-1">
            <label htmlFor="category" className="flex flex-col gap-y-2">
              دسته‌بندی
              <SearchableDropdown
                categoryOptions={categoryOptions}
                handleCategoryChange={handleCategoryChange}
              />
            </label>
          </div>
          <div className="mt-7 flex justify-start">
            <button
              type="button"
              className="p-4 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
              onClick={openCategoryModal} 
              aria-label="افزودن دسته‌بندی جدید"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>

      {/* توضیحات بلاگ */}
      <label htmlFor="description" className="flex flex-col gap-y-2">
        توضیحات
        <textarea
          name="description"
          id="description"
          maxLength={276}
          placeholder="توضیحات بلاگ را تایپ کنید..."
          className="rounded p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-20"
          {...register("description")}
        />
      </label>

      {/* محتوا */}
      <label htmlFor="content" className="flex flex-col gap-y-2">
        محتوا
        <RTEditor value={editorData} onChange={setEditorData} />
      </label>

      {/* تصویر عنوان بلاگ */}
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

      {/* دکمه ارسال فرم */}
      <Button type="submit" className="py-2 mt-4 mb-4">
        {blogToEdit ? "ویرایش کردن" : "ایجاد کردن"}
      </Button>
    </form>
  );
};

export default FormSection;
