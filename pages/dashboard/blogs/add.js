import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import {
  useAddBlogMutation,
  useUpdateBlogMutation,
} from "@/services/blog/blogApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IoCloudUploadOutline } from "react-icons/io5";
import LoadImage from "@/components/shared/image/LoadImage";

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
      alert()
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
  const handleSetGalleryPreview = (event) => {
    const files = event.target.files;
    const previewImages = [];

    if (files.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      window.location.reload();
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        previewImages.push(e.target.result);
        if (previewImages.length === files.length) {
          setGalleryPreview(previewImages);
        }
      };

      reader.readAsDataURL(file);
    }
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
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row overflow-x-auto gap-x-2">
          {galleryPreview?.length > 0 &&
            galleryPreview?.map((image, index) => (
              <LoadImage
                key={index}
                src={image}
                alt="gallery"
                height={100}
                width={100}
                className="h-[100px] w-[100px] rounded object-cover"
              />
            ))}
        </div>
        <label htmlFor="gallery" className="relative">
          <button
            type="button"
            className="py-1 px-4 flex flex-row gap-x-2 bg-green-100 border border-green-900 text-green-900 rounded-secondary w-fit"
          >
            <IoCloudUploadOutline className="h-5 w-5" />
            مجاز به انتخاب دو عکس می باشید*
          </button>
          <input
            type="file"
            name="gallery"
            id="gallery"
            accept="image/png, image/jpg, image/jpeg"
            className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
            multiple
            {...register("gallery", {
              required: true,
              onChange: (event) => handleSetGalleryPreview(event),
            })}
          />
        </label>
      </div>
  
      <Button type="submit" className="py-2 mt-4 mb-4">
        {blogToEdit ? "ویرایش کردن" : "ایجاد کردن"}
      </Button>
    </form>
  </div>
  
  );
};

export default Add;
