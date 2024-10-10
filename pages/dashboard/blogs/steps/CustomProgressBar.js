// CustomProgressBar.js
import React from 'react';

const CustomProgressBar = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, label: 'عنوان و SEO', required: true },
    { number: 2, label: 'توضیحات و تگ‌ها', required: true },
    { number: 3, label: 'محتوا و رسانه‌ها', required: true },
    { number: 4, label: 'تنظیمات انتشار', required: true },
  ];

  const getProgressWidth = (step) => {
    // محاسبه درصد پر شدن نوار برای هر مرحله
    if (currentStep > step) return '100%';
    if (currentStep === step) return '50%'; // یا مقدار دلخواه دیگر
    return '0%';
  };

  return (
    <div className="w-full py-6">
      <div className="flex flex-row-reverse justify-between items-center">
        {steps.map((step, index) => (
          <div key={step.number} className="w-1/4 relative flex flex-col items-center">
            {/* نوار اتصال فقط برای مراحل بعدی */}
            {index !== steps.length - 1 && (
              <div
                className="absolute top-5 left-full right-0 flex items-center justify-start transform scaleX-[-1]"
                // معکوس کردن جهت نوار اتصال برای RTL
              >
                <div className="w-full bg-gray-200 rounded-full h-1 transform scaleX-[-1]">
                  <div
                    className="bg-green-300 h-1 rounded-full"
                    style={{
                      width: getProgressWidth(step.number),
                      transition: 'width 0.3s ease-in-out',
                    }}
                  ></div>
                </div>
              </div>
            )}

            {/* دکمه مرحله */}
            <div
              className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'bg-white border-gray-200 text-gray-600'
              }`}
            >
              <span className="text-lg font-medium">
                {step.number}
              </span>
            </div>

            {/* برچسب مرحله */}
            <div className="mt-2 text-center text-xs md:text-base">
              {step.label} {step.required && <span className="text-red-500">*</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomProgressBar;
