// SkeletonImage.jsx
import React from "react";

const SkeletonImage = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse rounded-full"></div>
  );
};

export default SkeletonImage;
