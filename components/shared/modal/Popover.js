import React from "react";
import ReactDOM from "react-dom";

const Popover = ({ isOpen, onClose, content, bgColor = "bg-white", txtColor = "text-black" }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0   flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`relative p-4  rounded shadow-lg ${bgColor} ${txtColor} `}
        onClick={(e) => e.stopPropagation()} // جلوگیری از بستن مدال هنگام کلیک درون آن
      >
        {content}
      
      </div>
    </div>,
    document.body // رندر کردن مدال در body
  );
};

export default Popover;
