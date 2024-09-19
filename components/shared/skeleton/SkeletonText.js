import React from "react";

const SkeletonText = ({ lines = 5 }) => {
  return (
    <div className="flex flex-col gap-y-2 bg-gray-300 p-4 rounded">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`${
            index === lines - 1 ? "w-2/3" : "w-full"
          } h-3 bg-gray-500 animate-pulse rounded`}
        ></div>
      ))}
    </div>
  );
};

export default SkeletonText;
