import React from 'react';
import { IoHomeOutline, IoMailOutline, IoNewspaperOutline, IoReceiptOutline, IoInformationCircleOutline, IoHeadsetOutline } from "react-icons/io5";

const menuItems = [
  { id: 1, label: 'خانه', icon: IoHomeOutline },
  { id: 2, label: 'وبلاگ', icon: IoReceiptOutline },
  { id: 3, label: 'اخبار', icon: IoNewspaperOutline },
  { id: 4, label: 'مشاوره', icon: IoHeadsetOutline },
  { id: 5, label: 'درباره ما', icon: IoInformationCircleOutline },
  { id: 6, label: 'ارتباط', icon: IoMailOutline },
];

const MobileMenu = () => {
  return (
    <div className="fixed md:hidden  bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-black dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-6 mx-auto font-medium">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="inline-flex flex-col items-center justify-center  hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <item.icon
              className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              fill="currentColor"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
