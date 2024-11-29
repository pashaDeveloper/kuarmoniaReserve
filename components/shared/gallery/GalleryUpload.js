import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const GalleryUpload = ({
  setGalleryPreview,
  maxFiles = 5,
  register,
  title=true,
  iconSize=5,
  border=true
}) => {
  const handleSetGalleryPreview = (event) => {
    const files = event.target.files;
    const previewImages = [];

    if (files.length > maxFiles) {
      alert(`شما می‌توانید حداکثر ${maxFiles} عکس آپلود کنید.`);
      window.location.reload();
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImages.push(e.target.result);
        if (previewImages.length === files.length) {
          setGalleryPreview(previewImages); // ارسال پیش‌نمایش به والد
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor="featuredImage" className="relative">
        <button
          type="button"
          className={`py-1 px-4 flex flex-row gap-x-2 bg-green-100 dark:bg-blue-100 
            ${border ? "border border-green-900 cursor-pointer rounded-secondary":"rounded-md"} dark:border-blue-900 text-green-900 dark:text-blue-900 w-fit`}
        >
          <IoCloudUploadOutline className={`h-${iconSize} w-${iconSize}`} />
          {title &&`مجاز به انتخاب ${maxFiles} عکس می باشید*
`}
        </button>
        <input
          type="file"
          name="featuredImage"
          id="featuredImage"
          accept="image/png, image/jpg, image/jpeg"
          className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
          multiple={false} // با توجه به maxFiles=1
          {...register}
          onChange={(event) => {
            register.onChange(event); // ارسال تغییرات به react-hook-form
            handleSetGalleryPreview(event);
          }}
        />
      </label>
    </div>
  );
};

export default GalleryUpload;
