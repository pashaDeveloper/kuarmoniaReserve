// CustomProgressBar.js
import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import {BranchIcon,ContentIcon,RankIcon} from '@/utils/SaveIcon';
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
      <ContentIcon />

    ),
  },
  {
    number: 3,
    label: 'شاخه بندی',
    required: true,
    icon: (
      <BranchIcon />

    ),
  },
  {
    number: 4,
    label: 'تنظیمات انتشار',
    required: true,
    icon: (
<span className="si--settings-duotone "></span>
    ),
  },
  {
    number: 5,
    label: 'SEO',
    required: false,
    icon: (
      <RankIcon />
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
                  <div className="w-full bg-pink-500  rounded-full h-1">
                    <div
                      className="bg-green-500 dark:bg-blue-500 h-1 rounded-full"
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
                className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  isCompleted
                    ? 'bg-green-500 border-green-500 dark:bg-blue-500 dark:border-blue-500 '
                    : isActive
                    ? 'bg-green-500 border-green-500 dark:border-blue-500 dark:bg-blue-500'
                    : 'bg-pink-400 border-pink-400'
                }`}
              >
                <span className={`text-lg text-white font-medium flex justify-center items-center `}>
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
