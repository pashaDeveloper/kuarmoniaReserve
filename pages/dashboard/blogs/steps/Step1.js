// Step1.js
import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step1 = () => {
  const { register, formState: { errors } } = useFormContext();
  const publishDate =  new Date().toISOString().split("T")[0];

  return (
    <>
      <label htmlFor="title" className="flex flex-col gap-y-1 w-full"> {/* افزودن w-full و اصلاح htmlFor */}
        <span className="text-sm">عنوان بلاگ را وارد کنید</span>
        <input
          type="text"
          name="title"
          id="title"
          {...register("title", { // اصلاح نام فیلد
            required: "وارد کردن عنوان الزامی است",
            minLength: {
              value: 3,
              message: "عنوان باید حداقل ۳ حرف داشته باشد",
            },
            maxLength: {
              value: 100,
              message: "عنوان نباید بیشتر از ۱۰۰ حرف باشد",
            },
          })}
          placeholder="عنوان بلاگ" // تغییر placeholder برای هماهنگی بیشتر
          maxLength="100"
          className="p-2 rounded border w-full"
        />
        {errors.title && ( // اصلاح نام فیلد
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </label>
      <label htmlFor="description" className="flex flex-col gap-y-2 w-full">
    توضیحات
    <textarea
      name="description"
      id="description"
      maxLength={276}
      placeholder="توضیحات بلاگ را تایپ کنید..."
      className="p-2 rounded h-[100px]
       border w-full form-textarea"
       {...register("description", { // اصلاح نام فیلد
        required: "توضیحات الزامی است",
        minLength: {
          value: 30,
          message: "توضیحات باید حداقل 30 حرف داشته باشد",
        },
        maxLength: {
          value: 300,
          message: "عنوان نباید بیشتر از 300 حرف باشد",
        },
      })}
    />
     {errors.description && ( // اصلاح نام فیلد
          <span className="text-red-500 text-sm">{errors.description.message}</span>
        )}
  </label>
          <label htmlFor="publishDate" className="flex flex-col gap-y-2 w-full">
            تاریخ انتشار
            <input
              type="date"
              name="publishDate"
              id="publishDate"
              className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("publishDate")}
              defaultValue={publishDate} // مقدار پیش‌فرض تاریخ امروز
            />
          </label>
    </>
  );
};

export default Step1;
