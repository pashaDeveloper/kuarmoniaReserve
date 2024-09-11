import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import LoadImage from "@/components/shared/image/LoadImage";

const GalleryUpload = ({
  galleryPreview = [],
  setGalleryPreview,
  maxFiles = 5, // حداکثر تعداد فایل‌های مجاز
  register,
  required = false,
}) => {
     const handleSetGalleryPreview = (event, setGalleryPreview) => {
        const files = event.target.files;
        const previewImages = [];
      
        if (files.length > 5) {
          alert("You can only upload a maximum of 5 images.");
          window.location.reload();
          return;
        }
      
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();
      
          reader.onload = (e) => {
            previewImages.push(e.target.result);
            if (previewImages.length === files.length) {
              setGalleryPreview(previewImages);
            }
          };
      
          reader.readAsDataURL(file);
        }
      };
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row overflow-x-auto gap-x-2">
        {galleryPreview?.length > 0 &&
          galleryPreview?.map((image, index) => (
            <LoadImage
              key={index}
              src={image}
              alt="gallery"
              height={100}
              width={100}
              className="h-[100px] w-[100px] rounded object-cover"
            />
          ))}
      </div>
      <label htmlFor="gallery" className="relative">
        <button
          type="button"
          className="py-1 px-4 flex flex-row gap-x-2 bg-green-100 border border-green-900 text-green-900 rounded-secondary w-fit"
        >
          <IoCloudUploadOutline className="h-5 w-5" />
          مجاز به انتخاب {maxFiles} عکس می باشید*
        </button>
        <input
          type="file"
          name="gallery"
          id="gallery"
          accept="image/png, image/jpg, image/jpeg"
          className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
          multiple
          {...register("gallery", {
            required,
            onChange: (event) =>
              handleSetGalleryPreview(event, setGalleryPreview),
          })}
        />
      </label>
    </div>
  );
};

export default GalleryUpload;
