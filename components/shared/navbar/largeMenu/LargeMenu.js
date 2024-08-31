import React, { useState } from 'react';
import MenuButton from './MenuButton';
import { IoHomeOutline, IoMailOutline, IoNewspaperOutline, IoReceiptOutline, IoInformationCircleOutline, IoHeadsetOutline } from "react-icons/io5";

const LargeMenu = () => {
  const menuItems = [
    { id: 1, label: 'خانه', icon: IoHomeOutline },
    { id: 2, label: 'وبلاگ', icon: IoReceiptOutline },
    { id: 3, label: 'اخبار', icon: IoNewspaperOutline },
    { id: 4, label: 'مشاوره', icon: IoHeadsetOutline },
    { id: 5, label: 'درباره ما', icon: IoInformationCircleOutline },
    { id: 6, label: 'ارتباط', icon: IoMailOutline },
  ];

  const [activeItemId, setActiveItemId] = useState(menuItems[0].id);

  const handleButtonClick = (id) => {
    setActiveItemId(id);
  };

  return (
    <nav className="hidden md:flex lg:flex fixed top-2 left-0 right-0 lgplus3:right-10 lgplus2:right-13 lgplus:right-[40px] mdplus:hidden  z-[9998] max-w-xlg   justify-center w-full text-sm md:text-base" data-nc-id="Nav">
      <ul className="flex p-1 bg-white gap-1 dark:bg-neutral-800 rounded-full shadow-lg overflow-x-auto hiddenScrollbar">
        {menuItems.map((item) => (
          <MenuButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeItemId === item.id}
            onClick={() => handleButtonClick(item.id)}
            size="normal" // Default size
          />
        ))}
      </ul>
    </nav>
  );
};

export default LargeMenu;
