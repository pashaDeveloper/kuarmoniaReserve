import React, { useState, useRef, useEffect } from "react";
import ItemTooltip from "@/components/shared/tooltip/ItemTooltip";

const SearchableDropdown = ({
  items = [],
  value,
  handleSelect,
  sendId = false,
  className,
  isReadOnly = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(() => {
    return items.find((item) => item.value === value) || null;
  });

  const filteredItems = items.filter((item) =>
    item.value.includes(searchTerm)
  );

  const handleItemSelect = (item) => {
    if (!isReadOnly) {
      setSelectedItem(item);
      if (handleSelect) {
        handleSelect(sendId ? item.id : item.value);
      }
      setIsOpen(false);
    }
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

  useEffect(() => {
    if (value) {
      const selected = items.find(item => item.id === value);
      setSelectedItem(selected);
    } else {
      setSelectedItem(null);
    }
  }, [value, items]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
      type="button"
        onClick={() => !isReadOnly && setIsOpen((prev) => !prev)}
        className={`inline-flex justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:!bg-[#0a2d4d] border border-gray-300 dark:border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 ${
          className
        } ${isReadOnly ? " opacity-50" : ""}`}
        disabled={isReadOnly}
      >
        <span className="ml-2 dark:text-gray-100">
          {selectedItem ? selectedItem.value : "یک مورد را انتخاب کنید"}
        </span>
        {!isReadOnly && (
          <span className="ml-2 dark:text-gray-100">
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
          </span>
        )}
      </button>
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 dark:bg-gray-800 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 z-20 space-y-1 w-64 ${className}`}
        >
          {/* Search input */}
          <input
            type="text"
            placeholder="جستجو کن"
            className="block w-full px-4 py-2 text-gray-800 dark:text-gray-100 border rounded-md border-gray-300 focus:outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Dropdown items */}
          {filteredItems.map((item) => (
            <ItemTooltip
              key={item.id}
              tooltipText={item.description}
              portal={"right"}
            >
              <a
                                    key={item.id}
                onClick={() => handleItemSelect(item)}
                className="block px-4 py-2 text-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 active:bg-blue-100 cursor-pointer rounded-md"
              >
                {item.value}
              </a>
            </ItemTooltip>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
