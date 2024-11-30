import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostContent = ({ 
  title, 
  highlight, 
  content, 
  featureImage,
  like,
  disLike,
  view,
  comment,
  isLoading
}) => {
  return (
    <div className="px-2 w-full flex justify-center">
      <div
        className={`bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg rounded-lg`}
        dir="rtl"
      >
        {/* تصویر */}
        <div className="lg:w-1/2">
          {isLoading || !featureImage ? (
                          <Skeleton  height={400} width={400}  className="lg:scale-110" />

          ) : (
            <div
              className="lg:scale-110 h-80 bg-cover lg:h-full rounded-b-none border dark:border-gray-700 lg:rounded-lg"
              style={{
                backgroundImage: `url('${featureImage}')`,
              }}
            />
          )}
        </div>
        {/* متن */}
        <div className="py-12 px-6 lg:px-12 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none border lg:rounded-lg dark:border-gray-700">
          <h2 className="text-3xl text-gray-800 dark:text-gray-200 font-bold text-right">
            {isLoading || !title ? (
              <Skeleton  height={20} width={300} />
            ) : (
              title
            )}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-justify">
            {isLoading || !content ? (
              <Skeleton count={8} width={300} />
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              ></div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
