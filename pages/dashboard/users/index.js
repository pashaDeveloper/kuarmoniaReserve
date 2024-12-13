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
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = useGetUsersQuery();
  const usr = useSelector((state) => state?.auth);
  const users = useMemo(() => data?.data || [], [data]);
  const dispatch = useDispatch();
  console.log("user?.avatar?.url",user?.avatar?.url);
  useEffect(() => {
    if (error?.data) {
      alert(error?.data?.message);
    }
  }, [error]);

  return (
    <>
      <Panel>
        {/* نمایش داده‌های کاربران */}

        {users &&
          users.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100"
            >
              <div className="col-span-5 lg:col-span-3 text-center flex items-center">
                <StatusIndicator isActive={user.status === "active"} />
                <div className="py-2 flex justify-center items-center flex-row gap-x-2 hover:text-white transition-colors rounded-full cursor-pointer ">
                  <div className="user-container  rounded-full flex justify-center">
                    <LoadImage
                      src={user?.avatar?.url}
                      alt="avatar"
                      height={600}
                      width={600}
                      className="h-[60px] w-[60px] rounded-full object-cover"
                      />
                  </div>
                  <article className="flex-col flex gap-y-2">
                    <span className="line-clamp-1 text-sm lg:text-base dark:text-blue-400">
                      <span className=" flex">{user?.name}</span>
                    </span>
                    <span className="text-xs lg:flex hidden">
                      {new Date(user.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    <span className="lg:hidden flex">
                      {user?.role === "superAdmin"
                        ? "مدیر کل"
                        : user?.role === "admin"
                        ? "مدیر"
                        : "کاربر"}
                    </span>
                  </article>
                </div>
              </div>

              <div className="lg:col-span-3 col-span-5 gap-2 text-center flex justify-left items-center">
                <article className="flex-col flex  gap-y-2">
                  <span className="line-clamp-1 text-sm lg:text-base">
                    <span className="flex">{user?.email}</span>
                  </span>
                  <span className="flex lg:hidden">
                    <span className="">{user?.phone}</span>
                  </span>
                </article>
              </div>
              <div className="lg:col-span-2 lg:flex hidden gap-2 text-center  justify-center items-center">
              <span className="">{user?.phone}</span>

              </div>
              <div className="hidden lg:col-span-3 col-span-5 gap-2 text-center lg:flex justify-center items-center">
                <article className="flex-col flex gap-y-2">
                  <span className="flex">
                    {user?.role === "superAdmin"
                      ? "مدیر کل"
                      : user?.role === "admin"
                      ? "مدیر"
                      : "کاربر"}
                  </span>
                </article>
              </div>
              {usr?.role === "superAdmin" ? (
                <div className="lg:col-span-1 col-span-2 text-gray-500 text-right flex justify-right flex-row-reverse items-center">
                  <article className="flex-col flex  gap-y-1 ">
                    <span
                      className="line-clamp-1 cursor-pointer rounded-full border border-green-500/5 bg-green-500/5 p-2 text-green-500 transition-colors hover:border-green-500/10 hover:bg-green-500/10 hover:!opacity-100 group-hover:opacity-70"
                      onClick={() => {
                        setIsOpen(true);
                        dispatch(setUser(user));
                      }}
                    >
                      <FiEdit3 className="w-5 h-5" />
                    </span>
                    <span className="flex">
                      <DeleteUser id={user?._id} />
                    </span>
                  </article>
                </div>
              ) : (
                <span></span>
              )}
            </div>
          ))}
      </Panel>

      {/* Dropdown Menu */}

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
