// BlogCard.js
import React, { useState } from 'react';
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage"; // اطمینان حاصل کنید که مسیر درست است
import { TfiHeart } from "react-icons/tfi";
import { PiBookmarkSimpleDuotone } from "react-icons/pi";

const BlogCard = ({ title, description, galleryPreview, publishDate }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white dark:bg-[#0F172A] bg-clip-border text-gray-700 shadow-lg">
      <div className="relative mx-4 mt-4 h-60 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
        {!isImageLoaded && (
          <SkeletonImage width={1150} height={500} showSize={true} borderRadius="rounded-xl" className="z-10" />
        )}
        {galleryPreview && galleryPreview.length > 0 && (
          <img
            src={galleryPreview[0]}
            alt="Blog Image"
            className={`w-full h-64 object-cover object-center rounded-xl ${isImageLoaded ? 'block' : 'hidden'}`}
            onLoad={() => setIsImageLoaded(true)}
          />
        )}
        <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
        <button
          className="!absolute top-4 right-4 h-12 max-h-[40px] w-12 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-dark="true"
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <TfiHeart size={30} />
          </span>
        </button>
        <button
          className="!absolute top-4 left-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-dark="true"
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <PiBookmarkSimpleDuotone size={30} />
          </span>
        </button>
      </div>
      <div className="px-6 py-3">
        <div className="mb-3 flex items-center justify-between">
          <h5 className="block font-sans text-xl font-medium tracking-normal dark:text-blue-100 min-w-[80%] ">
            {title ? (
              `${title}`
            ) : (
              <SkeletonText lines={1} />
            )}
          </h5>
          <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              ></path>
            </svg>
            5.0
          </p>
        </div>
        <div className="block font-sans text-base text-justify font-light leading-relaxed text-gray-700 antialiased">
          {description ? (
            description
          ) : (
            <SkeletonText lines={1} />
          )}
        </div>
        <div className="group inline-flex flex-wrap items-center gap-3">
          {/* آیکون‌ها */}
          <span
            data-tooltip-target="money"
            className="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
          >
            {/* SVG آیکون پول */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
              <path
                fillRule="evenodd"
                d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75"></path>
            <path
              fillRule="evenodd"
              d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.75c.414 0 .75-.336.75-.75V9a.75.75 0 00-.75-.75h-.75a.75.75 0 00-.75.75z"
              clipRule="evenodd"></path>
          </svg>
        </span>
        <span
          data-tooltip-target="share"
          className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70"
        >
          {/* SVG آیکون اشتراک‌گذاری */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M14.25 7.5a.75.75 0 010 1.5h-4.5a.75.75 0 010-1.5h4.5zM5.25 12a.75.75 0 011.5 0v3.75a.75.75 0 01-1.5 0V12zM12 5.25a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5h-2.25a.75.75 0 01-.75-.75zM6 7.875a.75.75 0 01.75-.75H8.25a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM18.75 15.375a.75.75 0 01-.75.75H15.75a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM18.75 20.625a.75.75 0 01-.75-.75v-3.75a.75.75 0 011.5 0v3.75a.75.75 0 01-.75.75zM6 18.75a.75.75 0 01-.75-.75v-3.75a.75.75 0 011.5 0v3.75a.75.75 0 01-.75.75z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default BlogCard;
