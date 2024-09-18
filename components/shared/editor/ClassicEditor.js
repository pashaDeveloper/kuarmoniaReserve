import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BsArrowsFullscreen } from "react-icons/bs";
import { TfiFullscreen } from "react-icons/tfi";
import UploadAdapter from '@/utils/uploadAdapter';

const CKEditorComponent = ({ value, onChange }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={`pt-4 px-3 ${isFullScreen ? 'fullscreen-editor' : ''}`}>
      <button 
        className={'bg-white p-2 mb-2 rounded-full shadow cursor-pointer z-10'}
        onClick={toggleFullScreen}
      >
        {isFullScreen ? <TfiFullscreen size={20} /> : <BsArrowsFullscreen size={20} />}
      </button>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          language: 'fa',
          plugins: [ ...ClassicEditor.builtinPlugins ],
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
            'fontSize',
            'fontColor',  // اضافه کردن انتخاب رنگ فونت
            'fontBackgroundColor',  // اضافه کردن انتخاب رنگ پس‌زمینه
            'undo',
            'redo',
            'imageUpload'  
          ],
          fontSize: {
            options: [
              8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72
            ]
          },
          fontColor: {
            columns: 5,
            documentColors: 10
          },
          fontBackgroundColor: {
            columns: 5,
            documentColors: 10
          },
          image: {
            toolbar: [
              'imageTextAlternative', 'imageStyle:full', 'imageStyle:side'
            ]
          },
          extraPlugins: [ MyUploadAdapterPlugin ],
        }}
      />
    </div>
  );
};

function MyUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new UploadAdapter(loader);
  };
}

export default CKEditorComponent;
