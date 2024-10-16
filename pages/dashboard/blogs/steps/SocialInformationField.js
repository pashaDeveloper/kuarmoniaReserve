import React from 'react';
import Dropdown from "@/components/shared/dropdownmenu/Dropdown";
import { Controller } from 'react-hook-form';
import { CgTrash } from "react-icons/cg";
import { FaInstagram, FaTwitter, FaTelegramPlane } from "react-icons/fa";

const SocialInformationField = ({ control, register, index, remove, errors, getValues }) => {
  const iconOptions = [
    { id: 1, value: "FaInstagram", label: "", description: "لینک به اینستاگرام", icon: <FaInstagram className="text-pink-500 w-5 h-5" /> },
    { id: 2, value: "FaTwitter", label: "", description: "لینک به توییتر", icon: <FaTwitter className="text-blue-500 w-5 h-5" /> },
    { id: 3, value: "FaTelegramPlane", label: "", description: "لینک به تلگرام", icon: <FaTelegramPlane className="text-blue-600 w-5 h-5" /> },
  ];

  // تعریف الگوهای ولیدیشن برای هر شبکه اجتماعی
  const urlPatterns = {
    FaInstagram: /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+(?:\/p\/[A-Za-z0-9_-]+)?\/?$/,
    FaTwitter: /^https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/,
    FaTelegramPlane: /^https?:\/\/(t\.me|telegram\.me)\/[A-Za-z0-9_]+\/?$/,
  };

  return (
    <div className="flex flex-col gap-y-1 w-full">
      <div className="flex items-center gap-x-2">
        {/* انتخاب آیکون شبکه اجتماعی با استفاده از Dropdown */}
        <Controller
          control={control}
          name={`socialLinks.${index}.name`}
          defaultValue="FaInstagram" // مقدار پیش‌فرض
          render={({ field: { onChange, value } }) => (
            <Dropdown
              options={iconOptions}
              placeholder="انتخاب آیکون"
              value={value}
              onChange={onChange}
              className="w-16"
              height="py-2"
              error={errors.information?.[index]?.icon}
              renderOption={(option) => (
                <div className="flex items-center gap-x-2">
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              )}
              renderValue={(selected) => {
                const selectedOption = iconOptions.find(option => option.value === selected);
                return (
                  <div className="flex items-center gap-x-2">
                    {selectedOption?.icon}
                    <span>{selectedOption?.label || "انتخاب کنید"}</span>
                  </div>
                );
              }}
            />
          )}
        />
<Controller
          control={control}
          name={`socialLinks.${index}.url`}
          rules={{
            validate: value => {
              const selectedName = getValues(`socialLinks.${index}.name`);
              const pattern = urlPatterns[selectedName];
              return pattern.test(value) || `لطفاً لینک معتبر برای ${selectedName} وارد کنید`;
            },
          }}
          render={({ field }) => (
        <input
        type="url"
        {...field}
          className="flex-1 rounded border px-2 !py-0 h-10"
          placeholder="وارد کردن لینک..."
                   maxLength="100"
          />
        )}
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
      {errors.socialLinks?.[index]?.url && (
        <span className="text-red-500 text-sm">
          {errors.socialLinks[index].url.message}
        </span>
      )}
      {errors.socialLinks?.[index]?.name && (
        <span className="text-red-500 text-sm">
          {errors.socialLinks[index].name.message}
        </span>
      )}
    </div>
  );
};

export default SocialInformationField;
