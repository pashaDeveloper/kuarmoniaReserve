import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import PreviewSection from "./steps/PreviewSection";
import CustomProgressBar from "./steps/CustomProgressBar";
import NavigationButton from "@/components/shared/button/NavigationButton";
import ToggleThemeButton from "@/components/shared/button/ToggleThemeButton";
import BlogCard from "@/components/shared/card/BlogCard";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import { useGetCategoriesForDropDownMenuQuery } from "@/services/category/categoryApi";
import { useGetTagsForDropDownMenuQuery } from "@/services/tag/tagApi";
import AddCategory from "../categories/add";
import AddTag from "../tags/add";
import SendButton from "@/components/shared/button/SendButton";
import {
  useAddBlogMutation,
  useUpdateBlogMutation,
} from "@/services/blog/blogApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { PrevIcon } from "@/utils/SaveIcon";

const Add = () => {
  const router = useRouter();

  const handleBackList = () => {
    router.push("/dashboard/blogs");
  };
  const methods = useForm({
    mode: "all",
    defaultValues: {
      title: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      description: "",
      tags: [],
      category: "",
      content: "",
      gallery: "",
      readTime: "",
      visibility: "public",
      isFeatured: false,
      socialLinks: [], // فیلد جدید
      publishDate: new Date().toISOString().split("T")[0],
    },
  });
  const user = useSelector((state) => state?.auth);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [editorData, setEditorData] = useState("");
  const {
    watch,
    handleSubmit,
    trigger,
    formState: { errors },
    register,
    control,
    clearErrors,
    setValue,
    getValues,
    reset,
    onSuccess,
  } = methods;
  const publishDate =
    watch("publishDate") || new Date().toISOString().split("T")[0];
  const [selectedTags, setSelectedTags] = useState([]);

  const { data: categoriesData, refetch: refetchCategories } =
    useGetCategoriesForDropDownMenuQuery();
  const { data: tagsData, refetch: refetchTags } =
    useGetTagsForDropDownMenuQuery();
  const categories = Array.isArray(categoriesData?.data)
    ? categoriesData.data
    : [];
  const tags = Array.isArray(tagsData?.data) ? tagsData.data : [];
  const [addBlog, { isLoading: isAdding, data: addData, error: addError }] =
    useAddBlogMutation();
  const [
    updateBlog,
    { isLoading: isUpdating, data: updateData, error: updateError },
  ] = useUpdateBlogMutation();
  const categoryOptions = categories?.map((category) => ({
    id: category._id,
    value: category.title,
    description: category.description,
  }));
  const tagsOptions = tags?.map((tag) => ({
    id: tag._id,
    value: tag.title,
    description: tag.description,
  }));
  const defaultValues = useMemo(() => {
    return {
      name: user?.name,
      avatar: user?.avatar,
      id: user?._id,
    };
  }, [user]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("metaTitle", data.metaTitle || "");
    formData.append("metaDescription", data.metaDescription || "");
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("content", data.content);
    formData.append("visibility", data.visibility);
    formData.append("isFeatured", data.isFeatured);
    formData.append("readTime", data.readTime);
    formData.append("publishDate", new Date().toISOString().split("T")[0]);
    formData.append("authorId", user?._id);
    data.tags.forEach((tag) => {
      formData.append("tags[]", tag.id);
    });
    formData.append("featuredImage", thumbnail);
    await addBlog(formData);
  };

  useEffect(() => {
    const isLoading = isAdding || isUpdating;
    const data = addData || updateData;
    const error = addError || updateError;

    if (isLoading) {
      toast.loading("در حال پردازش...", { id: "blog" });
    }

    if (data?.success) {
      toast.success(data?.message, { id: "blog" });
      reset();
      setCurrentStep(1);
      setEditorData("");
      setGalleryPreview(null);
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
    onSuccess,
  ]);
  const handleTagsChange = (newSelectedTags) => {
    setSelectedTags(newSelectedTags);
  };

  const handleCategoryAdded = useCallback(() => {
    refetchCategories();
  }, [refetchCategories]);

  const handleTagAdded = useCallback(() => {
    refetchTags();
  }, [refetchTags]);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const openCategoryModal = useCallback(() => {
    setIsCategoryModalOpen(true);
  }, []);

  const closeCategoryModal = useCallback(() => {
    setIsCategoryModalOpen(false);
  }, []);

  const openTagModal = useCallback(() => {
    setIsTagModalOpen(true);
  }, []);

  const closeTagModal = useCallback(() => {
    setIsTagModalOpen(false);
  }, []);


  const handleNext = async () => {
    let stepValid = false;
    switch (currentStep) {
      case 1:
        stepValid = await trigger(["title", "description", "publishDate"]);
        break;
      case 2:
        stepValid = await trigger(["Thumbnail", "content"]);
        break;
      case 3:
        stepValid = await trigger(["tags", "category"]);
        break;
      case 4:
        stepValid = await trigger(["metaTitle", "metaDescription"]);
        break;
      case 5:
        stepValid = await trigger([]);
        break;
      default:
        stepValid = false;
    }

    if (!stepValid) {
      toast.dismiss();
      toast("لطفا ابتدا مرحله مورد نظر را تکمیل کنید.!", {
        icon: "⚠️",
      });
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const featureImage = galleryPreview ? galleryPreview[0] : "";
  return (
    <section
      className={`relative bg-[#dce9f5] dark:bg-[#1a202c] h-screen w-screen overflow-x-hidden lg:overflow-hidden text-black dark:text-gray-300 p-4`}
    >
      <a
        onClick={handleBackList}
        className="fixed bottom-4 right-4 group items-center reject-button rounded-full  !bg-red-800/20 shadow-lg !p-4 text-slate-300 transition-all hover:text-slate-100 z-50"
        title="بازگشت"
      >
        <PrevIcon className="h-6 w-6 transition-transform duration-300 transform group-hover:-translate-x-1 group-focus:translate-x-1" />
      </a>
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>

      <div className="w-full h-full flex flex-col justify-center items-center">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-full flex flex-col"
          >
            <div className="flex  items-center">
              <div></div>
              <CustomProgressBar
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            </div>

            <div className="flex flex-col lg:flex-row-reverse flex-1">
              {/* بخش فرم */}
              <div className="flex-1  flex flex-col items-center p-4">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden text-black dark:text-gray-300 flex flex-col p-8 gap-y-4 shadow-lg relative h-[560px] items-center">
                  {currentStep === 1 && (
                    <Step1
                      publishDate={publishDate}
                      register={register}
                      errors={errors}
                    />
                  )}
                  {currentStep === 2 && (
                    <Step2
                      setThumbnail={setThumbnail}
                      setThumbnailPreview={setThumbnailPreview}
                      editorData={editorData}
                      setEditorData={setEditorData}
                      register={register}
                      control={control}
                      errors={errors}
                      useState={useState}
                    />
                  )}
                  {currentStep === 3 && (
                    <Step3
                      selectedTags={selectedTags}
                      handleTagsChange={handleTagsChange}
                      tagsOptions={tagsOptions}
                      categoryOptions={categoryOptions}
                      openTagModal={openTagModal}
                      openCategoryModal={openCategoryModal}
                      register={register}
                      errors={errors}
                      clearErrors={clearErrors}
                      control={control}
                      setValue={setValue}
                    />
                  )}
                  {currentStep === 4 && (
                    <Step4
                      register={register}
                      errors={errors}
                      control={control}
                      getValues={getValues}
                    />
                  )}
                  {currentStep === 5 && <Step5 />}

                  <div className="flex p-6 justify-between mt-4 w-full absolute bottom-0">
                    {currentStep < totalSteps && (
                      <NavigationButton direction="next" onClick={handleNext} />
                    )}
                    {currentStep === totalSteps && <SendButton />}
                    <div className="flex-1 flex justify-end">
                      {currentStep > 1 && (
                        <NavigationButton
                          direction="prev"
                          onClick={handleBack}
                        />
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-5">
                    <ToggleThemeButton />
                  </div>
                </div>
              </div>

              {/* بخش BlogCard */}
              <div className="flex-1 items-center flex flex-col">
                <BlogCard
                  title={watch("title")}
                  description={watch("description")}
                  thumbnailPreview={thumbnailPreview?.url}
                  publishDate={publishDate}
                />
              </div>

              {/* بخش PreviewSection با overflow-y responsive */}
              <div className="flex-1  overflow-y-auto lg:overflow-y-visible h-[550px] lg:h-auto">
                <PreviewSection
                  watch={watch}
                  thumbnailPreview={thumbnailPreview?.url}
                  isLoading={false}
                  handleImageLoad={() => {}}
                  publishDate={publishDate}
                  editorData={editorData}
                  selectedTags={watch("tags")}
                  currentStep={currentStep}
                  author={defaultValues?.name}
                  avatar={defaultValues?.avatar?.url}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>

      {/* مدال افزودن دسته‌بندی */}
      <AddCategory
        isOpen={isCategoryModalOpen}
        onClose={closeCategoryModal}
        onSuccess={handleCategoryAdded}
      />
      {/* مدال افزودن تگ */}
      <AddTag
        isOpen={isTagModalOpen}
        onClose={closeTagModal}
        onSuccess={handleTagAdded}
      />
    </section>
  );
};

export default Add;
