import Button from "@/components/shared/button/Button";
import LoadImage from "@/components/shared/image/LoadImage";
import Logo from "@/components/shared/logo/Logo";
import { useSignupMutation } from "@/services/auth/authApi";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoCloudUploadOutline } from "react-icons/io5";

const Signup = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { register, handleSubmit, reset } = useForm();
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!avatarPreview) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };

        reader.readAsDataURL(file);
      }
    }
  };

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
    <section className="min-w-full min-h-screen flex justify-center items-center p-4">
      <div className="max-w-md w-full flex flex-col gap-y-4 border p-8 rounded-primary">
        <div className="flex flex-row items-center gap-x-2">
          <hr className="w-full" />
          <Logo />
          <hr className="w-full" />
        </div>
        <form
          action=""
          className="w-full flex flex-col gap-y-4"
          onSubmit={handleSubmit(handleSignup)}
        >
          {/* avatar */}
          <div className="flex  flex-col gap-y-2">
            <div className="flex flex-row justify-center overflow-x-auto gap-x-2">
              {avatarPreview && (
          <div className="image-wrapper shine-effect rounded-full ">

                <LoadImage
                  src={avatarPreview}
                  alt="avatar"
                  height={100}
                  width={100}
                  className="h-[100px] w-[100px] profile-pic rounded-full  "
                />
            </div>

              )}
            </div>
            <label htmlFor="avatar" className="relative">
              <div  className=" flex justify-center">

    <button
      type="button"
      className="py-1 px-4 flex flex-row gap-x-2 bg-green-100 border border-green-900 text-green-900 rounded-secondary w-fit text-sm"
      >
      <IoCloudUploadOutline className="h-5 w-5" />
      انتخاب عکس پروفایل*
    </button>
      </div>
    <input
      type="file"
      name="avatar"
      id="avatar"
      accept="image/png, image/jpg, image/jpeg"
      className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
      {...register("avatar", {
        required: true,
        onChange: (event) => handleAvatarChange(event),
      })}
    />
  </label>
          </div>

          <label htmlFor="name" className="flex flex-col gap-y-1">
            <span className="text-sm">نام خود را وارد کنید</span>
            <input
              type="text"
              name="name"
              id="name"
              {...register("name", { required: true })}
              placeholder="نام"
              className=""
              maxLength="100"
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
              className=""
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
              className=""
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
              className=""
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
      </div>
    </section>
  );
};

export default Signup;
