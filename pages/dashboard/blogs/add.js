import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import {
  useAddBlogMutation,
  useUpdateBlogMutation,
} from "@/services/blog/blogApi";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import DisplayImages from "@/components/shared/gallery/DisplayImages";
import RTEditor from "@/components/shared/editor/RTEditor";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";
import { TfiFullscreen } from "react-icons/tfi"
 // وارد کردن کامپوننت اسکلت 
 
import SkeletonProfile from "@/components/shared/skeleton/SkeletonProfile";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";

const Add = ({ onClose, onSuccess, blogToEdit = null }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [addBlog, { isLoading: isAdding, data: addData, error: addError }] =
    useAddBlogMutation();
  const [
    updateBlog,
    { isLoading: isUpdating, data: updateData, error: updateError },
  ] = useUpdateBlogMutation();
  const [editorData, setEditorData] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const profileImage = "https://avatar.iran.liara.run/public"; // آدرس عکس واقعی

  const handleChange = (data) => {
    setEditorData(data);
  };
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };
  useEffect(() => {
    if (blogToEdit) {
      setValue("content", blogToEdit.content);
      setEditorData(blogToEdit.content);
    }
  }, [blogToEdit, setValue]);
  const publishDate =
    watch("publishDate") || new Date().toISOString().split("T")[0]; // خواندن تاریخ یا تنظیم پیش‌فرض

  useEffect(() => {
    // تنظیم تاریخ امروز به صورت پیش‌فرض
    const today = new Date().toISOString().split("T")[0]; // فقط قسمت تاریخ بدون زمان
    setValue("publishDate", today);
  }, [setValue]);
  useEffect(() => {
    if (blogToEdit) {
      setValue("title", blogToEdit.title);
      setValue("description", blogToEdit.description);
      setValue("content", blogToEdit.content);
      setValue("publishDate", blogToEdit.publishDate);
      setValue("featuredImage", blogToEdit.featuredImage);
      setSelectedTags(
        blogToEdit.tags.map((tag) => ({ id: tag._id, label: tag.title }))
      );
      setSelectedCategory(blogToEdit.category);
    } else {
      reset();
      setSelectedTags([]);
      setSelectedCategory(null);
    }
  }, [blogToEdit, setValue, reset]);

  useEffect(() => {
    const isLoading = isAdding || isUpdating;
    const data = addData || updateData;
    const error = addError || updateError;

    if (isLoading) {
      toast.loading("در حال پردازش...", { id: "blog" });
    }

    if (data) {
      toast.success(data?.message, { id: "blog" });
      reset();
      if (onSuccess) {
        onSuccess();
      }
      if (onClose) {
        onClose();
      }
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "blog" });
    }
  }, [
    addData,
    updateData,
    addError,
    updateError,
    isAdding,
    isUpdating,
    reset,
    onClose,
    onSuccess,
  ]);

  const handleAddOrUpdateBlog = (formData) => {
    try {
      formData.tags = selectedTags.map((tag) => ({ _id: tag.id }));
      formData.category = selectedCategory;

      if (blogToEdit) {
        updateBlog({ id: blogToEdit._id, ...formData }).unwrap();
      } else {
        addBlog(formData).unwrap();
      }
    } catch (err) {
      console.error("خطا در هنگام پردازش بلاگ: ", err);
    }
  };

  const handleTagsChange = (newSelectedTags) => {
    setSelectedTags(newSelectedTags);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const categoryOptions = [
    { id: "1", value: "Tech", label: "Technology" },
    { id: "2", value: "Lifestyle", label: "Lifestyle" },
    { id: "3", value: "Education", label: "Education" },
  ];

  const toggleFullscreen = () => {
    if (isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      if (previewRef.current.requestFullscreen) {
        previewRef.current.requestFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="m-6 flex flex-col gap-6 sm:flex-row">
      {/* فرم */}
      <div className="flex-1">
   
        <form
          className="text-sm w-full h-full flex flex-col gap-y-4 mb-3"
          onSubmit={handleSubmit(handleAddOrUpdateBlog)}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
            <div className="flex-1">
              <label htmlFor="title" className="flex flex-col gap-y-2">
                عنوان
                <input
                  type="text"
                  name="title"
                  id="title"
                  maxLength={70}
                  placeholder="عنوان بلاگ را تایپ کنید..."
                  className="rounded"
                  autoFocus
                  {...register("title", { required: true })}
                />
              </label>
            </div>
            <div className="flex-1">
              <label htmlFor="publishDate" className="flex flex-col gap-y-2">
                تاریخ انتشار
                <input
                  type="date"
                  name="publishDate"
                  id="publishDate"
                  className="rounded"
                  {...register("publishDate")}
                  defaultValue={publishDate} // مقدار پیش‌فرض تاریخ امروز
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
            <div className="flex-1">
              <label htmlFor="tags" className="flex flex-col gap-y-2">
                تگ ها
                <MultiSelectDropdown
                  options={categoryOptions}
                  selectedOptions={selectedTags}
                  onChange={handleTagsChange}
                  className="w-full"
                  name="tags"
                />
              </label>
            </div>
            <div className="flex-1">
              <label htmlFor="category" className="flex flex-col gap-y-2">
                دسته‌بندی
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="rounded w-full"
                  {...register("category")}
                >
                  <option value="">انتخاب دسته‌بندی</option>
                  {categoryOptions.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <label htmlFor="description" className="flex flex-col gap-y-2">
            توضیحات
            <textarea
              name="description"
              id="description"
              maxLength={160}
              placeholder="توضیحات بلاگ را تایپ کنید..."
              className="rounded h-32"
              {...register("description")}
            />
          </label>

          <label htmlFor="content" className="flex flex-col gap-y-2">
            محتوا
            <RTEditor value={editorData} onChange={handleChange} />
          </label>
          <DisplayImages galleryPreview={galleryPreview} imageSize={150} />

          <GalleryUpload
            galleryPreview={galleryPreview}
            setGalleryPreview={setGalleryPreview}
            register={register}
            maxFiles={2}
            required={true} // اجباری بودن آپلود عکس
          />

          <Button type="submit" className="py-2 mt-4 mb-4">
            {blogToEdit ? "ویرایش کردن" : "ایجاد کردن"}
          </Button>
        </form>
      </div>

      {/* پیش‌نمایش */}
      <div className="flex-1 p-4 h-full sm:h-screen border border-gray-300 rounded-lg overflow-y-auto bg-gray-50">
        <button
          className=" bg-white p-2 rounded-full shadow cursor-pointer z-10"
          onClick={toggleVisibility}
        >
          {isHidden ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
        <div className="flex items-center justify-center">
          <div
            className={`w-[616px] h-[275px] scale-[0.9] bg-white shadow-lg rounded-lg overflow-hidden flex ${
              isHidden ? "hidden" : "opacity-100"
            }`}
          >
            <div className="w-1/2 p-6">
              <h2 className="text-2xl font-bold mb-2">
                {watch("title") ? `${watch("title")} ` :  <SkeletonText lines={1} />
            
              }
              </h2>{" "}
              <p className="text-gray-700">
  {watch("description") ? (
    `${watch("description")}`
  ) : (
<SkeletonText lines={8} />
  )}
</p>
            </div>

            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white">
                
              </div>
                         <div
                className="bg-cover bg-center text-center overflow-hidden"
                style={{
                  minHeight: "300px",

                  backgroundImage:
                    "url('https://via.placeholder.com/1150x500')",
                }}
                title="profile"
              ></div>

                
 <SkeletonImage />
            </div>
          </div>
        </div>
        <div
          ref={previewRef}
          className={`w-full h-full bg-gray-50 flex mt-10 items-center justify-center transition-all duration-500 ${
            isFullscreen ? "fixed inset-0 z-50" : "relative"
          }`}
          style={{
            boxShadow: "0 -10px 20px rgba(0, 0, 0, 0.2)", // سایه از بالا
          }}
        >
          <button
            className=" bg-white p-2 rounded-full shadow cursor-pointer  absolute   top-2 right-2 z-10"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <TfiFullscreen size={20} />
            ) : (
              <BsArrowsFullscreen size={20} />
            )}
          </button>

          <div className="flex-1 p-4 mt-4 h-full sm:h-screen rounded-lg overflow-y-auto bg-gray-50">
            {/* محتوا */}
            <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
              <div
                className="bg-cover bg-center text-center overflow-hidden rounded-lg"
                style={{
                  minHeight: "500px",
                  backgroundImage:
                    "url('https://via.placeholder.com/1150x500')",
                }}
                title="profile"
              ></div>

              {/* تصویر پروفایل */}

              <div className="max-w-3xl mx-auto">
                <div className="relative rounded-full">
                  
                <div className=" ">
             
                <div className="absolute top-[-130px] left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
  {isLoading && <SkeletonProfile size="w-32 h-32" />}
  <img
    src={profileImage}
    alt="Profile"
    className={`w-32 h-32 rounded-full object-cover ${isLoading ? "hidden" : "opacity-100"}`}
    onLoad={handleImageLoad}
    style={{ position: "relative", zIndex: 10 }}
  />
</div>
                  </div>

                  <div className="bg-white relative shadow-lg top-0 -mt-32 p-5 sm:p-10  rounded-b-lg ">

                    <div className="flex items-center mt-14 justify-center">
                      {/* اطلاعات نویسنده و تاریخ */}
                      <div className=" text-gray-700  ">
                        <p >
                          <a
                            href="#"
                            className="text-indigo-600 font-medium hover:text-gray-900 transition text-center duration-500 ease-in-out"
                          >
                            <span className="text-2xl ">مرجان سلطانی</span>
                          </a>
                        </p>
                        <p className="text-center">
                          <span className="font-medium ">
                            {new Date(publishDate).toLocaleDateString("fa-IR", {
                              weekday: "long",
                            })}
                            -{" "}
                            {new Date(publishDate).toLocaleDateString("fa-IR")}
                          </span>
                        </p>
                      </div>
                    </div>
                    <h1 className="text-gray-900 font-bold text-3xl mb-2 mt-12 text-center">
                      {watch("title") ? `${watch("title")}` : <SkeletonText lines={1} />
                    }
                    </h1>
                    {/* محتوای مقاله */}

                    <div className="text-base leading-8 my-5 text-justify">
      {editorData ? (
        <div
          dangerouslySetInnerHTML={{
            __html: editorData,
          }}
        ></div>
      ) : (
<SkeletonText lines={22} />
      )}
    </div>

                    {selectedTags.length ? (
                      selectedTags.map((tag) => (
                        <span className="px-2 py-1 mr-1 rounded text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-800">
                          {tag.label}
                        </span>
                      ))
                    ) : (
                      <SkeletonText lines={1} />

                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
