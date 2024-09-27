// components/signup/StepIndicator.jsx
import React from "react";
import { LuShieldCheck } from "react-icons/lu"; // استفاده از LuShieldCheck از react-icons

const StepIndicator = ({ currentStep, totalSteps, onStepClick }) => {
  return (
    <div className="flex items-center justify-between mb-6 w-full">
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <React.Fragment key={step}>
            <div className="flex items-center">
              {/* دایره مرحله */}
              <button
                type="button"
                onClick={() => onStepClick(step)}
                className={`flex items-center justify-center rounded-full h-10 w-10 ${
                  isCompleted
                    ? "dark:bg-blue-500 dark:hover:bg-blue-600 ring-blue-500 dark:ring-blue-400 bg-green-500 hover:bg-green-600 "
                    : isCurrent
                    ? "dark:bg-blue-500 dark:hover:bg-blue-600 ring-green-400 transition duration-300 ease-in-out dark:ring-blue-400 bg-green-500 outline-none ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 ring-gray-400"
                } text-white font-semibold transition duration-300 ease-in-out focus:outline-none focus:ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ${
                  isCompleted || isCurrent
                    ? "dark:focus:ring-blue-400 focus:ring-green-400"
                    : "focus:ring-gray-400"
                }`}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`مرحله ${step}`}
              >
                {isCompleted ? <LuShieldCheck className="h-6 w-6" /> : step}
              </button>
              {/* خط اتصال بین دایره‌ها */}
              {step !== totalSteps && (
                <div
                  className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                    step < currentStep
                      ? "border-blue-500 dark:border-blue-400"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                ></div>
              )}
            </div>
            {step !== totalSteps && <div className="w-4"></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
