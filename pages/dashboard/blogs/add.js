import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import {
  useAddBlogMutation,
  useUpdateBlogMutation,
} from "@/services/blog/blogApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";


const Add = ({ onClose, onSuccess, blogToEdit = null }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
    const [galleryPreview, setGalleryPreview] = useState([]);
  const [addBlog, { isLoading: isAdding, data: addData, error: addError }] =
    useAddBlogMutation();
  const [
    updateBlog,
    { isLoading: isUpdating, data: updateData, error: updateError },
  ] = useUpdateBlogMutation();

  useEffect(() => {
    if (blogToEdit) {
      setValue("title", blogToEdit.title);
      setValue("description", blogToEdit.description);
      setValue("content", blogToEdit.content);
      setValue("publishDate", blogToEdit.publishDate);
      setValue("featuredImage", blogToEdit.featuredImage);
      setSelectedTags(
        blogToEdit.tags.map((tag) => ({ id: tag._id, label: tag.title }))
      );
      setSelectedCategory(blogToEdit.category);
    } else {
      reset();
      setSelectedTags([]);
      setSelectedCategory(null);
    }
  }, [blogToEdit, setValue, reset]);

  useEffect(() => {
    const isLoading = isAdding || isUpdating;
    const data = addData || updateData;
    const error = addError || updateError;

    if (isLoading) {
      toast.loading("در حال پردازش...", { id: "blog" });
    }

    if (data) {
      toast.success(data?.message, { id: "blog" });
      reset();
      if (onSuccess) {
        onSuccess();
      }
      if (onClose) {
        onClose();
      }
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "blog" });
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

  const handleAddOrUpdateBlog = (formData) => {
    try {
      formData.tags = selectedTags.map((tag) => ({ _id: tag.id }));
      formData.category = selectedCategory;

      if (blogToEdit) {
        updateBlog({ id: blogToEdit._id, ...formData }).unwrap();
      } else {
        addBlog(formData).unwrap();
      }
    } catch (err) {
      console.error("خطا در هنگام پردازش بلاگ: ", err);
    }
  };

  const handleTagsChange = (newSelectedTags) => {
    setSelectedTags(newSelectedTags);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const categoryOptions = [
    { id: "1", value: "Tech", label: "Technology" },
    { id: "2", value: "Lifestyle", label: "Lifestyle" },
    { id: "3", value: "Education", label: "Education" },
  ];

  return (
    <div className="m-6">
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
            <label htmlFor="publishDate" className="flex flex-col gap-y-2">
              تاریخ انتشار
              <input
                type="date"
                name="publishDate"
                id="publishDate"
                className="rounded"
                {...register("publishDate")}
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
              onChange={handleTagsChange}
              className="w-full"
              name="tags"
            />
          </label>
        </div>
        <div className="flex-1">
          <label htmlFor="category" className="flex flex-col gap-y-2">
            {/* Category */}
            دسته‌بندی
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
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
      {/* description */}
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
      {/* content */}
      <label htmlFor="content" className="flex flex-col gap-y-2">
        محتوا
        <textarea
          name="content"
          id="content"
          placeholder="محتوای بلاگ را تایپ کنید..."
          className="rounded h-64"
          {...register("content")}
        />
      </label>
  

        {/* gallery */}
      <GalleryUpload
        galleryPreview={galleryPreview}
        setGalleryPreview={setGalleryPreview}
        register={register}
        maxFiles={2} 
        required={true} // اجباری بودن آپلود عکس
      />


        <Button type="submit" className="py-2 mt-4 mb-4">
          {blogToEdit ? "ویرایش کردن" : "ایجاد کردن"}
        </Button>
      </form>
    </div>
  );
};

export default Add;
