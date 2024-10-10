// Step1.js
import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step1 = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">عنوان و SEO</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block font-medium">عنوان *</label>
        <input
          id="title"
          {...register('title', { 
            required: 'عنوان الزامی است', 
            minLength: { value: 3, message: 'حداقل ۳ کاراکتر' }, 
            maxLength: { value: 100, message: 'حداکثر ۱۰۰ کاراکتر' } 
          })}
          className="input"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="metaTitle" className="block font-medium">متا تایتل</label>
        <input
          id="metaTitle"
          {...register('metaTitle', { maxLength: { value: 60, message: 'حداکثر ۶۰ کاراکتر' } })}
          className="input"
        />
        {errors.metaTitle && <p className="text-red-500 text-sm">{errors.metaTitle.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="metaDescription" className="block font-medium">متا توضیحات</label>
        <textarea
          id="metaDescription"
          {...register('metaDescription', { maxLength: { value: 160, message: 'حداکثر ۱۶۰ کاراکتر' } })}
          className="input"
        />
        {errors.metaDescription && <p className="text-red-500 text-sm">{errors.metaDescription.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="metaKeywords" className="block font-medium">متا کلمات کلیدی</label>
        <input
          id="metaKeywords"
          {...register('metaKeywords')}
          className="input"
          placeholder="کلمات کلیدی را با ویرگول جدا کنید"
        />
        {errors.metaKeywords && <p className="text-red-500 text-sm">{errors.metaKeywords.message}</p>}
      </div>
    </div>
  );
};

export default Step1;
