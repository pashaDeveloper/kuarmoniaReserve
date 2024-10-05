import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { useAddBlogMutation, useUpdateBlogMutation } from "@/services/blog/blogApi";
import FormSection from "./FormSection";
import PreviewSection from "./PreviewSection";
import ToggleThemeButton from "@/components/shared/button/ToggleThemeButton";
import { useGetCategoriesForDropDownMenuQuery  } from "@/services/category/categoryApi";
import { useGetTagsForDropDownMenuQuery  } from "@/services/tag/tagApi";

const Add = ({  blogToEdit = null }) => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [editorData, setEditorData] = useState("");
  const [addBlog] = useAddBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const { data: categoriesData } = useGetCategoriesForDropDownMenuQuery();
  const { data: tagsData } = useGetTagsForDropDownMenuQuery();
  const categories = Array.isArray(categoriesData?.data) ? categoriesData.data : [];
  const tags = Array.isArray(tagsData?.data) ? tagsData.data : [];
console.log(tags)
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




  return (
    <div className="p-6 flex flex-col gap-6 sm:flex-row dark:bg-slate-800 dark:text-gray-100">
      <ToggleThemeButton />
      <div className="flex-1">
        <FormSection
          handleSubmit={handleSubmit}
          handleAddOrUpdateBlog={handleAddOrUpdateBlog}
          register={register}
          setValue={setValue}
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
  );
};

export default Add;
