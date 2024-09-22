// FormSection.js
import React from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import RTEditor from "@/components/shared/editor/RTEditor";

const FormSection = ({
  onSubmit,
  watch,
  register,
  setValue,
  selectedTags,
  setSelectedTags,
  selectedCategory,
  setSelectedCategory,
  blogToEdit,
  reset,
}) => {
  const categoryOptions = [
    { id: "1", value: "Tech", label: "Technology" },
    { id: "2", value: "Lifestyle", label: "Lifestyle" },
    { id: "3", value: "Education", label: "Education" },
  ];

  const publishDate = watch("publishDate") || new Date().toISOString().split("T")[0];

  return (
    <form
      className="text-sm w-full h-full flex flex-col gap-y-4 mb-3"
      onSubmit={onSubmit}
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
          <label htmlFor="publishDate" className="flex flex-col gap-y-2">
            تاریخ انتشار
            <input
              type="date"
              name="publishDate"
              id="publishDate"
              className="rounded"
              {...register("publishDate")}
              defaultValue={publishDate}
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        <div className="flex-1">
          <label htmlFor="tags" className="flex flex-col gap-y-2">
            تگ ها
            <MultiSelectDropdown
              options={categoryOptions}
              selectedOptions={selectedTags}
              onChange={setSelectedTags}
              className="w-full"
              name="tags"
            />
          </label>
        </div>
        <div className="flex-1">
          <label htmlFor="category" className="flex flex-col gap-y-2">
            دسته‌بندی
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded w-full"
              {...register("category")}
            >
              <option value="">انتخاب دسته‌بندی</option>
              {categoryOptions.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <label htmlFor="description" className="flex flex-col gap-y-2">
        توضیحات
        <textarea
          name="description"
          id="description"
          maxLength={160}
          placeholder="توضیحات بلاگ را تایپ کنید..."
          className="rounded h-32"
          {...register("description")}
        />
      </label>

      <label htmlFor="content" className="flex flex-col gap-y-2">
        محتوا
        <RTEditor value={watch("content")} onChange={(data) => setValue("content", data)} />
      </label>

      <label htmlFor="featuredImage" className="flex flex-col gap-y-2">
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
  );
};

export default FormSection;
