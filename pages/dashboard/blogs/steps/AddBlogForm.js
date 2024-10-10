// AddBlogForm.js
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PreviewSection from '../PreviewSection';
import CustomProgressBar from './CustomProgressBar';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const AddBlogForm = () => {
  const methods = useForm({
    defaultValues: {
      title: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      description: '',
      tags: [],
      category: '',
      content: '',
      featuredImage: '',
      galleryPreview: [],
      publishDate: '',
      publishStatus: 'pending',
      visibility: 'public',
      isFeatured: false,
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const { watch, handleSubmit, trigger, formState: { errors } } = methods;

  const onSubmit = (data) => {
    // پردازش ارسال فرم (مثلاً ارسال به بک‌اند یا دیسپچ به Redux)
    console.log('Form Submitted:', data);
  };

  const handleNext = async () => {
    let stepValid = false;
    switch (currentStep) {
      case 1:
        stepValid = await trigger(['title', 'metaTitle', 'metaDescription', 'metaKeywords']);
        break;
      case 2:
        stepValid = await trigger(['description', 'tags', 'category']);
        break;
      case 3:
        stepValid = await trigger(['content', 'featuredImage', 'galleryPreview']);
        break;
      case 4:
        stepValid = await trigger(['publishDate', 'publishStatus', 'visibility', 'isFeatured']);
        break;
      default:
        stepValid = false;
    }
    if (stepValid) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row">
        {/* بخش فرم */}
        <div className="flex-1 p-4">
          {/* نوار پیشرفت */}
          <CustomProgressBar currentStep={currentStep} totalSteps={totalSteps} />

          {/* محتوای مراحل */}
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 />}
          {currentStep === 4 && <Step4 />}

          {/* دکمه‌های ناوبری */}
          <div className="flex justify-between mt-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                بازگشت
              </button>
            )}
            {currentStep < totalSteps && (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                بعدی
              </button>
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

        {/* بخش پیش‌نمایش */}
        <div className="flex-1 p-4">
          <PreviewSection
            watch={watch}
            galleryPreview={watch('galleryPreview')}
            isLoading={false} // وضعیت لودینگ را به دلخواه تنظیم کنید
            handleImageLoad={() => {}} // پیاده‌سازی هندلر لودینگ تصویر
            publishDate={watch('publishDate')}
            editorData={watch('content')}
            selectedTags={watch('tags')}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default AddBlogForm;
