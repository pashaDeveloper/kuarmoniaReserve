
import Deep from "@/components/shared/modal/Deep"; // مطمئن شوید که مسیر درست است
import React, {  useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const ProfileImageSelector = ({ onImageSelect }) => {
    const [showModal, setShowModal] = useState(false);
  
    const handleDeviceSelection = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onImageSelect(reader.result); // پاس دادن تصویر به کامپوننت والد
          setShowModal(false); // بستن مدال
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="py-1 px-4 flex flex-row gap-x-2 bg-green-100 border border-green-900 text-green-900 rounded-secondary w-fit text-sm"
        >
          <IoCloudUploadOutline className="h-5 w-5" />
          انتخاب عکس پروفایل*
        </button>
  
        <Deep isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="flex justify-center items-center h-full">
            <div className="relative w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="w-1/2 h-full flex flex-col justify-center items-center">
                  <span>گالری</span>
                </div>
                <div className="w-1/2 h-full flex flex-col justify-center items-center">
                  <label
                    htmlFor="avatar"
                    className="cursor-pointer flex flex-col justify-center items-center"
                  >
                    <span>دستگاه</span>
                  </label>
                  <input
                  type="file"
                  name="avatar"
                  id="avatar"
                    accept="image/png, image/jpg, image/jpeg"
                    className="hidden"
                    onChange={handleDeviceSelection}
                  />
                </div>
              </div>
            </div>
          </div>
        </Deep>
      </>
    );
  };

  export default ProfileImageSelector;