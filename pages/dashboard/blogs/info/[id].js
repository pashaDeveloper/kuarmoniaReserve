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
import { MdOutlineTag } from "react-icons/md";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";

const Info = () => {
  const router = useRouter();
  const user = useSelector((state) => state?.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
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


  const handleTitleEditClick = () => {
    setIsTitleEditing(true);
  };
  const handleDescriptionEditClick = () => {
    setIsDescriptionEditing(true);
  };
  useEffect(() => {
    if (fetchData?.data?.title ) {
      setTitle(fetchData.data.title);
    }
    if (fetchData?.data?.description ) {
      setDescription(fetchData.data.description);
    }
  }, [fetchData]);

 

  useEffect(() => {
    if (fetchData?.data?.title) {
      setTitle(fetchData.data.title);
    }
  }, [fetchData]);


  const handleBlur = (e) => {
    e.preventDefault();
    if (title !== fetchData?.data?.title) {
      handleSave();
    }
    if (description !== fetchData?.data?.description) {
      handleSave();
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBlur(e);
    }
  };
  const handleSave = () => {
    updateBlog({
      id: id, 
      data: { title ,description},
    })
      .unwrap() 
      .then((response) => {
        setTitle(title);
        setIsTitleEditing(false);
        setIsDescriptionEditing(false);
        toast.success("بروزرسانی با موفقیت انجام شد");
      })
      .catch((error) => {
        toast.error("خطا در به‌روزرسانی .");
      });
  };
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
          <a onClick={handleBackList} className="flex cursor-pointer items-center dark:text-slate-300 text-slate-700 transition-all hover:text-slate-700 dark:hover:text-slate-800">
           <Back />
            <span className="mr-2">بازگشت</span>
          </a>
        </div>
       

        <div className=" flex items-center space-x-3 flex-row-reverse md:space-x-5">
          <div >
            <button className="bg-teal-500 relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" id="headlessui-switch-15" role="switch" type="button" tabIndex="0" aria-checked="true">
              <span className="sr-only">Power</span>
              <span aria-hidden="true" className="translate-x-0 pointer-events-none inline-block  transform rounded-full h-7 w-7 bg-white shadow-lg ring-0 transition duration-200 ease-in-out"></span>
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
    <div className="border-b md:border-b-0 md:border-l border-slate-700 pl-4 text-3xl  dark:text-slate-300 text-slate-700">
    <div className="flex items-center text-2xl">
          <span className="relative ml-3 mr-0.5 flex h-3 w-3">
            <span className="animate-ping bg-teal-400 absolute inline-flex h-full w-full rounded-full opacity-75"></span>
            <span className="bg-teal-400 relative inline-flex h-3 w-3 rounded-full"></span>
          </span>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap mb-2  text">
          {isTitleEditing ? (
          <input
            type="text"
            name="title"
            onChange={handleTitleChange} 
            value={title || ''}
            onBlur={handleBlur} 
            onKeyDown={handleKeyPress}
          />
        ) : (
          <p>{title}</p>
        )}

          </div>
          <button className="appearance-none" onClick={handleTitleEditClick}>
           
           <Edit />
          </button>
        </div>
      </div>


      
      <div className=" px-4 dark:text-slate-300 text-slate-700 mt-2 md:mt-0 w-full">
        <div className="flex items-center text-2xl ">
        <div className="overflow-hidden text-ellipsis text-justify whitespace-wrap text-sm text-wrap w-full">
  {isDescriptionEditing ? (
    <textarea
      name="description"
      onChange={handleDescriptionChange}
      value={description || ''}
      onBlur={handleBlur}
      onKeyDown={handleKeyPress}
      className="w-full h-[120px]   md:h-20  resize-none border text-justify rounded p-2"
    />
  ) : (
    <p className="w-full">{description}</p>
  )}
</div>

          <button className="appearance-none" onClick={handleDescriptionEditClick}>
          <Edit />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
    <div className="border border-gray-200 dark:border-slate-700 dark:bg-slate-800 bg-white shadow-sm rounded-xl md:border-x mt-4 md:mx-0">
      <div className="p-5 md:p-8">
        <div>



          
          <div className="grid grid-cols-1 gap-5 items-center  md:grid-cols-5" >
            <div className="flex flex-row md:flex-col border-b md:border-b-0 md:border-l border-slate-700 justify-center items-center gap-2 text-slate-400">
            <div className=" text-left">
              </div>
              <div className="flex justify-center items-center mb-2 text-sky-500">{fetchData?.data?.category?.title}
              <button className="appearance-none" >
           
           <Edit />
          </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-slate-400">
              <div className=" text-left">
              </div>
              {fetchData?.data?.tags?.length > 0 
  ? fetchData.data.tags.map((tag, index) => (
      <span
        key={index}
        className="line-clamp-1 cursor-pointer rounded-lg border border-green-700/5 dark:border-blue-500/5 bg-green-800/5 dark:bg-blue-500/5 px-2 py-0 text-green-500 dark:text-blue-500 transition-colors hover:border-green-700/10 dark:hover:border-blue-500/10 hover:bg-green-700/10 dark:hover:bg-blue-500/10 flex items-center gap-x-1 hover:!opacity-100 group-hover:opacity-70 text-sm"
      >
        <MdOutlineTag />
        {tag.title}  {/* Access the title of the tag */}
      </span>
    )) 
  : "ندارد"}


            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="border border-gray-200 dark:border-slate-700 dark:bg-slate-800 bg-white shadow-sm rounded-xl md:border-x mt-4 md:mx-0">
      <div className=" flex flex-col   justify-center bg-white dark:text-blue-100 dark:bg-slate-800">
      <div data-theme="teal" className="mx-auto max-w-6xl">
        <section className="font-sans text-black">
          <div className="[ lg:flex lg:items-center ] [ fancy-corners fancy-corners--large fancy-corners--top-left fancy-corners--bottom-right ]">
            <div className="flex-shrink-0 self-stretch sm:flex-basis-40 md:flex-basis-50 xl:flex-basis-60">
              <div className="h-full">
                <article className="h-full">
                  <div className="h-full">
                  <img
  className="h-full object-cover rounded-t-lg sm:rounded-r-lg sm:rounded-t-none sm:rounded-tr-lg"
  src={fetchData?.data?.featuredImage?.url}
  alt=""
width={500}
/>
                  </div>
                </article>
              </div>
            </div>
            <div className="p-6 bg-grey">
            <Edit />
              <div className="leading-relaxed inline-flex overflow-y-auto max-h-60 overflow-hidden">
         
              {fetchData?.data?.content ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: fetchData?.data?.content,
                  }}
                ></div>
              ) : (
                <SkeletonText lines={22} />
              )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </div>
    <div className="border-y border-slate-700 bg-white dark:bg-slate-800 shadow-sm md:rounded-xl md:border-x">
  <div className="p-5 md:p-8">
    <div className="overflow-x-auto">
      <table className="min-w-full text-right text-sm  text-slate-500 dark:text-slate-400">
        <thead className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 ">
          <tr>
            <th scope="col" className="px-6 py-3 w-40 font-medium">عنوان</th>
            <th scope="col" className="px-6 py-3 font-medium">مقدار</th>
          </tr>
        </thead>
        <tbody>
        <tr className="border-b border-slate-200 dark:border-slate-600">
  <td className="py-3 text-sky-500">اسلاگ</td>
  <td className="px-6 py-3 flex items-center gap-1">
    <span>{fetchData?.data?.slug}</span>
    <span><Edit /></span>
  </td>
