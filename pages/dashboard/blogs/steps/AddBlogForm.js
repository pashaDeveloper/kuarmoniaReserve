import React, { useState, useCallback,useEffect  } from "react";
import { useForm, FormProvider } from "react-hook-form";
import PreviewSection from "./PreviewSection";
import CustomProgressBar from "./CustomProgressBar";
import NavigationButton from "@/components/shared/button/NavigationButton";
import ToggleThemeButton from "@/components/shared/button/ToggleThemeButton";
import BlogCard from "@/components/shared/card/BlogCard"; 
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4"; 
import Step5 from "./Step5"; 
import { useGetCategoriesForDropDownMenuQuery } from "@/services/category/categoryApi";
import { useGetTagsForDropDownMenuQuery } from "@/services/tag/tagApi";
import AddCategory from "../../categories/add"; 
import AddTag from "../../tags/add"; 
import SendButton from "@/components/shared/button/SendButton"
import { useAddBlogMutation, useUpdateBlogMutation } from "@/services/blog/blogApi";
import { toast } from "react-hot-toast";

const AddBlogForm = () => {
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
      galleryPreview: [],
      visibility: "public",
      isFeatured: false,
      socialLinks: [], // فیلد جدید
      publishDate: new Date().toISOString().split("T")[0],
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [editorData, setEditorData] = useState("");
  const { watch, handleSubmit, trigger, formState: { errors }, register, control, clearErrors, setValue,getValues,reset ,onSuccess  } = methods; 
  const publishDate = watch("publishDate") || new Date().toISOString().split("T")[0];
  const [selectedTags, setSelectedTags] = useState([]);

  const { data: categoriesData, refetch: refetchCategories } = useGetCategoriesForDropDownMenuQuery();
  const { data: tagsData, refetch: refetchTags } = useGetTagsForDropDownMenuQuery();
  const categories = Array.isArray(categoriesData?.data) ? categoriesData.data : [];
  const tags = Array.isArray(tagsData?.data) ? tagsData.data : [];
  const [addBlog, { isLoading: isAdding, data: addData, error: addError }] =
    useAddBlogMutation();
  const [
    updateBlog,
    { isLoading: isUpdating, data: updateData, error: updateError },
  ] = useUpdateBlogMutation();
  const categoryOptions = categories?.map(category => ({
    id: category._id,
    value: category.title,
    description: category.description, 
  }));
  const tagsOptions = tags?.map(tag => ({
    id: tag._id,
    value: tag.title,
    description: tag.description, 
  }));

  const handleAddOrUpdateBlog = async  (formData) => {
    formData.tags = formData.tags.map((tag) => tag.id); 
    console.log("formdata",formData)
    await addBlog(formData).unwrap();

  };
  useEffect(() => {
    const isLoading = isAdding || isUpdating;
    const data = addData || updateData;
    const error = addError || updateError;

    if (isLoading) {
      toast.loading("در حال پردازش...", { id: "blog" });
    }
    console.log("formData")

    if (data) {
      toast.success(data?.message, { id: "blog" });
      reset();
      if (onSuccess) {
        onSuccess();
      }
     
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "Tag" });
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

  const onSubmit = (data) => {
    handleAddOrUpdateBlog(data);
  };

  const handleNext = async () => {
    let stepValid = false;
    switch (currentStep) {
      case 1:
        stepValid = await trigger([
          "title",
          "description",
          "publishDate"
        ]);
        break;
      case 2:
        stepValid = await trigger([
          "gallery",
          "content"
        ]);
        break;
      case 3:
        stepValid = await trigger([
      
        ]);
        break;
      case 4:
        stepValid = await trigger([
          "metaTitle",
          "metaDescription"
        ]);
        break;
      case 5:
        stepValid = await trigger([
          // فیلدهای مرحله ۵ (در صورت وجود)
        ]);
        break;
      default:
        stepValid = false;
    }
    if (stepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section
      className={`relative bg-[#dce9f5] dark:bg-[#1a202c] h-screen w-screen overflow-x-hidden lg:overflow-hidden text-black dark:text-gray-300 p-4`}
    >
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>

      <div className="w-full h-full flex flex-col justify-center items-center">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-full flex flex-col"
          >
            <CustomProgressBar
              currentStep={currentStep}
              totalSteps={totalSteps}
            />

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
                      galleryPreview={galleryPreview}
                      setGalleryPreview={setGalleryPreview}
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
                  {currentStep === 5 && (
                    <Step5 />
                  )}

                  <div className="flex p-6 justify-between mt-4 w-full absolute bottom-0">
                    {currentStep < totalSteps && (
                      <NavigationButton
                        direction="next"
                        onClick={handleNext}
                      />
                    )}
                    {currentStep === totalSteps && (
                      <SendButton  />
                    )}
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
              <div className="flex-1 p-4 items-center flex flex-col">
                <BlogCard
                  title={watch("title")}
                  description={watch("description")}
                  galleryPreview={galleryPreview}
                  publishDate={publishDate}
                />
              </div>

              {/* بخش PreviewSection با overflow-y responsive */}
              <div className="flex-1 p-4 overflow-y-auto lg:overflow-y-visible h-[550px] lg:h-auto">
              <PreviewSection
  watch={watch}
  galleryPreview={galleryPreview}
  isLoading={false}
  handleImageLoad={() => {}}
  publishDate={publishDate}
  editorData={editorData}
  selectedTags={watch("tags")} // استفاده از watch برای دریافت تگ‌ها
  currentStep={currentStep}
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

export default AddBlogForm;
