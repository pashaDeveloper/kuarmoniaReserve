import React, { useState, useEffect } from "react";
import { Star } from "@/utils/SaveIcon";
import { useRouter } from "next/router";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import LoadImage from "@/components/shared/image/LoadImage";

const PostCard = ({
  id,
  title,
  description,
  isFeature,
  thumbnailPreview,
  publishDate,
  category,
  avatar
}) => {
  const router = useRouter();
  return (
    <div
    key={id}
    onClick={() => router.push(`/post/${id}`)}
      className="flex flex-col justify-center rtl dark:text-white w-full"
    >
      <div className="relative flex flex-row space-x-1 lg:min-h-[200px] space-x-reverse rounded-primary shadow-lg p-3 w-full md:min-w-[600px]  max-w-[650px] mx-auto border border-white dark:border-gray-700 dark:bg-gray-800/70 bg-white/70 ">
        <div className="w-1/3  grid place-items-center  ">
          {!thumbnailPreview ? (
            <SkeletonImage  />
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
        <div className="w-2/3  flex flex-col space-y-2 px-2 ">
          <div className="flex justify-between items-center  gap-2">
            {!category ? (
              <SkeletonText lines={1} />
            ) : (
              <>
                <p className="text-gray-500 font-medium  ">{category}</p>
                <div className="flex items-center">
                  <Star className="h-6 w-6 transition-transform duration-300 transform group-hover:-translate-x-1 group-focus:translate-x-1" />

                  <p className="text-gray-600  text-sm mr-1">
                    4.96
                    <span className="text-gray-500 "> (76 نظر)</span>
                  </p>
                </div>
              </>
            )}

            {!isFeature ? (
              <SkeletonText lines={1} />
            ) : (
              <span class="inline-block px-3 py-1 text-sm  text-yellow-800 dark:text-blue-200 bg-yellow-200 rounded-md border border-yellow-300 dark:border-blue-500 dark:bg-blue-600 ">
                پست ویژه
              </span>
            )}
          </div>
          <h3 className=" text-gray-800 dark:text-gray-100   md:text-lg">
            {!title ? (
              <>
              <SkeletonText lines={1} />
              </>
            ) : (
              title
            )}
          </h3>
          <p className="text-sm text-justify mb-4 text-gray-500">
            {!description ? (
              <>
              <SkeletonText lines={3} />
              </>
            ) : (
              description
            )}
          </p>
 
          <div className="absolute bottom-1 w-2/3  flex justify-between items-end">
          <div> 
              {new Date(publishDate).toLocaleDateString("fa-IR", {
            weekday: "long",
          })}{" "}
              - {new Date(publishDate).toLocaleDateString("fa-IR")}
          </div>
            <div className="ml-7">
            {!avatar && (
          <div className=" dark:!border-gray-600 text-center  rounded-full flex justify-center ">
           <SkeletonImage
             height={30}
             width={30}
             showSize={false}
             borderRadius="rounded-full !w-7 !h-7"
           />
       </div>
        ) }

           {avatar && (
            <div className=" text-center rounded-full flex justify-center ">
             
              <LoadImage
                src={avatar}
                alt="avatar"
                height={300}
                width={300}
                className={`!h-[30px] !w-[30px] rounded-full text-center `}
              />
            </div>
                  ) }

            </div>
            
          </div>
         
        </div>
        
      </div>
    </div>
  );
};

export default PostCard;
