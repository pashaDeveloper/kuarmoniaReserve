import { useState } from "react";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import { FaRegHeart, FaRegComment, FaArrowRight } from 'react-icons/fa';
import { IoMdMore } from "react-icons/io";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";

const PostContent = ({
  title,
  content,
  thumbnailPreview,
  isLoading,
  comments,
  isMobile=false,
  avatar,
  author,
  publishDate
}) => {



  return (
  <div className="container ">
      <div className="relative bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex flex-row-reverse justify-between items-center py-2 px-2">
          <div className="flex items-center flex-row-reverse">
          {isLoading || !avatar ? (
            <>
  <SkeletonImage
    height={200}
    width={200}
    showSize={false}
    borderRadius="rounded-full"
    className="!w-10 !h-10"
    />
<div className="ml-3">
     <SkeletonText  lines={1} />
    </div>
    </>
) : (
  <>
    <img
      src={avatar}
      alt="User"
      className="w-10 h-10 rounded-full object-cover"
    />
    <div className="ml-3 flex flex-col gap-y-2">
      <p className="text-gray-900 text-left text-sm">{author}</p>
      <p className="text-gray-900 text-left text-xs">  
        {new Date(publishDate).toLocaleDateString("fa-IR", {
            weekday: "long",
          })}{" "}
              - {new Date(publishDate).toLocaleDateString("fa-IR")}
              </p>
    </div>

  </>
)}

            
          </div>
          <button type="button" className="rounded-full dark:text-gray-100 text-gray-700 ">
            <IoMdMore className="w-7 h-7  " />
          </button>
        </div>
<div className={`flex w-full h-full lg:flex-row-reverse ${isMobile ? "lg:flex-col" :"dd"} flex-col`}>
<div className={` ${isMobile ? "!w-full" : ""} lg:w-1/2  h-full`} >


        {/* Image Section */}
        <div className="w-100 h-96 relative">
          
        {isLoading || !thumbnailPreview ? (
        
        <SkeletonImage
    
        showSize={false}
        borderRadius=""
        className=""
        />
        
):thumbnailPreview.type === "image" ? (
  <img
    src={thumbnailPreview.url}
    alt="Feature Preview"
    className="w-full h-full object-cover "
  />
) : (
  <video
    src={thumbnailPreview.url}
    controls
    className="w-full h-full object-cover "
  />
)}
</div>

   
        <div className="flex justify-between items-start p-2 py-">
									<div className="flex space-x-2 items-center">
										<button type="button" className="focus:outline-none Like text-gray-600">
                    <FaRegHeart size={27}  />
                      </button>
									
										
									</div>
									<div className="flex space-x-2 items-center">
										<button type="button" className="focus:outline-none Like">
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                      </button>
									</div>
								</div>
                </div>
<div className={` ${isMobile ? "!w-full" : ""} lg:w-1/2 overflow-y-auto overflow-hidden h-[450px] `}>    
<div className="text-base leading-8 my-5 px-2 text-justify">
              {content ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                ></div>
              ) : (
                <SkeletonText lines={8} />
              )}
            </div>

<section className="bg-gray-100 py-8 rtl dark:bg-gray-800 dark:text-gray-100 overflow-y-auto">
  <div className="container mx-auto px-4">

    <div className="space-y-4">
    {!comments ? (
  <div className="flex flex-col space-y-4">
    {/* Skeleton Loader */}
    {[...Array(3)].map((_, index) => (
      <div key={index} className="bg-gray-300 p-4 rounded-lg shadow dark:bg-gray-600 animate-pulse">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-full bg-gray-400"></div>
          <div className="ml-3">
            <div className="h-4 bg-gray-400 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-400 rounded w-32"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-400 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-400 rounded w-1/2"></div>
      </div>
    ))}
  </div>
) : (
  comments && comments.length > 0 ? (
    comments.map((comment, index) => (
      <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-700 dark:border dark:border-gray-600" key={index}>
        <div className="flex items-center mb-2">
          <img
            src={comment.userAvatar || "https://via.placeholder.com/40"}
            alt="تصویر کاربر"
            className="w-10 h-10 rounded-full ml-3"
          />
          <div>
            <h3 className="font-semibold">{comment.userName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              ارسال شده در {new Date(comment.date).toLocaleDateString("fa-IR")}
            </p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-200">{comment.text}</p>
        <div className="flex items-center mt-2">
          <button className="text-blue-500 hover:text-blue-600 ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            پسندیدن
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-gray-300">
            پاسخ
          </button>
        </div>

        {/* نمایش پاسخ‌ها */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 ml-6">
            {comment.replies.map((reply, replyIndex) => (
              <div className="bg-gray-100 p-4 rounded-lg shadow dark:bg-gray-800" key={replyIndex}>
                <div className="flex items-center mb-2">
                  <img
                    src={reply.userAvatar || "https://via.placeholder.com/40"}
                    alt="تصویر کاربر"
                    className="w-8 h-8 rounded-full ml-3"
                  />
                  <div>
                    <h3 className="font-semibold">{reply.userName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      ارسال شده در {new Date(reply.date).toLocaleDateString("fa-IR")}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200">{reply.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    ))
  ) : null
)}
    </div>

    {/* Form to add comment */}
    <form
      className="mt-8 bg-white p-4 rounded-lg shadow dark:bg-gray-700 dark:border dark:border-gray-600"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log({
          name: formData.get("name"),
          comment: formData.get("comment"),
        });
        // ارسال داده‌ها به API یا پردازش بیشتر
      }}
    >
      <h3 className="text-lg font-semibold mb-2">افزودن نظر</h3>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 font-medium mb-2 dark:text-gray-300"
        >
          نام
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="comment"
          className="block text-gray-700 font-medium mb-2 dark:text-gray-300"
        >
          نظر
        </label>
        <textarea
          id="comment"
          name="comment"
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        ارسال نظر
      </button>
    </form>
  </div>
</section>
</div> 
</div>

      </div>
    </div>
  );
};

export default PostContent;
