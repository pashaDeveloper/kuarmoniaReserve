import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const LoadingIndicator = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // وضعیت لودینگ

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true); // شروع لودینگ
    };

    const handleRouteChangeComplete = () => {
      setLoading(false); // پایان لودینگ
    };

    const handleRouteChangeError = () => {
      setLoading(false); // در صورت بروز خطا
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);

  return (
    <>
       {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center  z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 dark:border-green-500 border-solid"></div>
        </div>
      )}
    </>
  );
};

export default LoadingIndicator;
