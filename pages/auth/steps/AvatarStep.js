// components/signup/steps/AvatarStep.jsx
import React from "react";
import LoadImage from "@/components/shared/image/LoadImage";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import ProfileImageSelector from "@/components/shared/gallery/ProfileImageSelector";

const AvatarStep = ({ avatarPreview, handleImageSelect, nextStep }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="profile-container shine-effect rounded-full flex justify-center mb-4">
          {avatarPreview ? (
            <LoadImage
              src={avatarPreview}
              alt="avatar"
              height={100}
              width={100}
              className="h-[100px] w-[100px] profile-pic rounded-full"
            />
          ) : (
            <SkeletonImage />
          )}
        </div>
        <ProfileImageSelector onImageSelect={handleImageSelect} />
      </div>
      <div className="flex justify-start mt-4">
      <button
  type="button"
  onClick={nextStep}
  className=" "
>
بعدی
</button>
      </div>
    </>
  );
};

export default AvatarStep;
