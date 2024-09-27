// components/signup/steps/EmailStep.jsx
import React from "react";

const EmailStep = ({ register, errors, prevStep, nextStep }) => {
  return (
    <>
      <label htmlFor="email" className="flex flex-col gap-y-1">
        <span className="text-sm">ایمیل خود را وارد کنید</span>
        <input
          type="email"
          name="email"
          id="email"
          {...register("email", {
            required: "وارد کردن ایمیل الزامی است",
          })}
          placeholder="john@example.com"
          className="p-2 rounded border bg-white dark-text-black"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
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

export default EmailStep;