</tr>
<tr className="border-b border-slate-200 dark:border-slate-600">
  <td className="py-3 text-sky-500">آدرس اصلی</td>
  <td className="px-6 py-3 flex items-center gap-1">
    <span>{fetchData?.data?.canonicalUrl}</span>
    <span><Edit /></span>
  </td>
</tr>
<tr className="border-b border-slate-200 dark:border-slate-600">
  <td className="py-3 text-sky-500">عنوان متا</td>
  <td className="px-6 py-3 flex items-center gap-1">
    <span>{fetchData?.data?.metaTitle}</span>
    <span><Edit /></span>
  </td>
</tr>
<tr className="border-b border-slate-200 dark:border-slate-600">
  <td className="py-3 text-sky-500">توضیحات متا</td>
  <td className="px-6 py-3 text-justify flex items-center gap-1">
    <span>{fetchData?.data?.metaDescription}</span>
    <span><Edit /></span>
  </td>
</tr>
<tr className="border-b border-slate-200 dark:border-slate-600">
  <td className="py-3 text-sky-500">کلمات کلیدی متا</td>
  <td className="px-6 py-3 flex items-center gap-1">
    <span>{fetchData?.data?.metaKeywords}</span>
    <span><Edit /></span>
  </td>
</tr>

        </tbody>
      </table>
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
