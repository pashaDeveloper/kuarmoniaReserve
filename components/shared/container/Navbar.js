import React from 'react';
import Link from 'next/link';
import { IoHomeOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { HiMenuAlt4 } from 'react-icons/hi';
import ToggleThemeButton from "@/components/shared/button/ToggleThemeButton";

const Navbar = ({ router, open, setOpen }) => {
    return (
        <div className="2xl:mx-auto">
            <div className="bg-white dark:bg-gray-800 shadow-lg py-2 px-7">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center space-x-3 lg:pr-16 pr-6">
                        <div className="lg:hidden md:hidden block">
                    <button
                        className="border p-1 rounded-secondary dark:border-gray-600"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <RxCross2 className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                        ) : (
                            <HiMenuAlt4 className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                        )}
                    </button>

                    </div>
                    </div>

                    <p className="flex flex-row items-center gap-x-2 text-sm capitalize whitespace-nowrap overflow-x-auto scrollbar-hide text-ellipsis">
                        <Link href="/">
                            <IoHomeOutline className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                        </Link>
                        {router?.route?.split("/")?.map((route, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && " / "}
                                <Link href={index === 1 ? `/dashboard` : `/dashboard/${route}`} className="text-gray-800 dark:text-gray-200">
                                    {index === 1 ? "Dashboard" : route.split("-").join(" ")}
                                </Link>
                            </React.Fragment>
                        ))}
                    </p>

                    <ToggleThemeButton />
 

                </nav>
            </div>
        </div>
    );
};

export default Navbar;
