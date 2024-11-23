import React, { useEffect, useState } from "react";
import Panel from "@/layouts/Panel";
import { useRouter } from "next/router";
import {
  useDeleteBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
} from "@/services/blog/blogApi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Edit, Back } from "@/utils/SaveIcon";

const Info = () => {
  const router = useRouter();
  const user = useSelector((state) => state?.auth);
  const { id } = router.query;

  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError,
  } = useGetBlogQuery(id);

  const [
    deleteBlog,
    { isLoading: deleting, data: deleteData, error: deleteError },
  ] = useDeleteBlogMutation();

  const [updateBlog, { isLoading: updating, data: updateData, error: updateError }] = useUpdateBlogMutation();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (fetching) {
      toast.loading("در حال بروزرسانی اطلاعات...", {
        id: "fetchBlog",
      });
    }

    if (fetchData) {
      toast.success(fetchData?.message, { id: "fetchBlog" });
      if (user?.role === "superAdmin" && fetchData?.data?.publishStatus === "pending") {
        setTimeout(() => {
          setIsModalOpen(true);
        }, 1000);
      }
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.message, { id: "fetchBlog" });
    }

    if (deleting) {
      toast.loading("در حال حذف کاربر...", { id: "deleteBlog" });
    }

    if (deleteData) {
      toast.success(deleteData?.message, { id: "deleteBlog" });
      setIsModalOpen(false);
      window.open("/", "_self");
    }

    if (deleteError?.data) {
      toast.error(deleteError?.data?.message, { id: "deleteUser" });
    }
  }, [fetching, fetchData, fetchError, deleting, deleteData, deleteError, user?.role]);



  const handleApprove = () => {
    updateBlog({
      id,
      data: { publishStatus: "approved" },
    })
      .unwrap()  
      .then((response) => {
    
        setIsModalOpen(false);
        toast.success("وضعیت به  تایید تغییر کرد.");
      })
      .catch((error) => {

        toast.error("خطا در به‌روزرسانی وضعیت.");
      });
  };

  const handleReject = () => {
    updateBlog({
      id,
      data: { publishStatus: "rejected" },
    })
      .unwrap()  
      .then((response) => {
        setIsModalOpen(false);
        toast.success("وضعیت به رد تغییر کرد.");
      })
      .catch((error) => {
        toast.error("خطا در به‌روزرسانی وضعیت.");
      });
  };

  const handleBackList = () => {
    router.push("/dashboard/blogs");
  };
    return (
        <>
              <Panel>

<div className="flex flex-col gap-y-4">
   <div >
      <div className="flex items-center justify-between ">
        <div>
          <a onClick={handleBackList} className="flex cursor-pointer items-center text-slate-300 transition-all hover:text-slate-100">
           <Back />
            <span className="mr-2">بازگشت</span>
          </a>
        </div>
       

        <div className="ltr flex items-center space-x-3 flex-row-reverse md:space-x-5">
          <div >
            <button className="bg-teal-500 relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" id="headlessui-switch-15" role="switch" type="button" tabIndex="0" aria-checked="true">
              <span className="sr-only">Power</span>
              <span aria-hidden="true" className="translate-x-0 pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"></span>
            </button>
          </div>
          {/*
          <div >
            <button className="rounded-lg border border-white/10 bg-slate-800 p-1.5 transition-all hover:bg-slate-900 v-popper--has-tooltip">
             
            </button>
          </div> */}
          
          
        </div>
      </div>

      <div className="border border-gray-200 dark:border-slate-700 dark:bg-slate-800 bg-white shadow-sm rounded-xl md:border-x mt-4 md:mx-0">
  <div className="flex max-w-full flex-wrap items-center justify-between p-5 md:p-8">
    <div className="flex flex-1 flex-col md:flex-row items-center">
    <div className="border-b md:border-b-0 md:border-l border-slate-700 pl-4 text-3xl uppercase dark:text-slate-300 text-slate-700">
    <div className="flex items-center text-2xl">
          <span className="relative ml-3 mr-0.5 flex h-3 w-3">
            <span className="animate-ping bg-teal-400 absolute inline-flex h-full w-full rounded-full opacity-75"></span>
            <span className="bg-teal-400 relative inline-flex h-3 w-3 rounded-full"></span>
          </span>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap  text">{fetchData?.data?.title}</div>
          <button className="appearance-none">
           
           <Edit />
          </button>
        </div>
      </div>


      
      <div className=" px-4 dark:text-slate-300 text-slate-700 mt-2 md:mt-0">
        <div className="flex items-center text-2xl">
          <div className="overflow-hidden text-ellipsis text-justify  whitespace-wrap text-sm text-wrap">{fetchData?.data?.description}</div>
          <button className="appearance-none">
          <Edit />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
    <div className="border-y border-slate-700 bg-white dark:bg-slate-800 shadow-sm md:rounded-xl md:border-x">
      <div className="p-5 md:p-8">
        <div>



          
          <div className="grid grid-cols-1 gap-5 font-sans md:grid-cols-5" >
            <div className="flex text-slate-400">
              <div className="h-7 w-7 text-sky-500"></div>
              <div className="ml-2 text-left">
                <div className="font-sans text-xl text-slate-100">2</div>
                <div className="font-light">اسلاگ</div>
              </div>
            </div>
            <div className="flex text-slate-400">
              <div className="h-7 w-7 text-sky-500">آیکون</div>
              <div className="ml-1 text-left">
                <div className="font-light">کلمات کلیدی</div>
              </div>
            </div>
            <div className="flex text-slate-400">
              <div className="h-7 w-7 text-sky-500">آیکون</div>
              <div className="ml-1 text-left">
                <div className="font-light">ربات</div>
              </div>
            </div>
            <div className="flex text-slate-400">
              <div className="h-7 w-7 text-sky-500">آیکون</div>
              <div className="ml-2 text-left">
                <div className="font-sans text-xl text-slate-100">3.36 TB</div>
                <div className="font-light">TRAFFIC</div>
              </div>
            </div>
            <div className="flex text-slate-400">
              <div className="h-7 w-7 text-sky-500">آیکون</div>
              <div className="ml-2 text-left">
                <div className="font-sans text-xl text-slate-100">850,000 <span className="font-serif">t</span></div>
                <div className="font-light">PRICE / mo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </Panel>
    {isModalOpen && (
            <div
              className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-opacity-70  transition-all ease-in-out duration-500"
              style={{
                transform: "translateY(0)",
                opacity: 1, 
              }}
            >
              <div className=" bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
                <div className="  flex justify-around items-center">
                <div className=" ">

                  <button onClick={handleApprove} className="group  border border-green-300 dark:border-green-600 w-[150px] py-2 rounded-md text-green-500 dark:text-green-500   text-center flex justify-center items-center
                  transition-colors border-green-500/10 hover:bg-green-500/10  hover:!opacity-100 group-hover:opacity-70
                  
                  ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><path fill="currentColor" d="M14.438 2.142a.75.75 0 0 0-.878 0c-.643.464-2.088 1.312-3.896 2.041C7.854 4.913 5.74 5.5 3.75 5.5a.75.75 0 0 0-.75.75v7.752c0 3.027 1.703 5.841 3.837 7.95c2.133 2.107 4.828 3.64 7.033 4.024l.129.022l.128-.022c2.206-.385 4.9-1.917 7.033-4.024c2.135-2.109 3.838-4.923 3.838-7.95V6.25a.75.75 0 0 0-.75-.75c-1.99 0-4.103-.587-5.913-1.317c-1.809-.73-3.254-1.577-3.897-2.04M4.5 14.002V6.977c2.015-.124 4.032-.72 5.725-1.403c1.588-.64 2.933-1.375 3.774-1.918c.84.543 2.186 1.278 3.775 1.918c1.692.683 3.71 1.28 5.724 1.403v7.025c0 2.47-1.409 4.923-3.392 6.882c-1.938 1.915-4.301 3.234-6.107 3.59c-1.806-.356-4.17-1.675-6.108-3.59c-1.983-1.958-3.391-4.41-3.391-6.881m15.272-3.713a.75.75 0 0 0-1.044-1.078l-7.244 7.01l-2.23-2.026a.75.75 0 0 0-1.008 1.11l2.75 2.5a.75.75 0 0 0 1.026-.016z"/></svg>
                  
             <span className="mr-2 ">تایید</span>


                    
                  </button>
                  </div>
                  <div className="  ">

                  <button onClick={handleReject} className="group  border border-red-300 dark:border-red-600 w-[150px] py-2 rounded-md text-red-500 dark:text-red-500   text-center flex justify-center items-center transition-colors border-red-500/10 hover:bg-red-500/10  hover:!opacity-100 group-hover:opacity-70">

                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M12.45 2.15C14.992 4.057 17.587 5 20.25 5a.75.75 0 0 1 .75.75V11c0 5.001-2.958 8.676-8.725 10.948a.75.75 0 0 1-.55 0C5.958 19.676 3 16 3 11V5.75A.75.75 0 0 1 3.75 5c2.663 0 5.258-.943 7.8-2.85a.75.75 0 0 1 .9 0M12 3.678c-2.42 1.71-4.923 2.648-7.5 2.8V11c0 4.256 2.453 7.379 7.5 9.442c5.047-2.063 7.5-5.186 7.5-9.442V6.478c-2.577-.152-5.08-1.09-7.5-2.8M9.28 8.222l2.724 2.723l2.725-2.723a.75.75 0 0 1 .975-.073l.084.073a.75.75 0 0 1 .073.975l-.073.084l-2.724 2.723l2.724 2.725a.749.749 0 1 1-1.06 1.059l-2.724-2.724l-2.723 2.724a.75.75 0 0 1-.975.073l-.084-.073a.75.75 0 0 1-.073-.975l.073-.084l2.723-2.725l-2.723-2.723A.75.75 0 0 1 9.28 8.22"/></svg>

                  <span className="mr-2 ">رد</span>


                    
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}
        </>
    );
};






export default Info;
