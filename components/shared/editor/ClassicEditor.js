// components/CKEditorComponent.js
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorComponent = ({ value, onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      config={{
        language: 'fa', // Set Persian language
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
          'imageUpload' // Add image upload button
        ],
        image: {
          toolbar: [
            'imageTextAlternative',
            'imageStyle:full',
            'imageStyle:side'
          ]
        },
        simpleUpload: {
          uploadUrl: '/path/to/your/image/upload/endpoint',
          headers: {
            'X-CSRF-TOKEN': 'YOUR_CSRF_TOKEN' // Optional, if you use CSRF tokens
          }
        }
      }}
    />
  );
};

export default CKEditorComponent;
