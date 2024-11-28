// SkeletonImage.jsx
import React from "react";

const SkeletonImage = ({
  widthClass = "w-full",
  heightClass = "",
  showSize = false,
  width = null, // اندازه عرض به پیکسل
  height = null,
  borderRadius = "rounded-xl",
  className = "",
}) => {
  return (
    <div
      className={`relative h-64 ${borderRadius} ${widthClass} h-[${heightClass}px] ${className} `}
    >
      <div className="absolute flex justify-center items-center top-0 left-0 w-full h-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
      {showSize && (
        <div className=" absolute inset-0 mt-30 flex justify-center items-center text-6xl text-gray-600">
           {`${height} × ${width}`}
        </div>
      )}
    </div>
  );
};

export default SkeletonImage;
