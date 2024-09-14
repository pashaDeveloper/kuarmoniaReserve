// components/CKEditorComponent.js
import React , { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BsArrowsFullscreen } from "react-icons/bs";
import { TfiFullscreen } from "react-icons/tfi";
const CKEditorComponent = ({ value, onChange }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  return (
    <div className={` pt-4 px-3 ${isFullScreen ? 'fullscreen-editor' : ''}`}>
    <button 
    className={'bg-white p-2 mb-2 rounded-full shadow cursor-pointer z-10'}
    onClick={toggleFullScreen}>
      {isFullScreen ?               
      <TfiFullscreen size={20} />
      : <BsArrowsFullscreen size={20} />
      
  }
    </button>
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      config={{
        language: 'fa', // تنظیم زبان فارسی
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          'blockQuote',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo',
          'imageUpload' // افزودن دکمه آپلود تصویر
        ],
        image: {
          toolbar: [
            'imageTextAlternative',
            'imageStyle:full',
            'imageStyle:side'
          ]
        },
        simpleUpload: {
          uploadUrl: '@/public/uploads',
         
        },
      }}
    />
        </div>

  );
};

export default CKEditorComponent;
