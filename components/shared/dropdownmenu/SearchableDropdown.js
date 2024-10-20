// SearchableDropdown.js
import React, { useState, useRef, useEffect } from "react";
import Tooltip from "@/components/shared/tooltip/Tooltip";

const SearchableDropdown = ({ options = [], handleSelect, value, errors, placeholder = "یک مورد انتخاب کن",sendId = false }) => { 
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(() => {
    return options.find(option => option.value === value) || null;
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (value) {
      const selected = options.find(option => option.value === value);
      setSelectedOption(selected);
    } else {
      setSelectedOption(null);
    }
  }, [value, options]);

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
    setSelectedOption(option); 
    if (handleSelect) { 
      handleSelect(sendId ? option.id : option.value); 
    }
    setIsOpen(false); 
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full relative group" ref={dropdownRef}>
        <button
          type="button"  
          id="dropdown-button"
          className={`inline-flex justify-between w-full px-1 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-500 rounded-lg shadow-sm dark:text-gray-50 focus:outline-none focus:ring-offset-2 dark:focus:!border-blue-500
            ${isOpen ? 'dark:border-blue-500 dark:bg-[#0a2d4d]' : 'dark:bg-gray-600'}`}
          onClick={toggleDropdown}
        >
          <span className="ml-2 text-gray-500">{selectedOption ? selectedOption.value : placeholder}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 -mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="w-full absolute right-0 dark:bg-slate-600 dark:text-gray-100 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 z-10">
            <input
              id="search-input"
              className="block w-full px-4 py-2 text-gray-800 dark:text-gray-100 border rounded-md border-gray-300 focus:outline-none"
              type="text"
              placeholder="عبارت مورد نظر جستجو کن"
              value={searchTerm}
              onChange={handleSearch}
              autoComplete="off"
            />
            <div className="max-h-60 overflow-y-auto"> 
              {options.length > 0 ? ( 
                options
                  .filter((option) =>
                    option.value.toLowerCase().includes(searchTerm)
                  )
                  .map((option) => (
                    <a
                      key={option.id}
                      onClick={() => handleOptionSelect(option)} 
                      className="block px-4 py-2 text-gray-700 dark:text-gray-100 dark:hover:bg-slate-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                    >
                      <Tooltip
                        key={option.value}
                        text={option.description || ""}
                        txtColor={"text-white"}
                      >
                        {option.value}
                      </Tooltip>
                    </a>
                  ))
              ) : (
                <p className="text-gray-500 text-center">هیچ گزینه‌ای موجود نیست</p> 
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableDropdown;
