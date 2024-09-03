import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ProgressBar = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0); // وضعیت پیشرفت

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setProgress(0);
      let timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress < 90) {
            return oldProgress + 10; // پیشرفت تدریجی
          }
          clearInterval(timer);
          return oldProgress;
        });
      }, 100);
    };

    const handleRouteChangeComplete = () => {
      setProgress(100); // پیشرفت کامل
      setTimeout(() => setProgress(0), 500); // پس از بارگذاری، مخفی کردن نوار بارگذاری
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="h-full bg-green-500 transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
