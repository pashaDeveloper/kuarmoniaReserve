import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa"; // آیکون‌ها

const Slide = ({ title, description, bgImg, url, isActive }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // برای بارگذاری ویدئو
  const [thumbUrl, setThumbUrl] = useState(null); // ذخیره URL تصویر بندانگشتی
  const playerRef = useRef(null);

  // گرفتن فریم از ویدئو
  const captureThumbnail = () => {
    const player = playerRef.current;
    if (player) {
      const videoElement = player.getInternalPlayer();
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      setThumbUrl(canvas.toDataURL()); // ذخیره تصویر بندانگشتی در state
    }
  };

  const handleVideoReady = () => {
    setIsLoading(false);
    captureThumbnail(); // گرفتن فریم پس از بارگذاری
  };

  return (
    <div
      className={`relative w-[100%] h-[50vh] rounded-md md:h-[70vh] bg-cover bg-center bg-no-repeat`}
    >
      {bgImg.type === "video" ? (
        <>
          {isLoading && (
            <div
              className="absolute w-full h-full bg-cover bg-center rounded-md"
              style={{
                backgroundImage: thumbUrl ? `url(${thumbUrl})` : "none", // استفاده از تصویر بندانگشتی
              }}
            ></div>
          )}
          <ReactPlayer
  ref={playerRef}
  url={bgImg?.url}
  playing={isActive}
  loop
  muted={!isActive || isMuted}
  controls={false}
  width="100%"
  height="100%"
  className="absolute w-full h-full rounded-md"
  onReady={handleVideoReady}
  config={{
    file: {
      attributes: {
        crossOrigin: "anonymous", // این خط برای جلوگیری از مشکل CORS
      },
    },
  }}
/>
        </>
      ) : (
        <div
          className="absolute w-full h-full bg-cover bg-center rounded-md"
          style={{ backgroundImage: `url(${bgImg.url})` }}
        ></div>
      )}
      {bgImg.type === "video" && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-4 right-4 bg-gray-700 text-white p-2 rounded-full"
        >
          {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
        </button>
      )}
      {bgImg.type !== "video" && (
        <Link href={url} passHref>
          <div className="block">
            <div
              className={`backdrop-filter w-full backdrop-blur-[12px] bg-white/60 p-3 md:p-8 lg:p-10 shadow-lg md:overflow-hidden ltr:text-left rtl:text-right md:rounded-md md:w-[60%] lg:w-[50%] md:mt-auto absolute bottom-0 md:top-[45%] md:right-[25%] md:bottom-auto text-gray-700`}
            >
              <h3 className="text-lg md:text-2xl lg:text-3xl font-medium">
                {title}
              </h3>
              <p className="text-[13px] md:text-lg mt-2 md:mt-4 lg:mt-8 dark:text-gray-600">
                {description}
              </p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Slide;
