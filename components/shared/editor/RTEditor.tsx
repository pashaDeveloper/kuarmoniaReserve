import React, { useState, useEffect, forwardRef } from 'react';
import './ckeditor-dark.css'; // اطمینان حاصل کنید که مسیر صحیح است

const RTEditor = forwardRef(({ value, onChange, ...props }, ref) => {
    const [CKEditor, setCKEditor] = useState(null);
    const [Editor, setEditor] = useState(null);

    useEffect(() => {
        import("@ckeditor/ckeditor5-react").then(module => {
            setCKEditor(() => module.CKEditor);
        });
        import("./ckeditor/build/ckeditor").then(module => {
            setEditor(() => module.Editor);
        });
    }, []);

    if (!CKEditor || !Editor) {
        return null; // Render nothing while loading
    }

    return (
        <div className={`px-3 bg-white dark:bg-gray-800 relative`} dir="rtl">
            <CKEditor
                editor={Editor}
                data={value}
                onChange={(event, editor) => {
                    onChange?.(editor.getData());
                }}
                className={'dark:bg-gray-700'}
                config={{
                    language: 'fa',
                    toolbar: [
                        'Undo',
                        'Redo',
                        'FindAndReplace',
                        'PageBreak',
                        '|', 
                        'bold', 
                        'italic', 
                        'strikethrough',
                        'subscript',
                        'superscript',
                        'fontsize',
                        'fontfamily',
                        'fontcolor',
                        'fontBackgroundColor',
                        'highlight',
                        '|', 
                        'SpecialCharacters',
                        'link', 
                        'bulletedList', 
                        'numberedList', 
                        'insertTable', 
                        '|', 
                        'Alignment',
                        'AutoImage',
                        'AutoLink',
                        'Indent',
                        'Outdent', 
                        '|', 
                        'ImageUpload',
                        'MediaEmbed',
                        '|', 
                        'SourceEditing',
                        'RemoveFormat',
                        'ShowBlocks',
                        'PasteFromOffice',
                        'CodeBlock',
                        'Fullscreen', // دکمه fullscreen پیش‌فرض
                    ],
                }}
            />
        </div>
    );
});

export default RTEditor;
