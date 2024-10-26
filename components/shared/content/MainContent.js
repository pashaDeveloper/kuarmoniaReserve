// MainContent.js
import React, {  useState ,useEffect} from "react";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage"; // اطمینان حاصل کنید که مسیر درست است
import LoadImage from "@/components/shared/image/LoadImage";
import {TagIcon} from "@/utils/SaveIcon"
import { FaInstagram, FaTwitter, FaTelegramPlane } from 'react-icons/fa';

const MainContent = ({
  galleryPreview,
  publishDate,
  watch,
  editorData,
  selectedTags,
  author,
  avatar
}) => {
  
  // وضعیت‌های بارگذاری و خطا برای تصویر اصلی
  const [isMainImageLoading, setIsMainImageLoading] = useState(true);
  const [hasMainImageError, setHasMainImageError] = useState(false);

  // وضعیت‌های بارگذاری و خطا برای آواتار
  const [isAvatarLoading, setIsAvatarLoading] = useState(true);
  const [hasAvatarError, setHasAvatarError] = useState(false); 


  // هندلرهای تصویر اصلی
  const handleMainImageLoad = () => {
    setIsMainImageLoading(false);
  };

  const handleMainImageError = () => {
    setIsMainImageLoading(false);
    setHasMainImageError(true);
  };

  // هندلرهای آواتار
  const handleAvatarLoad = () => {
    setIsAvatarLoading(false);
  };

  const handleAvatarError = () => {
    setIsAvatarLoading(false);
    setHasAvatarError(true);
  };


  useEffect(() => {
    if (!galleryPreview || !galleryPreview[0]) {
      setIsMainImageLoading(true);
    }
  }, [galleryPreview]);
    const colors = [
      { bg: 'bg-orange-200', text: 'text-orange-700' },
      { bg: 'bg-green-200', text: 'text-green-700' },
      { bg: 'bg-blue-200', text: 'text-blue-700' },
      { bg: 'bg-red-200', text: 'text-red-700' },
      { bg: 'bg-purple-200', text: 'text-purple-700' },
      { bg: 'bg-yellow-200', text: 'text-yellow-700' },
      { bg: 'bg-pink-200', text: 'text-pink-700' },
    ];
  return (
    <div className="max-w-screen-xl bg-gray-50 dark:bg-gray-800 dark:text-gray-100 mx-auto relative">
      
      {/* بخش تصویر اصلی با Skeleton */}
      <div className="relative flex justify-center">
        {isMainImageLoading && (
          <SkeletonImage
            width={1150}
            height={500}
            heightClass={500}
            showSize={true}
            borderRadius="rounded-xl"
            className="z-10"
          />
        )}
        {!hasMainImageError &&  galleryPreview?.length > 0  && (
          <img
            src={galleryPreview ? galleryPreview[0] :''}
            alt="title"
            className={`object-cover text-center overflow-hidden rounded-lg ${isMainImageLoading ? 'hidden' : 'block z-0'}`}
            style={{
              minHeight: "500px",
              width: '100%',
              height: '500px',
            }}
            onLoad={handleMainImageLoad}
            onError={handleMainImageError}
          />
        )}
        {hasMainImageError && (
          <img
            src="https://via.placeholder.com/1150x500" // تصویر جایگزین در صورت خطا
            alt="fallback"
            className="object-cover text-center overflow-hidden rounded-lg z-0"
            style={{
              minHeight: "500px",
              width: '100%',
              height: '500px',
            }}
          />
        )}
      </div>

      {/* محتوای اصلی */}
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-full">
          <div className="absolute top-[-150px] left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
            <div className="profile-container shine-effect rounded-full flex justify-center mb-4">
               {isAvatarLoading && (
                <SkeletonImage
                  height={100}
                  width={100}
                  showSize={false}
                  borderRadius="rounded-full"
                />
              )}    
              <LoadImage
                src={`/${avatar}`}
                alt="avatar"
                height={300}
                width={300}
                className={`h-[100px] w-[100px] profile-pic rounded-full `}
                onLoad={handleAvatarLoad} 
                onError={handleAvatarError} 
              />
            </div>
          </div>

          <div className="relative bg-gray-50 z-10 dark:bg-gray-800 dark:text-gray-100 shadow-lg top-0 -mt-20 p-5 sm:p-10 rounded-b-lg">
            <div className="flex items-center mt-14 justify-center">
              <div className="text-gray-700">
                <p>
                  <a
                    href="#"
                    className="text-indigo-600 font-medium hover:text-gray-900 transition text-center duration-500 ease-in-out dark:text-gray-300"
                  >
                    <span className="text-2xl"> {author}</span>
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
  selectedTags.map((tag, index) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return (
      <div
        key={index}
        className={`ml-2 text-xs inline-flex items-center  leading-sm uppercase px-3 py-1 rounded-full ${randomColor.bg}  ${randomColor.text} mb-2`}
      >
<TagIcon className="ml-1" />
  {tag.value}
      </div>
    );
  })
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
