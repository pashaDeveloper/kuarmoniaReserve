import React from "react";
import LoadImage from "@/components/shared/image/LoadImage";

const DisplayImages = ({ galleryPreview, imageSize = 600 }) => {
  // اگر galleryPreview یک آرایه نباشد، آن را به آرایه تبدیل می‌کنیم
  const images = Array.isArray(galleryPreview) ? galleryPreview : [galleryPreview];

  return (
    <div className="flex flex-row overflow-x-auto gap-x-2 mt-4">
      {images.map((image, index) => (
        image && ( // بررسی اینکه آیا تصویر معتبر است
          <LoadImage
            key={index}
            src={image}
            alt="gallery"
            height={imageSize}
            width={imageSize}
            className="rounded object-cover"
          />
        )
      ))}
    </div>
  );
};

export default DisplayImages;
