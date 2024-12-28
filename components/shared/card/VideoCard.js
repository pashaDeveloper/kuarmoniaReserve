import React from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";

const VideoCard = ({
  id,
  index,
  title = "عنوان ویدئو",
  description = "توضیحات کوتاه در مورد ویدئو. معمولاً دو تا سه خط برای خوانایی بهتر.",
  videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4",
  thumbnailPreview = "https://picsum.photos/360/240",
  isLoading
}) => {
  const router = useRouter();

  return (
    <section
      key={id || index}
      onClick={() =>
        id ? router.push(`/video/${id}`) : console.log("ID is missing")
      }
      className="flex flex-col gap-y-5 border-b border-l border-r rounded cursor-pointer"
    >
      <div className="relative">
        <ReactPlayer
          url={videoUrl}
          light={thumbnailPreview}
          width="100%"
          height="192px"
          className="rounded-t"
          controls
          playIcon={
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
              ▶️
            </div>
          }
        />
      </div>
      <article className="px-2 flex flex-col gap-y-4 h-full">
        <div className="flex flex-col gap-y-2 h-full">
          <h1 className="text-lg font-bold">{title}</h1>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="flex flex-col gap-y-4 mt-auto pb-4">
          <hr />
          <p className="text-sm text-gray-500">مشاهده ویدئو</p>
        </div>
      </article>
    </section>
  );
};

export default VideoCard;
