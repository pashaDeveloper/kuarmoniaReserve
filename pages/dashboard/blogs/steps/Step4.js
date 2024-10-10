// Step4.js
import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step4 = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">تنظیمات انتشار</h2>
      <div className="mb-4">
        <label htmlFor="publishDate" className="block font-medium">تاریخ انتشار</label>
        <input
          id="publishDate"
          type="date"
          {...register('publishDate')}
          className="input"
        />
        {errors.publishDate && <p className="text-red-500 text-sm">{errors.publishDate.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="publishStatus" className="block font-medium">وضعیت انتشار *</label>
        <select
          id="publishStatus"
          {...register('publishStatus', { required: 'وضعیت انتشار الزامی است' })}
          className="input"
        >
          <option value="pending">در انتظار</option>
          <option value="approved">تایید شده</option>
          <option value="rejected">رد شده</option>
        </select>
        {errors.publishStatus && <p className="text-red-500 text-sm">{errors.publishStatus.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="visibility" className="block font-medium">دسترسی *</label>
        <select
          id="visibility"
          {...register('visibility', { required: 'دسترسی الزامی است' })}
          className="input"
        >
          <option value="public">عمومی</option>
          <option value="private">خصوصی</option>
        </select>
        {errors.visibility && <p className="text-red-500 text-sm">{errors.visibility.message}</p>}
      </div>
      <div className="mb-4 flex items-center">
        <input
          id="isFeatured"
          type="checkbox"
          {...register('isFeatured')}
          className="mr-2"
        />
        <label htmlFor="isFeatured" className="block font-medium">ویژه بودن</label>
      </div>
    </div>
  );
};

export default Step4;
