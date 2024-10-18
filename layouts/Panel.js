import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState,useEffect ,useMemo  } from "react";
import Sidebar from "./Sidebar";
import { IoHomeOutline } from "react-icons/io5";
import {
  MdFavoriteBorder,
  MdOutlineAddHomeWork,
  MdOutlineRateReview,
} from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { HiMenuAlt4 } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { PiCreditCardLight, PiCubeTransparent } from "react-icons/pi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { TbUserEdit, TbUserShare } from "react-icons/tb";
import { BsCartCheck } from "react-icons/bs";
import { FaBlog } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { BsTags } from "react-icons/bs";
import ProgressBar from '../components/shared/loading/progressBar';
import ToggleThemeButton from "@/components/shared/button/ToggleThemeButton";
import {
  useGetUserQuery,
} from "@/services/user/userApi";
import { useSelector } from 'react-redux';

const Panel = ({ children }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state?.auth);
  useEffect(() => {
    if (!user || !user._id) {
      window.open("/auth/signin", "_self"); 
    }
  },)

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
    },   {
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
          <span
            className="border border-cyan-900 text-cyan-900 bg-cyan-100/50 px-1.5 py-0 rounded uppercase"
            style={{ fontSize: "10px" }}
          >
            مدیر
          </span>
        </p>
      ),
      path: "/dashboard/list-users",
      icon: <FiUsers className="w-5 h-5" />,
    },
    {
      name: "تنظیمات سایت",
      path: "/dashboard/view-reviews",
      icon: <MdOutlineRateReview className="w-5 h-5" />,
    },
  ];

  return (
    <section className="h-screen w-screen bg-gray-100 dark:bg-gray-600 dark:text-gray-100">
            <ProgressBar />

      <div className="max-w-8xl mx-auto h-full flex flex-col gap-y-4 p-2">
        
        <nav className="px-2 py-2.5 flex flex-row items-center justify-between gap-x-2 rounded">
          <p className="flex flex-row items-center gap-x-2 text-sm capitalize whitespace-nowrap overflow-x-auto scrollbar-hide text-ellipsis">
            <Link href="/">
              <IoHomeOutline className="h-5 w-5" />
            </Link>
            {router?.route?.split("/")?.map((route, index) => (
              <React.Fragment key={index}>
                {index > 0 && " / "}
                <Link href={index === 1 ? `/dashboard` : `/dashboard/${route}`}>
                  {index === 1 ? "Dashboard" : route.split("-").join(" ")}
                </Link>
              </React.Fragment>
            ))}
          </p>
          <ToggleThemeButton />

          {open ? (
            <>
              <button
                className="lg:hidden md:hidden border p-1 rounded-secondary"
                onClick={() => setOpen(!open)}
              >
                <RxCross2 className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <button
                className="lg:hidden md:hidden border p-1 rounded-secondary"
                onClick={() => setOpen(!open)}
              >
                <HiMenuAlt4 className="h-5 w-5" />
              </button>
            </>
          )}
        </nav>

        <div className="h-full overflow-y-auto  grid grid-cols-12 gap-x-4 relative">
          <aside className="lg:col-span-3 md:col-span-4 col-span-12 md:block hidden overflow-y-auto bg-secondary dark:bg-gray-900 rounded p-2">
            <Sidebar routes={routes} />
          </aside>
          <div className="flex flex-col lg:col-span-9  h-full md:col-span-8 col-span-12 rounded">

          <section className="lg:col-span-9  h-full md:col-span-8 col-span-12 rounded">
  {children}
  
</section>
<footer className="px-4 py-2 flex justify-center items-center flex-row rounded">
    <p className="text-xs">
      © {new Date().getFullYear()} تمامی حقوق این اثر متعلق به شرکت کوآرمونیا می باشد.
    </p>
  </footer>
          </div>


          {open && (
            <div className="lg:hidden md:hidden block absolute top-0 left-0 w-3/4 h-full bg-secondary overflow-y-auto scrollbar-hide z-50 rounded p-2">
              <Sidebar routes={routes} />
            </div>
          )}
        </div>

       
      </div>
    </section>
  );
};

export default Panel;
