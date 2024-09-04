import React from "react";
import Modal from "../../../components/shared/modal/Modal";

const Info = ({ isOpen, onClose, Tag }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="lg:w-1/3 md:w-1/2 w-full z-50"
    >
      {Tag && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">{Tag.title}</h2>
          <p>
            <strong>توضیحات</strong> {" "}
            <br/>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
            {Tag.description}
            </span>
          </p>
          <p>
            <strong>وضعیت</strong>{" "}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                Tag.status
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {Tag.status ? "فعال" : "غیرفعال"}
            </span>
          </p>
          <p>
            <strong>تاریخ ایجاد</strong>{" "}
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
              {new Date(Tag.createdAt).toLocaleDateString("fa-IR")}
            </span>
          </p>
          <p>
            <strong>شناسه</strong>{" "}
            <span className="inline-flex  min-w-screen  items-center px-2 py-0.5 rounded text-md font-medium bg-orange-100 text-orange-800">
              {Tag.row}
            </span>
          </p>
          <p>
            <strong>شناسه یکتا</strong>{" "}
            <span className="inline-flex items-center px-2 py-0.5 rounded text-md font-medium bg-orange-100 text-orange-800">
              {Tag._id}
            </span>
          </p>
          <p>
            <strong>اسلاگ:</strong> {Tag.slug}
          </p>
          {/* هر اطلاعات دیگری که نیاز دارید */}
        </div>
      )}
    </Modal>
  );
};

export default Info;
