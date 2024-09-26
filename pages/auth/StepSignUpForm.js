// StepSignUpForm.jsx
import { useState } from "react";
import ProfileImageSelector from "@/components/shared/gallery/ProfileImageSelector";
import LoadImage from "@/components/shared/image/LoadImage";

const StepSignUpForm = ({ register, handleImageSelect, avatarPreview, onSubmit, errors }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="flex flex-col items-center">
              {avatarPreview && (
                <div className="profile-container shine-effect rounded-full flex justify-center mb-4">
                  <LoadImage
                    src={avatarPreview}
                    alt="avatar"
                    height={100}
                    width={100}
                    className="h-[100px] w-[100px] profile-pic rounded-full"
                  />
                </div>
              )}
              <ProfileImageSelector onImageSelect={handleImageSelect} />
            </div>
            <div className="flex justify-end mt-4">
              <button type="button" onClick={nextStep} className="btn">
                مرحله بعد
              </button>
            </div>
          </>
        );
      case 2:
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
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </label>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={prevStep} className="btn">
                مرحله قبل
              </button>
              <button type="button" onClick={nextStep} className="btn">
                مرحله بعد
              </button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <label htmlFor="email" className="flex flex-col gap-y-1">
              <span className="text-sm">ایمیل خود را وارد کنید</span>
              <input
                type="email"
                name="email"
                id="email"
                {...register("email", { required: "وارد کردن ایمیل الزامی است" })}
                placeholder="john@example.com"
                className="p-2 rounded border bg-white dark-text-black"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </label>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={prevStep} className="btn">
                مرحله قبل
              </button>
              <button type="button" onClick={nextStep} className="btn">
                مرحله بعد
              </button>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <label htmlFor="password" className="flex flex-col gap-y-1">
              <span className="text-sm">رمز عبور خود را وارد کنید</span>
              <input
                type="password"
                name="password"
                id="password"
                {...register("password", { required: "وارد کردن رمز عبور الزامی است" })}
                placeholder="رمز عبور"
                className="p-2 rounded border bg-white dark-text-black"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </label>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={prevStep} className="btn">
                مرحله قبل
              </button>
              <button type="button" onClick={nextStep} className="btn">
                مرحله بعد
              </button>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <label htmlFor="phone" className="flex flex-col gap-y-1">
              <span className="text-sm">شماره تلفن خود را وارد کنید</span>
              <input
                type="tel"
                name="phone"
                id="phone"
                {...register("phone", { required: "وارد کردن شماره تلفن الزامی است" })}
                placeholder="شماره تلفن"
                className="p-2 rounded border bg-white dark-text-black"
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
            </label>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={prevStep} className="btn">
                مرحله قبل
              </button>
              <button type="submit" className="btn">
                ارسال فرم
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <span>مرحله {currentStep} از {totalSteps}</span>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
      {renderStepContent(currentStep)}
    </form>
  );
};

export default StepSignUpForm;
