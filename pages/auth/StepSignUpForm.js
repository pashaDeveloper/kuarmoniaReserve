// components/signup/StepSignUpForm.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "@/services/auth/authApi";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

import AvatarStep from "./steps/AvatarStep";
import NameStep from "./steps/NameStep";
import EmailStep from "./steps/EmailStep";
import PasswordStep from "./steps/PasswordStep";
import PhoneStep from "./steps/PhoneStep";
import StepIndicator from "./steps/StepIndicator"; // ایمپورت StepIndicator

const StepSignUpForm = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { register, reset, formState: { errors }, watch, getValues } = useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [signup, { isLoading, data, error }] = useSignupMutation();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      toast.success(data?.message, { id: "signup" });
      window.open("/auth/signin", "_self");
      setAvatarPreview(null);
      reset();
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "signup" });
    }
    if (isLoading) {
      toast.loading("در حال ثبت‌نام...", { id: "signup" });
    }
  }, [data, error, isLoading, reset, router]);

  const handleImageSelect = (image) => {
    const imageUrl = URL.createObjectURL(image);
    setAvatarPreview(imageUrl);
  };

  const nextStep = () => {
    // Check for validation based on current step
    // if (currentStep === 1 && !avatarPreview) {
    //   toast.error("لطفاً عکس پروفایل خود را انتخاب کنید");
    //   return;
    // }
    // if (currentStep === 2 && !getValues("name")) {
    //   toast.error("لطفاً نام خود را وارد کنید");
    //   return;
    // }
    // if (currentStep === 3 && !getValues("email")) {
    //   toast.error("لطفاً ایمیل خود را وارد کنید");
    //   return;
    // }
    // if (currentStep === 4 && !getValues("password")) {
    //   toast.error("لطفاً رمز عبور خود را وارد کنید");
    //   return;
    // }
    // if (currentStep === 5 && !getValues("phone")) {
    //   toast.error("لطفاً شماره تلفن خود را وارد کنید");
    //   return;
    // }

    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSignup = (formData) => {
    signup(formData);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <AvatarStep
            avatarPreview={avatarPreview}
            handleImageSelect={handleImageSelect}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <NameStep
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <EmailStep
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 4:
        return (
          <PasswordStep
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 5:
        return (
          <PhoneStep
            register={register}
            errors={errors}
            prevStep={prevStep}
          />
        );
      default:
        return null;
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);

    handleSignup(formData);
  };

  // تابع برای مدیریت کلیک روی مراحل
  const handleStepClick = (step) => {
    // فقط اجازه جابجایی به مراحل قبلی یا جاری را بدهید
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {/* نمایشگر مراحل */}
      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        onStepClick={handleStepClick} // ارسال تابع handleStepClick
      />

      {/* محتویات مرحله */}
      {renderStepContent(currentStep)}
    </form>
  );
};

export default StepSignUpForm;
