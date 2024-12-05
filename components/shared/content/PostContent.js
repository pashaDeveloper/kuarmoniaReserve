import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostContent = ({ 
  title, 
  highlight, 
  content, 
  thumbnailPreview,
  like,
  disLike,
  view,
  comment,
  isLoading,
  scale
}) => {

  return (

<div className={`px-2 w-full flex justify-center items-start ${scale ? "lg:scale-[0.8]" : ""}`}>
  <div
    className={`bg-white dark:bg-gray-800 lg:mx-8 w-full lg:flex lg:justify-center lg:max-w-5xl lg:shadow-lg rounded-lg`}
    dir="rtl"
  >
    {/* تصویر */}
    <div className="lg:w-1/2 flex justify-center">
      {isLoading || !thumbnailPreview ? (
        <Skeleton height={505} width={497} className="lg:scale-110" />
      ) : (
        thumbnailPreview.type === "image" ? (
        <div
          className="lg:scale-110 h-80 bg-cover lg:h-full rounded-b-none border dark:border-gray-700 lg:rounded-lg"
          style={{
            width: "500px",
            height: "500px",
            backgroundImage: `url('${thumbnailPreview.src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />):(

          <video
          src={thumbnailPreview.src}
          controls
          className="w-full h-full lg:scale-110 object-cover lg:rounded-lg"
        />
        )
      )}
    </div>
    {/* متن */}
    <div className="py-12 px-6 lg:px-12 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none border lg:rounded-lg dark:border-gray-700">
      <h2 className="text-3xl text-gray-800 w-full dark:text-gray-200 text-right">
        {isLoading || !title ? (
          <Skeleton height={20} width={"100%"} />
        ) : (
          title
        )}
      </h2>
      <p className="mt-4 text-gray-600 dark:text-gray-400 text-justify">
        {isLoading || !content ? (
          <Skeleton count={14} height={"100%"} width={"100%"} />
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
