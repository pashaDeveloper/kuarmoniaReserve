// AddBlogForm.js
import React, { useState, useCallback } from "react";
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
import { useGetCategoriesForDropDownMenuQuery } from "@/services/category/categoryApi";
import { useGetTagsForDropDownMenuQuery } from "@/services/tag/tagApi";
import AddCategory from "../../categories/add"; 
import AddTag from "../../tags/add"; 

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
      featuredImage: "",
      galleryPreview: [],
      publishStatus: "pending",
      visibility: "public",
      isFeatured: false,
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [editorData, setEditorData] = useState("");
  const { watch, handleSubmit, trigger, formState: { errors }, register } = methods;

  const publishDate = watch("publishDate") || new Date().toISOString().split("T")[0];

  // مدیریت تگ‌ها و دسته‌بندی‌ها
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // فراخوانی داده‌های دسته‌بندی و تگ‌ها
  const { data: categoriesData, refetch: refetchCategories } = useGetCategoriesForDropDownMenuQuery();
  const { data: tagsData, refetch: refetchTags } = useGetTagsForDropDownMenuQuery();
  const categories = Array.isArray(categoriesData?.data) ? categoriesData.data : [];
  const tags = Array.isArray(tagsData?.data) ? tagsData.data : [];

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

  // مدیریت افزودن یا بروزرسانی بلاگ
  const handleAddOrUpdateBlog = (formData) => {
    formData.tags = selectedTags.map((tag) => ({ _id: tag.id }));
    formData.category = selectedCategory;
    // اینجا می‌توانید منطق ارسال به API را اضافه کنید
    console.log("Form Data:", formData);
  };

  // مدیریت تغییرات تگ‌ها و دسته‌بندی‌ها
  const handleTagsChange = (newSelectedTags) => {
    setSelectedTags(newSelectedTags);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  // مدیریت بازگشت و بروزرسانی لیست‌ها بعد از افزودن دسته‌بندی یا تگ جدید
  const handleCategoryAdded = useCallback(() => {
    refetchCategories();
  }, [refetchCategories]);

  const handleTagAdded = useCallback(() => {
    refetchTags();
  }, [refetchTags]);

  // مدیریت وضعیت مدال‌ها
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const openCategoryModal = useCallback(() => {
    console.log("باز کردن مدال دسته‌بندی");
    setIsCategoryModalOpen(true);
  }, []);

  const closeCategoryModal = useCallback(() => {
    console.log("بستن مدال دسته‌بندی");
    setIsCategoryModalOpen(false);
  }, []);

  const openTagModal = useCallback(() => {
    console.log("باز کردن مدال تگ");
    setIsTagModalOpen(true);
  }, []);

  const closeTagModal = useCallback(() => {
    console.log("بستن مدال تگ");
    setIsTagModalOpen(false);
  }, []);

  // مدیریت ارسال فرم
  const onSubmit = (data) => {
    handleAddOrUpdateBlog(data);
  };

  // مدیریت حرکت به مرحله بعدی
  const handleNext = async () => {
    let stepValid = false;
    switch (currentStep) {
      case 1:
        stepValid = await trigger([
          "title",
          "description",
          // اگر فیلدهای دیگری در مرحله اول دارید، آنها را اضافه کنید
        ]);
        break;
      case 2:
        stepValid = await trigger(["description", "tags", "category"]);
        break;
      case 3:
        stepValid = await trigger([
          "content",
          "featuredImage",
          "galleryPreview",
        ]);
        break;
      case 4:
        stepValid = await trigger([
          "publishDate",
          "publishStatus",
          "visibility",
          "isFeatured",
        ]);
        break;
      default:
        stepValid = false;
    }
    if (stepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  // مدیریت بازگشت به مرحله قبلی
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section
      className={`relative bg-[#dce9f5] dark:bg-[#1a202c] h-screen w-screen overflow-x-hidden lg:overflow-hidden text-black dark:text-gray-300 p-4`}
    >
      {/* دکمه‌های پس‌زمینه یا تزئینات */}
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
              <div className="flex-1 flex flex-col items-center p-4">
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
                      errors={errors}
                    />
                  )}
                  {currentStep === 3 && (
                    <Step3
                      selectedTags={selectedTags}
                      selectedCategory={selectedCategory}
                      handleTagsChange={handleTagsChange}
                      handleCategoryChange={handleCategoryChange}
                      tagsOptions={tagsOptions}
                      categoryOptions={categoryOptions}
                      openTagModal={openTagModal}
                      openCategoryModal={openCategoryModal}
                    />
                  )}
                  {currentStep === 4 && <Step4 />}

                  <div className="flex p-6 justify-between mt-4 w-full absolute bottom-0">
                    {currentStep < totalSteps && (
                      <NavigationButton
                        direction="next"
                        onClick={handleNext}
                      />
                    )}

                    <div className="flex-1 flex justify-end">
                      {currentStep > 1 && (
                        <NavigationButton
                          direction="prev"
                          onClick={handleBack}
                        />
                      )}
                      {currentStep === totalSteps && (
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          ارسال
                        </button>
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
                  selectedTags={watch("tags")}
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
