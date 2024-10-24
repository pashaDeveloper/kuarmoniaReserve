import Button from "@/components/shared/button/Button";
import LoadImage from "@/components/shared/image/LoadImage";
import Modal from "@/components/shared/modal/Modal";
import { setUser } from "@/features/user/userSlice";
import Panel from "@/layouts/Panel";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/services/user/userApi";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  MdDeleteOutline,
  MdFavoriteBorder,
  MdOutlineReviews,
  MdWarningAmber,
} from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { TbDoorEnter } from "react-icons/tb";

const MyProfile = () => {
  const user = useSelector((state) => state?.auth);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [updateUser, { isLoading, data, error }] = useUpdateUserMutation();

  const defaultValues = useMemo(() => {
    return {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      avatar: user?.avatar,
      address: user?.address,
    };
  }, [user]);

  const { register, handleSubmit, reset } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);

    if (isLoading) {
      toast.loading("در حال بروزرسانی اطلاعات کاربر...", { id: "updateUser" });
    }

    if (data) {
      toast.success(data?.message, { id: "updateUser" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "updateUser" });
    }
  }, [defaultValues, reset, data, error, isLoading]);

  const handleAvatarPreview = (e) => {
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

  const handleUpdateUser = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);

    if (avatarPreview !== null && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    updateUser({ id: user?._id, body: formData });
  };

  return (
    <>
      <Panel>
        <form
          action=""
          className="text-sm lg:w-1/2 md:w-3/4 w-full flex flex-col items-center gap-y-4"
          onSubmit={handleSubmit(handleUpdateUser)}
        >
          {/* تصویر پروفایل */}
          <div className="flex flex-col justify-center items-center gap-y-2 w-fit rounded-full">
            <LoadImage
              src={avatarPreview || `/${defaultValues?.avatar?.url}?q=100`}
              alt={defaultValues?.avatar?.public_id || "آواتار"}
              height={300}
              width={300}
              className="h-[100px] w-[100px] rounded-full object-cover"
            />
            <label htmlFor="avatar" className="relative w-full">
              <button
                type="button"
                className="py-1 px-4 flex flex-row gap-x-2 bg-green-100 border border-green-900 text-green-900 rounded-secondary w-fit"
              >
                <IoCloudUploadOutline className="h-5 w-5" />
                ویرایش تصویر پروفایل
              </button>
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/png, image/jpg, image/jpeg"
                className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
                {...register("avatar", {
                  onChange: (event) => handleAvatarPreview(event),
                })}
              />
            </label>
          </div>

          <label htmlFor="name" className="flex flex-col gap-y-1 w-full">
            <span className="text-sm">نام شما</span>
            <input
              type="text"
              name="name"
              id="name"
              {...register("name")}
              placeholder="مثال: حسیب الاسلام"
              className=""
            />
          </label>

          <label htmlFor="email" className="flex flex-col gap-y-1 w-full">
            <span className="text-sm">ایمیل شما</span>
            <input
              type="email"
              name="email"
              id="email"
              {...register("email")}
              placeholder="@gmail.com"
              className=""
            />
          </label>

          <label htmlFor="phone" className="flex flex-col gap-y-1 w-full">
            <span className="text-sm">شماره تلفن شما</span>
            <input
              type="tel"
              name="phone"
              id="phone"
              {...register("phone")}
              placeholder="مثال: +989392640650"
              className=""
            />
          </label>

          <label htmlFor="address" className="flex flex-col gap-y-2 w-full">
            آدرس شما*
            <textarea
              name="address"
              id="address"
              rows="2"
              maxLength={500}
              placeholder="آدرس خود را دقیق وارد کنید..."
              className="rounded"
              {...register("address", { required: true })}
            ></textarea>
          </label>

          <Button type="submit" className="py-2 mt-4 w-full">
            بروزرسانی اطلاعات
          </Button>
        </form>
        <RemoveInformation id={user?._id} />
      </Panel>
    </>
  );
};

function RemoveInformation({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError,
  } = useGetUserQuery(id);
  const user = useMemo(() => fetchData?.data || {}, [fetchData]);
  const [
    deleteUser,
    { isLoading: deleting, data: deleteData, error: deleteError },
  ] = useDeleteUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) {
      toast.loading("در حال بروزرسانی اطلاعات کاربر...", {
        id: "fetchUser",
      });
    }

    if (fetchData) {
      toast.success(fetchData?.message, { id: "fetchUser" });
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.message, { id: "fetchUser" });
    }

    if (deleting) {
      toast.loading("در حال حذف کاربر...", { id: "deleteUser" });
    }

    if (deleteData?.success) {
      toast.success(deleteData?.message, { id: "deleteUser" });
      setIsOpen(false);
      window.open("/", "_self");
    }
    if (deleteData?.success==false) {
      toast.error(deleteData?.message, { id: "deleteUser" });
      setIsOpen(false);
    }


    if (deleteError?.data) {
      toast.error(deleteError?.data?.message, { id: "deleteUser" });
    }
  }, [fetching, fetchData, fetchError, deleting, deleteData, deleteError]);

  return (
    <>
      <Button
        type="submit"
        className="py-2 mt-4 lg:w-1/2 md:w-3/4 w-full !bg-red-500 !border-red-600 !hover:bg-red-900/90"
        onClick={() => {
          dispatch(setUser(user));
          setIsOpen(true);
        }}
      >
        حذف اطلاعات
      </Button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            dispatch(setUser({}));
            setIsOpen(false);
          }}
          className="lg:w-3/12 md:w-1/2 w-full z-50 flex justify-center items-center"
        >
          <section className="h-full w-full flex flex-col gap-y-4  ">
            <article className="flex flex-col gap-y-8 h-full overflow-y-auto">
              <div className="flex flex-col gap-y-1 items-center">
                <div className="flex flex-col gap-y-4  items-center">
                  <LoadImage
                    src={`/${user?.avatar?.url}`}
                    alt={user?.avatar?.public_id}
                    height={300}
                    width={300}
                    className="h-[100px] w-[100px] rounded object-cover"
                  />
                  <h1 className="text-2xl">{user.name}</h1>
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className="text-xs text-center">{user.email}</p>
                  <p className="text-xs text-center">{user.phone}</p>
                  <p className="text-xs text-center">{user.address}</p>
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <MdWarningAmber className="w-7 h-7 mx-auto text-red-600" />
                <p className="text-center text-red-600">آیا مطمئن هستید؟</p>
              </div>
            </article>
            <article className="w-full flex gap-x-4 justify-evenly">
              <Button
                type="submit"
                className="py-2 !bg-red-500 !border-red-600 w-full !hover:bg-red-900/90"
                onClick={() => deleteUser(id)}
              >
                حذف کاربر
              </Button>
              <Button
                className="py-2 w-full"
                onClick={() => {
                  setIsOpen(false);
                  dispatch(setUser({}));
                }}
              >
                انصراف
              </Button>
            </article>
          </section>
        </Modal>
      )}
    </>
  );
}

export default MyProfile;
