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
import { Edit,Back,Apply,Reject } from "@/utils/SaveIcon";

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
<div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.1),0_-4px_6px_rgba(0,0,0,0.1)]">
<div className="  flex justify-around items-center">
                <div className=" ">

                  <button onClick={handleApprove} className="group 
                  w-[150px] py-2 rounded-md 
                  apply-button
                  ">
                <Apply />

                  
             <span className="mr-2 ">تایید</span>


                    
                  </button>
                  </div>
                  <div className="  ">

                  <button onClick={handleReject} className="group  border reject-button w-[150px]  ">

    <Reject />

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
