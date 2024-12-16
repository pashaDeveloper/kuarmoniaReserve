import React from "react";
import Image from "next/image";

const DisplayImages = ({ galleryPreview, imageSize = 600 }) => {
  // اگر galleryPreview یک آرایه نباشد، آن را به آرایه تبدیل می‌کنیم
  const items = Array.isArray(galleryPreview) ? galleryPreview : [galleryPreview];

  return (
    <div className="flex flex-row overflow-x-auto gap-x-2 mt-4">
      {items.map((item, index) => (
        item && (
          <div key={index}>
            {item.type === "video" ? (
              <video
                controls
                src={item.url} // درست‌کردن نام ویژگی src
                height={imageSize}
                width={imageSize}
                className="rounded object-cover"
              >
                مرورگر شما از پخش این نوع فایل پشتیبانی نمی‌کند.
              </video>
            ) : (
              <Image
                src={item.url} // آدرس تصویر
                alt="gallery"
                height={imageSize}
                width={imageSize}
                className="rounded object-cover"
              />
            )}
          </div>
        )
      ))}
    </div>
  );
};

export default DisplayImages;
