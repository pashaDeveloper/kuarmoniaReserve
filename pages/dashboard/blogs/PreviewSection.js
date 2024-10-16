// PreviewSection.js
import React, { useState, useRef, useEffect } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";
import { TfiFullscreen } from "react-icons/tfi";
import BlogCard from "@/components/shared/card/BlogCard";
import MainContent from "@/components/shared/content/MainContent";
import { toggleFullscreen } from '@/utils/functionHelpers';

const PreviewSection = ({
  watch,
  galleryPreview,
  isLoading,
  handleImageLoad,
  publishDate,
  editorData,
  selectedTags,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef(null);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const handleToggleFullscreen = () => {
    toggleFullscreen(previewRef);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement === previewRef.current) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="border-[1px] p-2 rounded border-primary dark:border-blue-600 h-[550px] bg-white ">
      <button
        className="p-3 rounded-full dark:bg-gray-900 bg-white shadow-lg cursor-pointer z-10"
        onClick={toggleVisibility}
      >
        {isHidden ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
      </button>
      <div className={`${isHidden ? "hidden" : "opacity-100"} flex mt-5 justify-center`}>
        <BlogCard
          title={watch("title")}
          description={watch("description")}
          galleryPreview={galleryPreview}
          publishDate={publishDate}
        />
      </div>

      <div
        className={`flex-1 p-12 mt-4  sm:h-screen bg-gray-50 dark:bg-slate-800 dark:text-gray-100 rounded-lg overflow-y-auto overflow-x-hidden h-[550px]
          ${
            isFullscreen ? "fixed inset-0 z-50" : "relative"
          }
        `}
        style={{
          boxShadow: "0 -10px 20px rgba(0, 0, 0, 0.2)", // سایه از بالا
        }}
        ref={previewRef}
      >
        <button
          className="p-3 rounded-full shadow-lg cursor-pointer bg-white  z-10 absolute top-2 right-2 z-10 dark:bg-gray-900 dark:text-gray-100"
          onClick={handleToggleFullscreen}
        >
          {isFullscreen ? (
            <TfiFullscreen size={20} />
          ) : (
            <BsArrowsFullscreen size={20} />
          )}
        </button>
        <MainContent
          galleryPreview={galleryPreview}
          isLoading={isLoading}
          handleImageLoad={handleImageLoad}
          publishDate={publishDate}
          watch={watch}
          editorData={editorData}
          selectedTags={selectedTags}
        />
      </div>
    </div>
  );
};

export default PreviewSection;
