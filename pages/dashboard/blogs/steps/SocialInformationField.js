// SocialInformationField.js
import React from 'react';
import Dropdown from "@/components/shared/dropdownmenu/Dropdown";
import { Controller } from 'react-hook-form';
import { CgTrash } from "react-icons/cg";
import { FaInstagram, FaTwitter, FaTelegramPlane } from "react-icons/fa";

const SocialInformationField = ({ control, register, index, remove, errors }) => {
  const iconOptions = [
    { id: 1, value: "FaInstagram", label: "", description: "لینک به اینستاگرام", icon: <FaInstagram className="text-pink-500 w-5 h-5" /> },
    { id: 2, value: "FaTwitter", label: "", description: "لینک به توییتر", icon: <FaTwitter className="text-blue-500 w-5 h-5" /> },
    { id: 3, value: "FaTelegramPlane", label: "", description: "لینک به تلگرام", icon: <FaTelegramPlane className="text-blue-600 w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col gap-y-1 w-full">
      <div className="flex items-center gap-x-2">
        {/* انتخاب آیکون شبکه اجتماعی با استفاده از Dropdown */}
        <Controller
          control={control}
          name={`information.${index}.icon`}
          defaultValue="FaInstagram"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              options={iconOptions}
              placeholder="انتخاب آیکون"
              value={value}
              onChange={onChange}
              className="w-16"
              height="py-2"
              error={errors.information?.[index]?.icon}
            />
          )}
        />

        {/* input لینک شبکه اجتماعی */}
        <input
          type="text"
          name={`information[${index}].information`}
          id={`information-${index}`}
          className="flex-1 rounded border px-2 !py-0 h-10"
          placeholder="وارد کردن لینک..."
          {...register(`information.${index}.information`, {
            pattern: {
              value: /^(ftp|http|https):\/\/[^ "]+$/,
              message: "لطفاً یک لینک معتبر وارد کنید",
            },
          })}
          maxLength="100"
        />

        {/* دکمه حذف */}
        <button
          type="button"
          className="p-1 rounded"
          onClick={() => remove(index)}
        >
          <CgTrash className="w-6 h-6 text-gray-500 hover:text-red-500" />
        </button>
      </div>
      {/* نمایش پیام خطا زیر input */}
      {errors.information?.[index]?.information && (
        <span className="text-red-500 text-sm">
          {errors.information[index].information.message}
        </span>
      )}
    </div>
  );
};

export default SocialInformationField;
