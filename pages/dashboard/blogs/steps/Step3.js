// Step3.js
import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step3 = () => {
  const { register, formState: { errors }, setValue, watch } = useFormContext();

  const handleGalleryChange = (e) => {
    const files = e.target.files;
    const galleryArray = Array.from(files).map(file => URL.createObjectURL(file));
    setValue('galleryPreview', galleryArray);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">محتوا و رسانه‌ها</h2>
      <div className="mb-4">
        <label htmlFor="content" className="block font-medium">محتوا *</label>
        <textarea
          id="content"
          {...register('content', { required: 'محتوا الزامی است' })}
          className="input h-40"
        />
        {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="featuredImage" className="block font-medium">تصویر شاخص</label>
        <input
          id="featuredImage"
          type="file"
          accept="image/*"
          {...register('featuredImage')}
          className="input"
        />
        {errors.featuredImage && <p className="text-red-500 text-sm">{errors.featuredImage.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="galleryPreview" className="block font-medium">گالری تصاویر</label>
        <input
          id="galleryPreview"
          type="file"
          accept="image/*"
          multiple
          {...register('galleryPreview')}
          className="input"
          onChange={handleGalleryChange}
        />
        {errors.galleryPreview && <p className="text-red-500 text-sm">{errors.galleryPreview.message}</p>}
      </div>
    </div>
  );
};

export default Step3;
