import React, { useState, useEffect } from "react";
import { Star } from "@/utils/SaveIcon";
import { useRouter } from "next/router";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import LoadImage from "@/components/shared/image/LoadImage";
const PostCard = ({
  key,
  id,
  title,
  description,
  isFeature,
  thumbnailPreview,
  publishDate,
  category,
  avatar,
  author,
  superAdmin,
}) => {
  const router = useRouter();
  return (
    <div
      key={key}
      onClick={() => router.push(`/post/${id}`)}
      className="flex flex-col justify-center rtl dark:text-white w-full cursor-pointer"
    >
      <div className="relative transition-color ease-linear delay-100 hover:border-primary flex sm:flex-row min-h-[140px] lg:min-h-[220px] h-[110px] lg:h-[220px] rounded-primary shadow-lg w-full max-w-[650px] mx-auto p-3 border dark:border-gray-700 dark:bg-gray-800/70 bg-white/80">
        <div className="w-1/3 grid place-items-center">
          {!thumbnailPreview ? (
            <SkeletonImage borderRadius="rounded-xl" />
          ) : thumbnailPreview.type === "image" ? (
            <img
              src={thumbnailPreview.url}
              alt="Feature Preview"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <video
              src={thumbnailPreview.url}
              controls
              className="w-full h-full object-cover rounded-xl"
            />
          )}
        </div>
        <div className="w-2/3 space-y-2 px-2 flex flex-col">
          <div className="lg:flex justify-between items-center hidden gap-2">
            {!category ? (
              <SkeletonText lines={1} />
            ) : (
              <>
                <div className="flex w-2/3 items-center">
                  <p className="text-gray-500 font-medium">{category}</p>
                  <Star className="h-6 w-6 transition-transform duration-300 transform group-hover:-translate-x-1 group-focus:translate-x-1" />
                  <p className="text-gray-600 text-sm mr-1">
                    4.96 <span className="text-gray-500"> (76 نظر)</span>
                  </p>
                </div>
              </>
            )}
          </div>
          <h3 className="text-gray-800 line-clamp-1 dark:text-gray-100 m-0 text-sm md:text-lg">
            {!title ? (
              <SkeletonText lines={1} />
            ) : (
              title
            )}
          </h3>
          <p className="text-xs line-clamp-3 lg:line-clamp-4 lg:text-sm text-justify text-gray-500">
            {!description ? (
              <SkeletonText lines={3} />
            ) : (
              description
            )}
          </p>

          <div className="absolute bottom-1 w-2/3 text-xs lg:text-sm flex justify-between items-end">
            <div>
              {new Date(publishDate).toLocaleDateString("fa-IR", {
                weekday: "long",
              })}{" "}
              - {new Date(publishDate).toLocaleDateString("fa-IR")}
            </div>
            <div className="ml-7">
              {!avatar && (
                <div className="dark:!border-gray-600 text-center rounded-full flex justify-center">
                  <SkeletonImage
                    height={30}
                    width={30}
                    showSize={false}
                    borderRadius="rounded-full lg:!w-7 lg:!h-7"
                  />
                </div>
              )}

              {avatar && (
                <div className="text-center rounded-full flex justify-center">
                  <LoadImage
                    src={avatar}
                    alt="avatar"
                    height={300}
                    width={300}
                    className="lg:!h-9 lg:!w-9 h-7 w-7 rounded-full text-center"
                  />
                  {author !== superAdmin?.name && (
                    <img
                      alt={superAdmin?.name}
                      title={superAdmin?.name}
                      src={superAdmin?.avatar}
                      className="inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
