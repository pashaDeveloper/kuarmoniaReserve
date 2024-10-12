// Step2.js
import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step2 = () => {
  const { register, formState: { errors },   } = useFormContext();

  

  return (
    <div className="flex-1 flex justify-center ">

    <label htmlFor="description" className="flex flex-col gap-y-2 w-full">
    توضیحات
    <textarea
      name="description"
      id="description"
      maxLength={276}
      placeholder="توضیحات بلاگ را تایپ کنید..."
      className="p-2 rounded h-40
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
  </div>
  );
};

export default Step2;
