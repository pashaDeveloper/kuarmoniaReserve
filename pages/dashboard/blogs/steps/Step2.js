// Step2.js
import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step2 = () => {
  const { register, formState: { errors }, setValue, watch } = useFormContext();

  const handleTagsChange = (e) => {
    const value = e.target.value;
    const tagsArray = value.split(',').map(tag => tag.trim());
    setValue('tags', tagsArray);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">توضیحات و تگ‌ها</h2>
      <div className="mb-4">
        <label htmlFor="description" className="block font-medium">توضیحات *</label>
        <textarea
          id="description"
          {...register('description', { 
            required: 'توضیحات الزامی است', 
            maxLength: { value: 200, message: 'حداکثر ۲۰۰ کاراکتر' } 
          })}
          className="input"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      {/* <div className="mb-4">
        <label htmlFor="tags" className="block font-medium">تگ‌ها *</label>
        <input
          id="tags"
          {...register('tags', { required: 'حداقل یک تگ الزامی است' })}
          className="input"
          placeholder="تگ‌ها را با ویرگول جدا کنید"
          onChange={handleTagsChange}
        />
        {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
      </div> */}
      <div className="mb-4">
        <label htmlFor="category" className="block font-medium">دسته‌بندی *</label>
        <select
          id="category"
          {...register('category', { required: 'دسته‌بندی الزامی است' })}
          className="input"
        >
          <option value="">انتخاب دسته‌بندی</option>
          <option value="category1">دسته‌بندی ۱</option>
          <option value="category2">دسته‌بندی ۲</option>
          {/* دسته‌بندی‌های بیشتر را اضافه کنید */}
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>
    </div>
  );
};

export default Step2;
