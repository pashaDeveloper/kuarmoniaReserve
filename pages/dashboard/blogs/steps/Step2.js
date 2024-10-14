import React from 'react';
import { Controller } from 'react-hook-form';
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import RTEditor from "@/components/shared/editor/RTEditor";

const Step2 = ({ setGalleryPreview, editorData, setEditorData, register, control, errors }) => { 
  return (
    <>
      <label htmlFor="gallery" className="flex flex-col gap-y-2">
        تصویر عنوان وبلاگ
        <GalleryUpload
          setGalleryPreview={setGalleryPreview}
          register={register('gallery', { required: 'آپلود تصویر عنوان الزامی است' })}
          maxFiles={1}
        />
      </label>
      {errors.gallery && (
        <span className="text-red-500 text-sm">{errors.gallery.message}</span>
      )}

      <label htmlFor="content" className="flex flex-col gap-y-2 w-full h-[200px]">
        محتوا
        <Controller
          name="content"
          control={control} // Ensure control is passed
          rules={{ required: 'محتوا الزامی است' }} // Rule for required content
          render={({ field }) => (
            <>
              <RTEditor
                {...field}
                value={editorData} // Use editorData here
                onChange={(value) => {
                  setEditorData(value); // Update editorData correctly
                  field.onChange(value); // Call field.onChange too
                }}
              />
              {errors.content && (
                <span className="text-red-500 text-sm">{errors.content.message}</span>
              )}
            </>
          )}
        />
      </label>
    </>
  );
};

export default Step2;
