import React, { useState, useEffect, useRef } from "react";
import Tooltip from "@/components/shared/tooltip/Tooltip";
import { RxCross2 } from "react-icons/rx";

const MultiSelectDropdown = ({ options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const dropdownRef = useRef(null); // مرجع به dropdown

  useEffect(() => {
    if (selectedOptions) {
      setSelected(selectedOptions);
    }
  }, [selectedOptions]);

  useEffect(() => {
    // تابع برای بررسی کلیک خارج از dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // اضافه کردن و حذف شنونده رویداد کلیک به مستند
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    let updatedSelected;
    if (selected.some(item => item.value === option.value)) {
      updatedSelected = selected.filter(item => item.value !== option.value);
    } else {
      updatedSelected = [...selected, option];
    }
  
    setSelected(updatedSelected);
    onChange(updatedSelected); // ارسال گزینه‌های انتخاب شده به بیرون
  };
  
  const removeSelectedOption = (option) => {
    const updatedSelected = selected.filter((item) => item.value !== option.value); // فیلتر کردن با value
    setSelected(updatedSelected);
    onChange(updatedSelected);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        tabIndex={0}
        className="flex items-center justify-between p-2 border border-gray-600 focus-within:border-green-400 rounded cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex flex-wrap">
          {selected.length > 0 ? (
            selected.map((option) => (
              <div
                key={option.id} // حالا با استفاده از id
                className="m-1 bg-green-100 text-green-700 border-[1px] border-green-700 rounded-full pr-2 gap-2 py-1 flex items-center"
              >
                {option.label}
                <button
                  className="ml-2 text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSelectedOption(option);
                  }}
                >
                  <RxCross2 />
                </button>
              </div>
            ))
          ) : (
            <span className="text-gray-500">می توانید چند مورد انتخاب کنید</span>
          )}
        </div>
        <div>
          <svg
            className="h-5 w-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-600 rounded shadow-lg z-10">
          {options.map((option) => (
            <Tooltip
              key={option.value}
              text={option.tooltip || ""}
              bgColor={"bg-green-500"}
              txtColor={"text-white"}
            >
              <div
                className={`p-2 cursor-pointer hover:bg-green-100 ${
                  selected.some(item => item.value === option.value) ? "bg-green-100" : ""
                }`}
                onClick={() => handleOptionClick(option)} // اصلاح شده
              >
                {option.label}
              </div>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
