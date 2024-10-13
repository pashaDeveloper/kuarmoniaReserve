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
}) => {
  return (
    <>
      {/* بخش انتخاب تگ‌ها */}
      <div className="flex-1 flex items-center justify-between gap-2 gap-y-2">
        <div className="flex flex-col flex-1">
          <label htmlFor="tags" className="flex flex-col gap-y-2">
            تگ‌ها
            <MultiSelectDropdown
              options={tagsOptions}
              selectedOptions={selectedTags}
              handleChange={handleTagsChange}
              className="w-full"
              name="tags"
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

      {/* بخش انتخاب دسته‌بندی */}
      <div className="flex-1 flex items-center justify-between gap-2 gap-y-2">
        <div className="flex flex-col flex-1">
          <label htmlFor="category" className="flex flex-col gap-y-2">
            دسته‌بندی
            <SearchableDropdown
              categoryOptions={categoryOptions}
              selectedCategory={selectedCategory}
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
    </>
  );
};

export default Step3;
