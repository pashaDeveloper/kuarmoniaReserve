

import LoadImage from "@/components/shared/image/LoadImage";
import Table from "@/components/shared/loading/Table";
import { useGetUsersQuery } from "@/services/user/userApi";
import React, { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import Modal from "@/components/shared/modal/Modal";
import UpdateUser from "@/components/dashboard/UpdateUser";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Panel from "@/layouts/Panel";
import { setUser } from "@/features/user/userSlice";
import DeleteUser from "@/components/dashboard/DeleteUser";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";

const ListUsers = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = useGetUsersQuery();
  const usr = useSelector((state) => state?.auth);
  const users = useMemo(() => data?.data || [], [data]);
  const dispatch = useDispatch();
console.log(data)
  useEffect(() => {
    if (error?.data) {
      alert(error?.data?.message);
    }
  }, [error]);
  const toggleDropdown = () => {
    setIsMenu(!isMenu);
  };
  return (
    <>
     <Panel>
  {/* نمایش داده‌های کاربران */}

  {users && users.length > 0 && users.map((user) => (
    <div
      key={user._id}
      className="mt-4 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-slate-700"
    >
      <div className="col-span-5 lg:col-span-3 text-center flex items-center">
        <StatusIndicator isActive={user.status === "active"} />
        <div className="py-2 flex justify-center items-center flex-row gap-x-2 hover:text-white transition-colors rounded-full cursor-pointer items-center">
        <div className="user-container shine-effect rounded-full flex justify-center">
            <LoadImage
                  src={`/${user?.avatar?.url}`}
                  alt="avatar"
              height={60}
              width={60}
              className="h-[60px] w-[60px] profile-pic rounded-full"
            />
         
        </div>
          <article className="flex-col flex gap-y-2">
            <span className="line-clamp-1 text-base">
              <span className=" flex">{user?.name}</span>
            </span>
            <span className="text-xs flex">
              {new Date(user.createdAt).toLocaleDateString("fa-IR")}
            </span>
            
          </article>
        </div>
      </div>
     
     
      <div className="lg:col-span-3 col-span-5 gap-2 text-center flex justify-left items-center">
      <article className="flex-col flex  gap-y-2">
            <span className="line-clamp-1 text-base">
            <span className="flex">{user?.email}</span>
            </span>
            <span className="flex">
            <span className="">{user?.phone}</span>
            </span>
            
          </article>
      </div>
      <div className="hidden lg:col-span-3 col-span-5 gap-2 text-center lg:flex justify-center items-center" >
      <article className="flex-col flex gap-y-2">
  <span className="flex">
    {user?.role === 'superAdmin' 
      ? 'مدیر کل' 
      : user?.role === 'admin' 
      ? 'مدیر' 
      : 'کاربر'}
  </span>
</article>
      </div>
      <div className="lg:col-span-3 col-span-1 text-gray-500 text-center flex justify-center flex-row-reverse items-center"  onClick={toggleDropdown}>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 20 20">
          <path fill="currentColor" fillRule="evenodd" d="M2.5 7.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m15 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m-7.274 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5" />
        </svg>
      </div>
    </div>
  ))}
</Panel>


  {/* Dropdown Menu */}
  {isMenu && (
        <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg w-40 z-10">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">گزینه ۱</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">گزینه ۲</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">گزینه ۳</li>
          </ul>
        </div>
      )}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            dispatch(setUser({}));
          }}
          className="lg:w-3/12 md:w-1/2 w-full z-50"
        >
          <UpdateUser setIsOpen={setIsOpen} />
        </Modal>
      )}
    </>
  );
};

export default ListUsers;
