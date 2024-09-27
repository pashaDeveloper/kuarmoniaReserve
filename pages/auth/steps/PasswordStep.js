// components/signup/steps/PasswordStep.jsx
import React from "react";

const PasswordStep = ({ register, errors, prevStep, nextStep }) => {
  return (
    <>
      <label htmlFor="password" className="flex flex-col gap-y-1">
        <span className="text-sm">رمز عبور خود را وارد کنید</span>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password", {
            required: "وارد کردن رمز عبور الزامی است",
          })}
          placeholder="رمز عبور"
          className="p-2 rounded border bg-white dark-text-black"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
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

export default PasswordStep;
