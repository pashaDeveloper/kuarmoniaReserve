// Step2.js
import React from 'react';
import { useFormContext } from 'react-hook-form';
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import RTEditor from "@/components/shared/editor/RTEditor";

const Step2 = ({ setGalleryPreview , editorData,
  setEditorData,register}) => { 

  return (
    <>
      <label htmlFor="content" className="flex flex-col gap-y-2">
        تصویر عنوان وبلاگ
        <GalleryUpload
          setGalleryPreview={setGalleryPreview}
          register={register}
          maxFiles={1}
          required={true}
        />
      </label>
      <label htmlFor="content" className="flex flex-col gap-y-2 w-full h-[200px]">
        محتوا
        <RTEditor value={editorData} onChange={setEditorData} />
      </label>
    </>
  );
};

export default Step2;
