// MultiSelectDropdown.js
import React, { useState, useRef, useEffect } from "react";
import Tooltip from "@/components/shared/tooltip/Tooltip";
import { RxCross2 } from "react-icons/rx";

const MultiSelectDropdown = ({ options, handleChange, selectedOptions, register  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option) => {
    let updatedSelected;
    if (selectedOptions.some((item) => item.id === option.id)) {
      updatedSelected = selectedOptions.filter((item) => item.id !== option.id);
    } else {
      updatedSelected = [...selectedOptions, option];
    }

    handleChange(updatedSelected);
    
  };

  const removeSelectedOption = (option) => {
    const updatedSelected = selectedOptions.filter((item) => item.id !== option.id);
    handleChange(updatedSelected);
  };

  // تابع برای بررسی اینکه آیا گزینه انتخاب شده است یا خیر
  const isOptionSelected = (option) => {
    return selectedOptions.some((item) => item.id === option.id);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full relative" ref={dropdownRef}>
        <div
          tabIndex={0}
          className={`flex items-center justify-between  ${selectedOptions.length > 0 ? 'p-1':'p-3'} border border-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:focus:bg-[#0a2d4d] dark:focus:border-blue-500 rounded-lg cursor-pointer bg-white`}
          onClick={toggleDropdown}
          {...register}

        >
          <div className="flex flex-wrap">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <div
                  key={option.id}
                  className="m-1 bg-green-100 dark:bg-blue-100 text-green-700 dark:text-blue-700 border border-green-700 dark:border-blue-700 rounded-full pr-2 gap-2 py-1 flex items-center"
                >
                  {option.value}
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
              <span className="text-gray-500"> چند مورد انتخاب کنید</span>
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
          <div className="w-full dark:bg-slate-600 dark:text-gray-100 absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 z-10">
            <input
              id="search-input"
              className="block w-full px-4 py-2 text-gray-800 dark:text-gray-100 border rounded-md border-gray-300 focus:outline-none"
              type="text"
              placeholder="عبارت مورد نظر جستجو کنید"
              value={searchTerm}
              onChange={handleSearch}
              autoComplete="off"
              
            />
                <div className="max-h-60 overflow-y-auto"> 
            {options
              .filter((option) =>
                option.value.toLowerCase().includes(searchTerm)
              )
              .map((option) => (
                <a
                  key={option.id}
                  onClick={(event) => {
                    register.onChange(event); // ارسال تغییرات به react-hook-form
                    handleOptionSelect(option);
                  }}
                  className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-700 active:bg-blue-100 cursor-pointer rounded-md ${
                    isOptionSelected(option) ? 'bg-gray-200 dark:bg-slate-800 ' : ''
                  }`}
                >
                  <Tooltip
                    key={option.value}
                    text={option.description || ""}
                    txtColor={"text-white"}
                  >
                    {option.value}
                  </Tooltip>
                </a>
              ))}
          </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default MultiSelectDropdown;
