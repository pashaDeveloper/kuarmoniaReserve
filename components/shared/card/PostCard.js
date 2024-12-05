import React, { useState ,useEffect} from 'react';
 
import {Star} from "@/utils/SaveIcon"; 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useRouter } from "next/router";

const PostCard = ({ title, description, isFeature, thumbnailPreview, publishDate,category }) => {
  const router = useRouter();
  return (
    <div    onClick={() => router.push(`/post/post`)} className="flex flex-col justify-center  rtl dark:text-white ">
    <div className="relative flex flex-row space-x-3  space-x-reverse rounded-primary shadow-lg p-3 w-full md:min-w-[600px]  max-w-[650px] mx-auto border border-white dark:border-gray-700 dark:bg-gray-800/70 bg-white/70">
      <div className="w-1/3  grid place-items-center  min-h-[170px]">
      {!thumbnailPreview ?(
              <Skeleton  height={170} width={170} />

      ):(
        thumbnailPreview.type === "image" ? (
          <img
            src={thumbnailPreview.src}
            alt="Feature Preview"
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <video
            src={thumbnailPreview.src}
            controls
            className="w-full h-full object-cover rounded-xl"
          />
        )
      )}
       
      </div>
      <div className="w-2/3  flex flex-col space-y-2 p-3">
        <div className="flex justify-between items-center">
          {!category ? (
              <Skeleton  height={20} width={200} />

          ):(
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
         
          <div>
            
          </div>
{!isFeature ?(
              <Skeleton width={80} height={20} />


):(
  <span class="inline-block px-3 py-1 text-sm  text-yellow-800 dark:text-blue-200 bg-yellow-200 rounded-md border border-yellow-300 dark:border-blue-500 dark:bg-blue-600 ">

  پست ویژه
</span>
)}

        </div>
        <h3 className=" text-gray-800 dark:text-gray-100   md:text-lg">
        {!title ?
            (          <>
              <Skeleton width={'100%'} height={40} />
            </>
        
            ):(
              title

            )
          }
                  </h3>
        <p className="text-sm text-justify text-gray-500">
          {!description ?
            (          <>
              <Skeleton width={'100%'} height={20} count={4} />
          
            </>
        
            ):
              description

            
          }
        </p>
       
      </div>
    </div>
  </div>
  );
};

export default PostCard;
