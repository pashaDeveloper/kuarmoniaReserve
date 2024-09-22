// Add.js
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useAddBlogMutation, useUpdateBlogMutation } from "@/services/blog/blogApi";
import FormSection from "./FormSection";
import PreviewSection from "./PreviewSection";

const Add = ({ onClose, onSuccess, blogToEdit = null }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [editorData, setEditorData] = useState("");
  const [addBlog, { isLoading: isAdding, data: addData, error: addError }] = useAddBlogMutation();
  const [updateBlog, { isLoading: isUpdating, data: updateData, error: updateError }] = useUpdateBlogMutation();
  
  const publishDate = watch("publishDate") || new Date().toISOString().split("T")[0];

  const categoryOptions = [
    { id: "1", value: "Tech", label: "Technology" },
    { id: "2", value: "Lifestyle", label: "Lifestyle" },
    { id: "3", value: "Education", label: "Education" },
  ];

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
    <div className="m-6 flex flex-col gap-6 sm:flex-row">
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
          handleTagsChange={handleTagsChange}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
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
  );
};

export default Add;
