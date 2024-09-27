// components/signup/steps/NameStep.jsx
import React from "react";

const NameStep = ({ register, errors, prevStep, nextStep }) => {
  return (
    <>
      <label htmlFor="name" className="flex flex-col gap-y-1">
        <span className="text-sm">نام خود را وارد کنید</span>
        <input
          type="text"
          name="name"
          id="name"
          {...register("name", { required: "وارد کردن نام الزامی است" })}
          placeholder="نام"
          maxLength="100"
          className="p-2 rounded border bg-white dark-text-black"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </label>
      <div className="flex justify-between mt-4">
        <button type="button" onClick={nextStep} className="btn">
          مرحله بعد
        </button>
        <button type="button" onClick={prevStep} className="btn">
          مرحله قبل
        </button>
      </div>
    </>
  );
};

export default NameStep;
