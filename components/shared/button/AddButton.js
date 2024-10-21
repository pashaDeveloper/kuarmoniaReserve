import React from 'react';
import { AddIcon } from '@/utils/SaveIcon';

const AddButton = ({ onClick }) => {
  return (
    <a
      className="inline-flex items-center rounded-lg bg-sky-500 px-5 py-2 text-white shadow-sm cursor-pointer transition-all hover:bg-sky-400 gap-2"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
        <path fill="currentColor" d="M8.5 2.75a.75.75 0 0 0-1.5 0V7H2.75a.75.75 0 0 0 0 1.5H7v4.25a.75.75 0 0 0 1.5 0V8.5h4.25a.75.75 0 0 0 0-1.5H8.5z" />
      </svg>
      <span>افزودن آیتم جدید</span>
    </a>
  );
};

export default AddButton;