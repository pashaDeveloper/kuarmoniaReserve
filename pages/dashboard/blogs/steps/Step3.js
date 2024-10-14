// Step3.js
import React from 'react';
import { FaPlus } from "react-icons/fa";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import SearchableDropdown from "@/components/shared/dropdownmenu/SearchableDropdown";

const Step3 = ({
  selectedTags,
  selectedCategory,
  handleTagsChange,
  handleCategoryChange,
  categoryOptions,
  tagsOptions,
  openTagModal,
  openCategoryModal,
  register,
  setError,
  clearErrors,
  errors
}) => {
  const handleTagsSelect = (selectedOptions) => {
    console.log(selectedOptions)
    handleTagsChange(selectedOptions);
      clearErrors('tags'); 
  };

  const handleCategorySelect = (selectedOption) => {
    handleCategoryChange(selectedOption);
    if (errors.category) {
      clearErrors('category'); // مخفی کردن خطا
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2 gap-y-2 w-full">
        <div className="flex flex-col gap-y-2 w-full ">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <div className="flex flex-col flex-1">
              <label htmlFor="tags" className="flex flex-col gap-y-2 w-full">
                تگ‌ها
                <MultiSelectDropdown
                  options={tagsOptions}
                  selectedOptions={selectedTags}
                  handleChange={handleTagsSelect} 
                  className="w-full"
                  name="tags"
                  register={register('tags', { required: 'انتخاب تگ الزامی است' })}
                  clearErrors={clearErrors} 
                />
              </label>
            </div>
            <div className="mt-7 flex justify-start">
              <button
                type="button"
                className="p-4 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
                onClick={openTagModal}
                aria-label="افزودن تگ جدید"
              >
                <FaPlus />
              </button>
            </div>
          </div>
          {errors.tags && (
            <span className="text-red-500 text-sm">{errors.tags.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-y-2 w-full ">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <div className="flex flex-col flex-1">
              <label htmlFor="category" className="flex flex-col gap-y-2">
                دسته‌بندی
                <SearchableDropdown
                  categoryOptions={categoryOptions}
                  selectedCategory={selectedCategory}
                  handleCategoryChange={handleCategorySelect} // تغییر در اینجا
                  register={register('category', { required: 'انتخاب دسته‌بندی الزامی است' })}
                  errors={errors}
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
          {errors.category && (
            <span className="text-red-500 text-sm">{errors.category.message}</span>
          )}
        </div>
        
      </div>
    </>
  );
};

export default Step3;