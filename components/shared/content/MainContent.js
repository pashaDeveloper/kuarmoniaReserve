import React from 'react';
import SkeletonProfile from "@/components/shared/skeleton/SkeletonProfile";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";

const MainContent = ({ 
  galleryPreview, 
  profileImage, 
  isLoading, 
  handleImageLoad, 
  publishDate, 
  watch, 
  editorData, 
  selectedTags,
}) => {
  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
      <div
        className="bg-cover bg-center text-center overflow-hidden rounded-lg"
        style={{
          minHeight: "500px",
          backgroundImage:
            galleryPreview.length > 0
              ? `url(${galleryPreview[0]})`
              : "url('https://via.placeholder.com/1150x500')",
        }}
        title="profile"
      ></div>

      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-full">
          <div className="">
            <div className="absolute top-[-130px] left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
              {isLoading && <SkeletonProfile size="w-32 h-32" />}
              
              <img
                src={profileImage}
                alt="Profile"
                className={`w-32 h-32 rounded-full object-cover ${
                  isLoading ? "hidden" : "opacity-100"
                }`}
                onLoad={handleImageLoad}
                style={{ position: "relative", zIndex: 10 }}
              />
            </div>
          </div>

          <div className="bg-white relative shadow-lg top-0 -mt-20 p-5 sm:p-10 rounded-b-lg ">
            <div className="flex items-center mt-14 justify-center">
              <div className="text-gray-700">
                <p>
                  <a
                    href="#"
                    className="text-indigo-600 font-medium hover:text-gray-900 transition text-center duration-500 ease-in-out"
                  >
                    <span className="text-2xl">مرجان سلطانی</span>
                  </a>
                </p>
                <p className="text-center">
                  <span className="font-medium">
                    {new Date(publishDate).toLocaleDateString("fa-IR", {
                      weekday: "long",
                    })} - {new Date(publishDate).toLocaleDateString("fa-IR")}
                  </span>
                </p>
              </div>
            </div>
            <h1 className="text-gray-900 font-bold text-3xl mb-2 mt-12 text-center">
              {watch("title") ? `${watch("title")}` : <SkeletonText lines={1} />}
            </h1>
            <div className="text-base leading-8 my-5 text-justify">
              {editorData ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: editorData,
                  }}
                ></div>
              ) : (
                <SkeletonText lines={22} />
              )}
            </div>

            {selectedTags.length ? (
              selectedTags.map((tag, index) => (
                <span key={index} className="px-2 py-1 mr-1 rounded text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-800">
                  {tag.label}
                </span>
              ))
            ) : (
              <SkeletonText lines={1} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
