import React from "react";
import LoadImage from "@/components/shared/image/LoadImage";

const DisplayImages = ({ galleryPreview, imageSize = 600 }) => {
  return (
    <div className="flex flex-row overflow-x-auto gap-x-2 mt-4">
      {galleryPreview?.length > 0 &&
        galleryPreview.map((image, index) => (
          <LoadImage
            key={index}
            src={image}
            alt="gallery"
            height={imageSize}
            width={imageSize}
            className="rounded object-cover"
          />
        ))}
    </div>
  );
};

export default DisplayImages;
