// Signup.jsx
import React, { useEffect, useState } from "react";
import Button from "@/components/shared/button/Button";
import LoadImage from "@/components/shared/image/LoadImage";
import ToggleThemeButton from "@/components/shared/button/ToggleThemeButton";
import Logo from "@/components/shared/logo/Logo";
import { useSignupMutation } from "@/services/auth/authApi";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ProfileImageSelector from "@/components/shared/gallery/ProfileImageSelector";
import { useTheme } from "@/pages/ThemeContext";
import StepSignUpForm from "./StepSignUpForm";

const Signup = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [signup, { isLoading, data, error }] = useSignupMutation();
  const router = useRouter();

  const handleImageSelect = (image) => {
    setAvatarPreview(image);
  };

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

  const handleSignup = (data) => {
    const formData = new FormData();
    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);

    signup(formData);
  };

  return (
    <section
      className={`relative bg-[#dce9f5] dark:bg-[#1a202c] h-screen w-screen overflow-hidden text-black dark:text-gray-300 min-h-screen flex justify-center items-center p-4`}
    >
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="max-w-md w-full dark:bg-gray-800 bg-white flex flex-col gap-y-4 p-8 rounded-primary shadow-lg z-10">
        <div className="flex flex-row items-center gap-x-2">
          <hr className="w-full" />
          <Logo />
          <hr className="w-full" />
        </div>

        <StepSignUpForm
          register={register}
          handleImageSelect={handleImageSelect}
          avatarPreview={avatarPreview}
          onSubmit={handleSubmit(handleSignup)}
          errors={errors}
        />

        <div className="text-xs flex flex-row justify-center items-center gap-x-2">
          <Link href="/auth/forgot-password">فراموشی رمز عبور</Link>
          <div className="h-4 border-l"></div>
          <Link href="/auth/signin">ورود</Link>
        </div>
        <ToggleThemeButton />
      </div>
    </section>
  );
};

export default Signup;
