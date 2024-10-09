// Add.js
import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAddBlogMutation, useUpdateBlogMutation } from "@/services/blog/blogApi";
import FormSection from "./FormSection";
import PreviewSection from "./PreviewSection";
import ToggleThemeButton from "@/components/shared/button/ToggleThemeButton";
import { useGetCategoriesForDropDownMenuQuery } from "@/services/category/categoryApi";
import { useGetTagsForDropDownMenuQuery } from "@/services/tag/tagApi";
import AddCategory from "../categories/add"; 
import AddTag from "../tags/add"; 

const Add = ({ blogToEdit = null }) => {
  const { register, handleSubmit, watch } = useForm();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [editorData, setEditorData] = useState("");
  const [addBlog] = useAddBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const { data: categoriesData, refetch: refetchCategories } = useGetCategoriesForDropDownMenuQuery();
  const { data: tagsData, refetch: refetchTag } = useGetTagsForDropDownMenuQuery();
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

  const handleCategoryAdded = useCallback(() => {
    refetchCategories();
  }, [refetchCategories]);

  const handleTagAdded = useCallback(() => {
    refetchTag();
  }, [refetchTag]);

  // مدیریت وضعیت مدال در والد با useCallback
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const openCategoryModal = useCallback(() => {
    console.log("باز کردن مدال");
    setIsCategoryModalOpen(true);
  }, []);

  const closeCategoryModal = useCallback(() => {
    console.log("بستن مدال");
    setIsCategoryModalOpen(false);
  }, []);

  const openTagModal = useCallback(() => {
    console.log("باز کردن مدال");
    setIsTagModalOpen(true);
  }, []);

  const closeTagModal = useCallback(() => {
    console.log("بستن مدال");
    setIsTagModalOpen(false);
  }, []);

  return (
    <div className="lg:p-6 p-2 md:p-6 bg-gray-50 dark:bg-slate-800 dark:text-gray-100">
      {/* دکمه تغییر تم */}
      <div className="fixed top-4 -translate-x-1/2 left-1/2" style={{ zIndex: 9999 }}>
        <ToggleThemeButton />
      </div>

      <div className="mt-12 flex flex-col gap-6 md:flex-row sm:flex-row">
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
            onCategoryAdded={handleCategoryAdded}
            onTagAdded={handleTagAdded}
            openTagModal={openTagModal} 
            openCategoryModal={openCategoryModal} // پاس کردن تابع باز کردن مدال
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

      {/* مدال افزودن دسته‌بندی */}
      <AddCategory
        isOpen={isCategoryModalOpen}
        onClose={closeCategoryModal}
        onSuccess={handleCategoryAdded}
      />
       <AddTag
        isOpen={isTagModalOpen}
        onClose={closeTagModal}
        onSuccess={handleTagAdded}
      />
    </div>
  );
};

export default Add;