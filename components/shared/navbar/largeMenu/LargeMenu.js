import React from 'react';
import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';
import { IoHomeOutline, IoMailOutline, IoNewspaperOutline, IoReceiptOutline, IoInformationCircleOutline, IoHeadsetOutline } from "react-icons/io5";

const menuItems = [
  { id: 1, label: 'خانه', icon: IoHomeOutline },
  { id: 2, label: 'وبلاگ', icon: IoReceiptOutline },
  { id: 3, label: 'اخبار', icon: IoNewspaperOutline },
  { id: 4, label: 'مشاوره', icon: IoHeadsetOutline },
  { id: 5, label: 'درباره ما', icon: IoInformationCircleOutline },
  { id: 6, label: 'ارتباط', icon: IoMailOutline },
];

const largeMenu = () => {
  return (
    <Tabs value="خانه"     
    className="lg:col-span-8 lg:flex hidden "
>
      <div className="w-full flex flex-col items-center ">
        <TabsHeader className="h-15 !w-12/12 md:w-[50rem] border bg-gray-200 dark:bg-black dark:text-gray-500  border-white/25 bg-opacity-90">
          {menuItems.map((item) => (
            <Tab key={item.id} value={item.label}>
              <div className="flex items-center gap-2">
                <item.icon size={20} />
                <span>{item.label}</span>
              </div>
            </Tab>
          ))}
        </TabsHeader>
      </div>
    </Tabs>
  );
};

export default largeMenu;
