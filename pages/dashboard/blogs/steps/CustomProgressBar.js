// CustomProgressBar.js
import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";

const steps = [
  {
    number: 1,
    label:'مشخصات کارت',
    required: true,
    icon: (
      <FaAddressCard size={25} />

    ),
  },
  {
    number: 2,
    label: 'تصویر و محتوا',
    required: true,
    icon: (
      <FaHome size={25} />

    ),
  },
  {
    number: 3,
    label: 'شاخه بندی',
    required: true,
    icon: (
      <BiSolidCategoryAlt size={25} />

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
  {
    number: 5,
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
