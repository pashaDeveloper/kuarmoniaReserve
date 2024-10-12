// AddBlogForm.js
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import PreviewSection from "./PreviewSection";
import CustomProgressBar from "./CustomProgressBar";
import NavigationButton from "@/components/shared/button/NavigationButton";
import ToggleThemeButton from "@/components/shared/button/ToggleThemeButton";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import BlogCard from "@/components/shared/card/BlogCard"; // فرض بر اینکه BlogCard در این مسیر است

const AddBlogForm = () => {
  const methods = useForm({
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

  const {
    watch,
    handleSubmit,
    trigger,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    // پردازش ارسال فرم (مثلاً ارسال به بک‌اند یا دیسپچ به Redux)
    console.log("Form Submitted:", data);
  };

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

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <section
        className={`relative bg-[#dce9f5] dark:bg-[#1a202c] h-screen w-screen overflow-x-hidden text-black dark:text-gray-300 p-4`}
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
              {/* نوار پیشرفت */}
              <CustomProgressBar
                currentStep={currentStep}
                totalSteps={totalSteps}
              />

              <div className="flex flex-col lg:flex-row flex-1">
                {/* ستون اول: مراحل و فرم */}
                <div className="flex-1 flex flex-col items-center p-4">
                  <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-primary overflow-hidden text-black dark:text-gray-300 flex flex-col p-8 gap-y-4 shadow-lg relative h-[500px] items-center">
                    {currentStep === 1 && <Step1 />}
                    {currentStep === 2 && <Step2 />}
                    {currentStep === 3 && <Step3 />}
                    {currentStep === 4 && <Step4 />}
                    
                    {/* دکمه‌های ناوبری */}
             
                      {/* بخش سمت چپ: دکمه "بازگشت" */}
                      {/* بخش سمت راست: دکمه "بعدی" یا "ارسال" */}
                      <div className="flex p-6 justify-between mt-4 w-full absolute bottom-10">
                    {/* بخش سمت چپ برای دکمه "بازگشت" */}
                    {currentStep < totalSteps && (
                        <NavigationButton
                          direction="next"
                          onClick={handleNext}
                        />
                      )}
                    {/* بخش سمت راست برای دکمه "بعدی" یا "ارسال" */}
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
                      <div className="absolute bottom-5  ">
                      <ToggleThemeButton />
                    </div>
                    </div>
                    
                    
                </div>

                {/* ستون دوم: BlogCard */}
                <div className="flex-1 p-4">
                  <BlogCard
                    title={watch("title")}
                    description={watch("description")}
                    galleryPreview={watch("galleryPreview")}
                    publishDate={watch("publishDate")}
                    // سایر پراپ‌ها را اضافه کنید
                  />
                </div>

                {/* ستون سوم: PreviewSection */}
                <div className="flex-1 p-4">
                  <PreviewSection
                    watch={watch}
                    galleryPreview={watch("galleryPreview")}
                    isLoading={false} // وضعیت لودینگ را به دلخواه تنظیم کنید
                    handleImageLoad={() => {}} // پیاده‌سازی هندلر لودینگ تصویر
                    publishDate={watch("publishDate")}
                    editorData={watch("content")}
                    selectedTags={watch("tags")}
                    currentStep={currentStep} // اگر نیاز است
                  />
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </section>
    </>
  );
};

export default AddBlogForm;
