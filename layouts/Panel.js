import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ProgressBar from '../components/shared/loading/progressBar';
import Navbar from '@/components/shared/container/Navbar';
import { useSelector } from 'react-redux';
import {
  MdFavoriteBorder,
  MdOutlineAddHomeWork,
  MdOutlineRateReview,
} from "react-icons/md";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { TbUserEdit, TbUserShare } from "react-icons/tb";
import { BsCartCheck } from "react-icons/bs";
import { FaBlog, FaListUl } from "react-icons/fa";
import { BsTags } from "react-icons/bs";
import { PiCreditCardLight, PiCubeTransparent } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { RxCross2 } from 'react-icons/rx';

const Panel = ({ children }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state?.auth);
  
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken ) {
      window.open("/auth/signin", "_self"); 
    }
  }, [user]);

  const routes = [
    {
      name: "پروفایل من",
      path: "/dashboard/my-profile",
      icon: <TbUserEdit className="w-5 h-5" />,
    },
    {
      name: "دسته بندی ها",
      path: "/dashboard/categories",
      icon: <FaListUl className="w-5 h-5" />,
    },
    {
      name: "تگ ها",
      path: "/dashboard/tags",
      icon: <BsTags className="w-5 h-5" />,
    },
    {
      name: "بلاگ",
      path: "/dashboard/blogs",
      icon: <FaBlog className="w-5 h-5" />,
    },
    {
      name: "وبلاگ",
      path: "/dashboard/add-rent",
      icon: <MdOutlineAddHomeWork className="w-5 h-5" />,
    },
    {
      name: "اخبار",
      path: "/dashboard/list-rents",
      icon: <PiCubeTransparent className="w-5 h-5" />,
    },
    {
      name: "سفارشات",
      path: "/dashboard/view-cart",
      icon: <BsCartCheck className="w-5 h-5" />,
    },
    {
      name: "علاقه مندی ها",
      path: "/dashboard/view-favorites",
      icon: <MdFavoriteBorder className="w-5 h-5" />,
    },
    {
      name: "سبد خرید",
      path: "/dashboard/view-purchases",
      icon: <PiCreditCardLight className="w-5 h-5" />,
    },
    {
      name: "خریداران",
      path: "/dashboard/list-buyers",
      icon: <AiOutlineUserSwitch className="w-5 h-5" />,
    },
    {
      name: "اپراتورها",
      path: "/dashboard/list-sellers",
      icon: <TbUserShare className="w-5 h-5" />,
    },
    {
      name: (
        <p className="flex flex-row gap-x-2 items-center w-full h-fit">
          لیست کاربران{" "}
          <span className="border border-cyan-900 text-cyan-900 bg-cyan-100/50 px-1.5 py-0 rounded uppercase" style={{ fontSize: "10px" }}>
            مدیر
          </span>
        </p>
      ),
      path: "/dashboard/users",
      icon: <FiUsers className="w-5 h-5" />,
    },
    {
      name: "تنظیمات سایت",
      path: "/dashboard/view-reviews",
      icon: <MdOutlineRateReview className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-800  ">
      <ProgressBar />
    <header className="bg-gray-800 text-whitetext-center">
        <Navbar router={router} open={open} setOpen={setOpen} />       
    </header>
    <div className="flex flex-1 w-full overflow-hidden p-2">
      <aside className="bg-secondary dark:
          dark:bg-gray-900 rounded  m-4 lg:w-[300px] md:w-[250px] md:block lg:block hidden  p-4 h-auto  shadow-lg text-slate-900 dark:text-white">
      <Sidebar routes={routes} />

      </aside>
      <main className="flex-1 p-1 lg:p-8 pb-8 overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-hide"> {/* تغییر در اینجا */}
        {children}

        </div>
        <footer className="px-4 py-2 flex justify-center items-center flex-row rounded">
              <p className="text-xs">
                © {new Date().getFullYear()} تمامی حقوق این اثر متعلق به شرکت کارمونیا می باشد.
              </p>
            </footer>
      </main>
    </div>
    {open && (
 <div className="lg:hidden md:hidden sticky absolute top-[100px] right-2 w-3/4 h-[500px] bg-secondary dark:bg-gray-900 overflow-y-auto scrollbar-hide z-50 rounded p-4 mt-16 text-slate-900 dark:text-white">
 <button 
   className="absolute top-2 left-2 border p-1 rounded-secondary dark:border-gray-600 p-2 mb-2" // اضافه کردن حاشیه پایین
   onClick={() => setOpen(false)} // بستن سایدبار
 >
                            <RxCross2 className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                            </button>
 <div className="lg:hidden md:hidden sticky absolute top-[100px] right-2 w-3/4 py-4 h-[500px] bg-secondary dark:bg-gray-900 overflow-y-auto scrollbar-hide z-50 rounded text-slate-900 dark:text-white">
 <Sidebar routes={routes} />
</div>
</div>

)}
  </div>

  );
};

export default Panel;
