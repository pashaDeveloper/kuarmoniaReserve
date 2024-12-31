import React from 'react';
import Link from "next/link";
import { IoHomeOutline, IoMailOutline, IoNewspaperOutline, IoReceiptOutline, IoInformationCircleOutline, IoHeadsetOutline } from "react-icons/io5";
const largeMenu = () => {

  const menuItems = [
    { id: 1, label: 'خانه', icon: <IoHomeOutline />,href:""},
    { id: 2, label: 'وبلاگ', icon: <IoReceiptOutline /> ,href:""},
    { id: 3, label: 'اخبار', icon: <IoNewspaperOutline />  ,href:""},
    { id: 4, label: 'مشاوره', icon: <IoHeadsetOutline /> ,href:""},
    { id: 5, label: 'درباره ما', icon: <IoInformationCircleOutline /> ,href:""},
    { id: 6, label: 'ارتباط', icon: <IoMailOutline />  ,href:""},
  ];
  return (
    <nav className=" flex  lg:col-span-8  items-center gap-8 space-x-4 lg:space-x-6">
    <div className=" hidden sm:grid grid-cols-2 gap-4 sm:grid-cols-4 outl">
  {menuItems.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className={
        "flex flex-col items-center   justify-center text-sm font-medium transition-colors hover:text-primary"}
    >
      <span className="mb-2 text-xl">{link.icon}</span>
      {link.label}
    </Link>
  ))}
</div>
</nav>
  );
};

export default largeMenu;
