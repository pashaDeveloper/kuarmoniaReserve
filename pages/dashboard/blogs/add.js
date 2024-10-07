// Add.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddBlogMutation, useUpdateBlogMutation } from "@/services/blog/blogApi";
import FormSection from "./FormSection";
import PreviewSection from "./PreviewSection";
import ToggleThemeButton from "@/components/shared/button/ToggleThemeButton";
import { useGetCategoriesForDropDownMenuQuery } from "@/services/category/categoryApi";
import { useGetTagsForDropDownMenuQuery } from "@/services/tag/tagApi";

const Add = ({ blogToEdit = null }) => {
  const { register, handleSubmit, watch } = useForm();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [editorData, setEditorData] = useState("");
  const [addBlog] = useAddBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const { data: categoriesData, refetch: refetchCategories } = useGetCategoriesForDropDownMenuQuery();
  const { data: tagsData } = useGetTagsForDropDownMenuQuery();
  const categories = Array.isArray(categoriesData?.data) ? categoriesData.data : [];
  const tags = Array.isArray(tagsData?.data) ? tagsData.data : [];
  const publishDate = watch("publishDate") || new Date().toISOString().split("T")[0];

  const categoryOptions = categories?.map(category => ({
    id: category._id,
    value: category.title,
    description: category.description, 
  }));
  const tagsOptions = tags?.map(tag => ({
    id: tag._id,
    value: tag.title,
    description: tag.description, 
  }));

  const handleAddOrUpdateBlog = (formData) => {
    formData.tags = selectedTags.map((tag) => ({ _id: tag.id }));
    formData.category = selectedCategory;
    if (blogToEdit) {
      updateBlog({ id: blogToEdit._id, ...formData }).unwrap();
    } else {
      addBlog(formData).unwrap();
    }
  };

  const handleTagsChange = (newSelectedTags) => {
    setSelectedTags(newSelectedTags);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleCategoryAdded = () => {
    refetchCategories(); // رفرش کردن لیست دسته‌بندی‌ها پس از افزودن یک دسته‌بندی جدید
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-800 dark:text-gray-100">
      <div className="fixed top-4 -translate-x-1/2 left-1/2" style={{ zIndex: 9999 }}>
        <ToggleThemeButton />
      </div>
      <div className="mt-12 flex flex-col gap-6 sm:flex-row">
        <div className="flex-1">
          <FormSection
            handleSubmit={handleSubmit}
            handleAddOrUpdateBlog={handleAddOrUpdateBlog}
            register={register}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            editorData={editorData}
            setEditorData={setEditorData}
            galleryPreview={galleryPreview}
            setGalleryPreview={setGalleryPreview}
            blogToEdit={blogToEdit}
            publishDate={publishDate}
            categoryOptions={categoryOptions}
            tagsOptions={tagsOptions}
            handleTagsChange={handleTagsChange}
            handleCategoryChange={handleCategoryChange}
            onCategoryAdded={handleCategoryAdded} // پاس کردن تابع رفرش به FormSection
          />
        </div>
        
        <div className="flex-1">
          <PreviewSection
            galleryPreview={galleryPreview}
            isLoading={false}
            handleImageLoad={() => {}}
            publishDate={publishDate}
            watch={watch}
            editorData={editorData}
            selectedTags={selectedTags}
          />
        </div>
      </div>
    </div>
  );
};

export default Add;
