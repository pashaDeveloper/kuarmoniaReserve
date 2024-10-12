// CustomProgressBar.js
import React from 'react';

const steps = [
  {
    number: 1,
    label: 'عنوان و SEO',
    required: true,
    icon: (
      <svg
        className="w-full fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm14 8V5H5v6h14zm0 2H5v6h14v-6zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
      </svg>
    ),
  },
  {
    number: 2,
    label: 'توضیحات و تگ‌ها',
    required: true,
    icon: (
      <svg
        className="w-full fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="M19 10h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2h-2a1 1 0 0 1 0-2h2V8a1 1 0 0 1 2 0v2zM9 12A5 5 0 1 1 9 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v2z" />
      </svg>
    ),
  },
  {
    number: 3,
    label: 'محتوا و رسانه‌ها',
    required: true,
    icon: (
      <svg
        className="w-full fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="M9 4.58V4c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v.58a8 8 0 0 1 1.92 1.11l.5-.29a2 2 0 0 1 2.74.73l1 1.74a2 2 0 0 1-.73 2.73l-.5.29a8.06 8.06 0 0 1 0 2.22l.5.3a2 2 0 0 1 .73 2.72l-1 1.74a2 2 0 0 1-2.73.73l-.5-.3A8 8 0 0 1 15 19.43V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.58a8 8 0 0 1-1.92-1.11l-.5.29a2 2 0 0 1-2.74-.73l-1-1.74a2 2 0 0 1 .73-2.73l.5-.29a8.06 8.06 0 0 1 0-2.22l-.5-.3a2 2 0 0 1-.73-2.72l1-1.74a2 2 0 0 1 2.73-.73l.5.3A8 8 0 0 1 9 4.57zM7.88 7.64l-.54.51-1.77-1.02-1 1.74 1.76 1.01-.17.73a6.02 6.02 0 0 0 0 2.78l.17.73-1.76 1.01 1 1.74 1.77-1.02.54.51a6 6 0 0 0 2.4 1.4l.72.2V20h2v-2.04l.71-.2a6 6 0 0 0 2.41-1.4l.54-.51 1.77 1.02 1-1.74-1.76-1.01.17-.73a6.02 6.02 0 0 0 0-2.78l-.17-.73 1.76-1.01-1-1.74-1.77 1.02-.54-.51a6 6 0 0 0-2.4-1.4l-.72-.2V4h-2v2.04l-.71.2a6 6 0 0 0-2.41 1.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    ),
  },
  {
    number: 4,
    label: 'تنظیمات انتشار',
    required: true,
    icon: (
      <svg
        className="w-full fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" />
      </svg>
    ),
  },
];

const CustomProgressBar = ({ currentStep }) => {
  return (
    <div className="w-full py-6 ">
      <div className="flex flex-row justify-between items-center">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <div key={step.number} className="w-1/4 relative flex flex-col items-center">
              {/* خط اتصال */}
              {index !== steps.length - 1 && (
                <div className="absolute top-5 right-full translate-x-1/2 w-full flex justify-center">
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-green-300 h-1 rounded-full"
                      style={{
                        width: isCompleted ? '100%' : '0%',
                        transition: 'width 0.3s ease-in-out',
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* دکمه مرحله */}
              <div
                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isCompleted
                    ? 'bg-green-500 border-green-500'
                    : isActive
                    ? 'bg-green-500 border-green-500'
                    : 'bg-white border-gray-200'
                }`}
              >
                <span className={`text-lg font-medium ${isCompleted || isActive ? 'text-white' : 'text-gray-600'}`}>
                  {step.icon}
                </span>
              </div>

              {/* برچسب مرحله */}
              <div className="mt-2 text-center text-xs md:text-base">
                {step.label} {step.required && <span className="text-red-500">*</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomProgressBar;
