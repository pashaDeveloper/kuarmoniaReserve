// MultiSelectDropdown.js
import React, { useState, useRef, useEffect } from "react";
import Tooltip from "@/components/shared/tooltip/Tooltip";
import { RxCross2 } from "react-icons/rx";

const MultiSelectDropdown = ({ options, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]); // حالت برای 
  console.log("options",options)
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
    if (selectedOptions.some((item) => item.value === option.value)) {
      updatedSelected = selectedOptions.filter((item) => item.value !== option.value);
    } else {
      updatedSelected = [...selectedOptions, option];
    }

    setSelectedOptions(updatedSelected);
    handleChange(updatedSelected.map((opt) => opt.value)); 
    // فراخوانی تابع تغییر دسته‌بندی با مقادیر جدید
  };

  const removeSelectedOption = (option) => {
    const updatedSelected = selectedOptions.filter((item) => item.value !== option.value);
    setSelectedOptions(updatedSelected);
    handleChange(updatedSelected.map((opt) => opt.value));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full relative" ref={dropdownRef}>
        <div
          className="flex items-center justify-between p-2 border border-gray-300 focus-within:border-blue-500 rounded-md cursor-pointer bg-white"
          onClick={toggleDropdown}
        >
          <div className="flex flex-wrap">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <div
                  key={option.id}
                  className="m-1 bg-green-100 text-green-700 border border-green-700 rounded-full pr-2 gap-2 py-1 flex items-center"
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
              <span className="text-gray-500">می‌توانید چند مورد انتخاب کنید</span>
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
          <div className="w-full absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
            <input
              id="search-input"
              className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
              type="text"
              placeholder="عبارت مورد نظر جستجو کنید"
              value={searchTerm}
              onChange={handleSearch}
              autoComplete="off"
            />
              {options
    .filter((option) =>
      option.value.toLowerCase().includes(searchTerm)
    )
    .map((option) => (
      <a
        key={option.id}
        onClick={() => handleOptionSelect(option)} // تغییر تابع انتخاب
        className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md`}
      >
        <Tooltip
          key={option.value}
          text={option.description || ""}
          bgColor={"bg-green-500"}
          txtColor={"text-white"}
        >
          {option.value}
        </Tooltip>
      </a>
    ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
