import React from "react";

const SkeletonProfile = () => {
  return (
    <div className="absolute top-[-260px] left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
      <div className="relative">
        {/* اسکلت برای عکس پروفایل */}
        <div className="w-32 h-32 bg-gray-300 animate-pulse rounded-full"></div>
        
        {/* اسکلت برای دایره dashed */}
        <div className="absolute top-[-10px] left-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] border-4 border-dashed border-gray-300 rounded-full animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default SkeletonProfile;
