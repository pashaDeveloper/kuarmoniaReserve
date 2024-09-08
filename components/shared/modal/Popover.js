import React, { useState } from "react";
import ReactDOM from "react-dom";

const Popover = ({
  isOpen,
  onClose,
  content,
  position = { top: null, left: null }, // برای تنظیم موقعیت سفارشی
  bgColor = "bg-white",
  txtColor = "text-black",
}) => {
  if (!isOpen) return null;

  const { top, left } = position;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`absolute p-4 rounded shadow-lg ${bgColor} ${txtColor}`}
        style={{
          top: top !== null ? `${top}px` : "50%",
          left: left !== null ? `${left}px` : "50%",
          transform:
            top !== null && left !== null ? "translate(0, 0)" : "translate(-50%, -50%)",
        }}
        onClick={(e) => e.stopPropagation()} // جلوگیری از بستن مدال هنگام کلیک درون آن
      >
        {content}
      </div>
    </div>,
    document.body // رندر کردن مدال در body
  );
};

export default Popover;
