// BlogCard.js
import React from 'react';
import SkeletonText from "@/components/shared/skeleton/SkeletonText";

const BlogCard = ({ watch, galleryPreview }) => {
  return (
    <div className="flex items-center justify-center">
      <div className={`min-w-[616px] h-[275px] scale-[0.9]    shadow-lg rounded-lg overflow-hidden flex`}>
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-2">
            {watch("title") ? (
              `${watch("title")}`
            ) : (
              
              <SkeletonText lines={1} />
            )}
          </h2>
          <p className="text-gray-700  text-justify">
            {watch("description") ? (
              `${watch("description")}`
            ) : (
              <SkeletonText lines={8} />
            )}
          </p>
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white "></div>
          <div
            className="bg-cover bg-center text-center overflow-hidden"
            style={{
              minHeight: "300px",
              backgroundImage:
                galleryPreview.length > 0
                  ? `url(${galleryPreview[0]})`
                  : "url('https://via.placeholder.com/1150x500')",
            }}
            title="title"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
