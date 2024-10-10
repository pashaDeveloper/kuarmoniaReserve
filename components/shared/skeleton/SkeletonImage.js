// SkeletonImage.jsx
import React from "react";

const SkeletonImage = ({
  widthClass = "w-full",
  heightClass = "h-64",
  showSize = false,
  width = null, // اندازه عرض به پیکسل
  height = null,
  borderRadius = "rounded-xl",
  className = "",
}) => {
  return (
    <div
      className={`relative z-50 ${borderRadius} ${widthClass} ${heightClass} ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse"></div>
      {showSize && (
        <div className="absolute inset-0 flex justify-center items-center text-7xl text-gray-600">
           {`${height} × ${width}`}
        </div>
      )}
    </div>
  );
};

export default SkeletonImage;
