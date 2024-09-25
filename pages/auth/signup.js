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


const Signup = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [signup, { isLoading, data, error }] = useSignupMutation();
  const router = useRouter();
  const { toggleTheme } = useTheme();

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
    formData.append("avatar", data.avatar[0]);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);

    signup(formData);
  };

  return (
    <section
      className={`bg-white dark:bg-[#1a202c] text-black dark:text-white min-h-screen flex justify-center items-center p-4`}
    >
      <div className="max-w-md w-full flex flex-col gap-y-4 border p-8 rounded-primary">
        <div className="flex flex-row items-center gap-x-2">
          <hr className="w-full" />
          <Logo />
          <hr className="w-full" />
        </div>

        <form
          action=""
          className="w-full flex flex-col gap-y-4 justify-center"
          onSubmit={handleSubmit(handleSignup)}
        >
          {/* avatar */}
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
          <label htmlFor="name" className="flex flex-col gap-y-1">
            <span className="text-sm">نام خود را وارد کنید</span>
            <input
              type="text"
              name="name"
              id="name"
              {...register("name", { required: true })}
              placeholder="نام"
              maxLength="100"
              className={`p-2 rounded border    bg-white dark-text-black`}
            />
          </label>

          <label htmlFor="email" className="flex flex-col gap-y-1">
            <span className="text-sm">ایمیل خود را وارد کنید</span>
            <input
              type="email"
              name="email"
              id="email"
              {...register("email", { required: true })}
              placeholder="ایمیل"
              className={`p-2 rounded border   bg-white `}
            />
          </label>

          <label htmlFor="password" className="flex flex-col gap-y-1">
            <span className="text-sm">رمز عبور خود را وارد کنید</span>
            <input
              type="password"
              name="password"
              id="password"
              {...register("password", { required: true })}
              placeholder="رمز عبور"
              className={`p-2 rounded border   bg-white "}`}
            />
          </label>

          <label htmlFor="phone" className="flex flex-col gap-y-1">
            <span className="text-sm">شماره تلفن خود را وارد کنید</span>
            <input
              type="tel"
              name="phone"
              id="phone"
              {...register("phone", { required: true })}
              placeholder="شماره تلفن"
              className={`p-2 rounded border"dark-bg-gray-800  bg-white dark-text-black`}
            />
          </label>

          <Button type="submit" className="py-2 mt-4 ">
            ثبت‌نام
          </Button>
        </form>

        <div className="text-xs flex flex-row justify-center items-center gap-x-2">
          <Link href="/auth/forgot-password">فراموشی رمز عبور</Link>
          <div className="h-4 border-l"></div>
          <Link href="/auth/signin">ورود</Link>
        </div>
        <ToggleThemeButton  />
      </div>
    </section>
  );
};

export default Signup;
