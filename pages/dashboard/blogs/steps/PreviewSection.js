// PreviewSection.js
import React, { useState, useRef, useEffect } from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import { TfiFullscreen } from "react-icons/tfi";
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
  defaultValues
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef(null);


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
    <div
    className={`flex-1 p-4 rounded-xl bg-white dark:bg-gray-800  h-[550px] dark:text-gray-100  
      ${isFullscreen ? "fixed inset-0 " : "relative"} overflow-y-auto`}
    ref={previewRef}
  >
    <button
      className="p-3 rounded-full shadow-lg cursor-pointer bg-white dark:bg-gray-800 z-8 absolute top-2 right-2  dark:text-gray-100"
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
      defaultValues={defaultValues}
    />
  </div>
  
  );
};

export default PreviewSection;
