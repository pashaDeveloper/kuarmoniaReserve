// components/signup/steps/PhoneStep.jsx
import React from "react";

const PhoneStep = ({ register, errors, prevStep }) => {
  return (
    <>
      <label htmlFor="phone" className="flex flex-col gap-y-1">
        <span className="text-sm">شماره تلفن خود را وارد کنید</span>
        <input
          type="tel"
          name="phone"
          id="phone"
          {...register("phone", {
            required: "وارد کردن شماره تلفن الزامی است",
          })}
          placeholder="شماره تلفن"
          className="p-2 rounded border bg-white dark-text-black"
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">
            {errors.phone.message}
          </span>
        )}
      </label>
      <div className="flex justify-between mt-4">
        <button type="submit" className="btn">
          ارسال فرم
        </button>
        <button type="button" onClick={prevStep} className="btn">
          مرحله قبل
        </button>
      </div>
    </>
  );
};

export default PhoneStep;
