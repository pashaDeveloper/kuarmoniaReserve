// hooks/useUserTracking.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { collectUserData } from '@/utils/collectData';
import { logPageView } from '@/utils/logManager';

const useUserTracking = () => {
  const router = useRouter();

  useEffect(() => {
    // دریافت اطلاعات کاربر از localStorage
    const userId = localStorage.getItem('userId'); // فرض بر این است که userId در localStorage ذخیره شده است

    const handleRouteChange = (url) => {
      const data = {
        userId: userId || null,
        pageUrl: url,
        interaction: {},
      };
      collectUserData(data);
    };

    // ارسال اطلاعات بازدید اولیه
    handleRouteChange(window.location.pathname + window.location.search);

    // ارسال اطلاعات هر بار که مسیر تغییر می‌کند
    router.events.on('routeChangeComplete', handleRouteChange);

    // پاکسازی
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const cleanup = logPageView(userId);

    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const handleClick = (event) => {
      const data = {
        userId: userId || null,
        pageUrl: window.location.pathname + window.location.search,
        interaction: {
          type: 'click',
          element: event.target.tagName,
          id: event.target.id || null,
          class: event.target.className || null,
        },
      };
      collectUserData(data);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const handleScroll = () => {
      const data = {
        userId: userId || null,
        pageUrl: window.location.pathname + window.location.search,
        interaction: {
          type: 'scroll',
          scrollY: window.scrollY,
        },
      };
      collectUserData(data);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const handleDownload = (event) => {
      const target = event.target.closest('a');
      if (target && target.getAttribute('href')?.match(/\.(jpg|jpeg|png|gif)$/)) {
        const data = {
          userId: userId || null,
          pageUrl: window.location.pathname + window.location.search,
          interaction: {
            type: 'download',
            fileName: target.getAttribute('href'),
          },
        };
        collectUserData(data);
      }
    };

    document.addEventListener('click', handleDownload);

    return () => {
      document.removeEventListener('click', handleDownload);
    };
  }, []);
};

export default useUserTracking;
