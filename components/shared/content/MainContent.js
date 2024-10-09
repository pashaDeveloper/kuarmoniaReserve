import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage"; // فرض کنید که این کامپوننت وجود دارد
import LoadImage from "@/components/shared/image/LoadImage";

import { FaInstagram, FaTwitter, FaTelegramPlane } from 'react-icons/fa';

const MainContent = ({
  galleryPreview,
  publishDate,
  watch,
  editorData,
  selectedTags,
}) => {
  const user = useSelector((state) => state?.auth);
  const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false); 

  const defaultValues = useMemo(() => {
    return {
      name: user?.name,
      avatar: user?.avatar,
      id: user?._id,
    };
  }, [user]);

  const handleImageLoad = () => {
    setIsLoading(false); 
  };

  const handleImageError = () => {
    setIsLoading(false); 
    setHasError(true); 
  };

  const avatarSrc = defaultValues?.avatar?.url && !hasError
    ? `/${defaultValues.avatar.url}`
    : "https://via.placeholder.com/100"; 
  return (
    <div className="max-w-screen-xl  bg-gray-50 dark:bg-slate-800 dark:text-gray-100 mx-auto  relative">
      <div
        className="bg-cover bg-center text-center overflow-hidden rounded-lg"
        style={{
          minHeight: "500px",
          backgroundImage:
            galleryPreview.length > 0
              ? `url(${galleryPreview[0]})`
              : "url('')",
        }}
        title="title"
      ></div>

      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-full">
          <div className="absolute top-[-150px] left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
            <div className="profile-container shine-effect rounded-full flex justify-center mb-4">
              {isLoading && (
                <SkeletonImage height={100} width={100} className="rounded-full" />
              )} 
              <LoadImage
                src={avatarSrc}
                alt="avatar"
                height={100}
                width={100}
                className={`h-[100px] w-[100px] profile-pic rounded-full ${
                  isLoading ? "hidden" : "block"
                }`}
                onLoad={handleImageLoad} 
                onError={handleImageError} 
              />
            </div>
          </div>

          <div className="relative bg-gray-50 dark:bg-slate-900 dark:text-gray-100 shadow-lg top-0 -mt-20 p-5 sm:p-10 rounded-b-lg">
            <div className="flex items-center mt-14 justify-center">
              <div className="text-gray-700">
                <p>
                  <a
                    href="#"
                    className="text-indigo-600 font-medium hover:text-gray-900 transition text-center duration-500 ease-in-out dark:text-gray-300"
                  >
                    <span className="text-2xl"> {defaultValues?.name}</span>
                  </a>
                </p>
                <p className="text-center text-sm mt-1">
                  <span className="font-medium">
                    {new Date(publishDate).toLocaleDateString("fa-IR", {
                      weekday: "long",
                    })}{" "}
                    - {new Date(publishDate).toLocaleDateString("fa-IR")}
                  </span>
                </p>
              </div>
            </div>
            <h1 className="font-bold text-3xl mb-2 mt-12 text-center">
              {watch("title") ? (
                `${watch("title")}`
              ) : (
                <SkeletonText lines={1} />
              )}
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
                <span
                  key={index}
                  className="px-3 py-1 mr-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 border border-indigo-800 dark:border-indigo-100"
                >
                  {tag.value}{index < selectedTags.length - 1 ? ' #' : ''}
                </span>
              ))
            ) : (
              <SkeletonText lines={1} />
            )}

            <div className="absolute top-1/2 right-0 transform translate-x-1/2 translate-y-[-50%] bg-white dark:bg-slate-900 py-3 px-2 md:px-2 lg:px-3 rounded-full border border-gray-300 dark:border-gray-700">
              <a href="https://instagram.com" className="flex items-center mb-2" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-pink-500 w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="flex items-center mb-2" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-blue-500 w-5 h-5" />
              </a>
              <a href="https://telegram.org" className="flex items-center" target="_blank" rel="noopener noreferrer">
                <FaTelegramPlane className="text-blue-600 w-5 h-5" />
              </a>
            </div>

          </div>
      
        </div>
      </div>
    </div>
  );
};

export default MainContent;
