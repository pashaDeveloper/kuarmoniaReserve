import React, { useState } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa"; // آیکون‌ها

const Slide = ({ title, description, bgImg, url }) => {
  const [isMuted, setIsMuted] = useState(true); // مدیریت وضعیت صدا

  return (
    <div
      className={`relative w-[100%] h-[50vh] rounded-md md:h-[70vh] bg-cover bg-center bg-no-repeat`}
    >
      {bgImg.type === "video" ? (
        <ReactPlayer
        url={bgImg?.url}
        playing
        loop
        muted={isMuted}
        controls={false}
        width="100%"
        height="100%"
        className="absolute w-full h-full rounded-md"
        />
      ) : (
        <div
        className="absolute w-full h-full bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url(${bgImg.url})` }}
        ></div>
      )}
      {bgImg.type === "video"&& (

      <button
        onClick={() => setIsMuted(!isMuted)} // تغییر وضعیت صدا
        className="absolute bottom-4 right-4 bg-gray-700 text-white p-2 rounded-full"
      >
        {isMuted ? (
          <FaVolumeMute size={24} /> // آیکون قطع صدا
        ) : (
          <FaVolumeUp size={24} /> // آیکون فعال کردن صدا
        )}
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
              <p className="text-[13px] md:text-lg mt-2 md:mt-4 lg:mt-8 dark:text-gray-600 ">
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
