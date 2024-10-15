import React, { useState, useEffect, forwardRef } from 'react';
import { BsArrowsFullscreen } from "react-icons/bs";
import { TfiFullscreen } from "react-icons/tfi";
import './ckeditor-dark.css'; // اطمینان حاصل کنید که مسیر صحیح است

const RTEditor = forwardRef(({ value, onChange, ...props }, ref) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [CKEditor, setCKEditor] = useState(null);
    const [Editor, setEditor] = useState(null);

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

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
        <div 
            className={` px-3 bg-white dark:bg-gray-800 ${isFullScreen ? 'fullscreen-editor h-screen w-screen' : 'w-[99%] h-[400px]'} relative`} 
            dir="rtl"
        >
            <button 
                className={'p-3 mb-2 rounded-full dark:bg-gray-900 bg-white shadow-lg cursor-pointer z-10'}
                onClick={toggleFullScreen}
            >
                {isFullScreen ? <TfiFullscreen size={20} /> : <BsArrowsFullscreen size={20} />}
            </button>
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
                        'Strikethrough',
                        'Subscript',
                        'Superscript',
                        'FontSize',
                        'FontFamily',
                        'FontColor',
                        'FontBackgroundColor',
                        'Highlight',
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
                        'IndentBlock',
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
                        'Code',
                        'Mention',
                        'TextPartLanguage',
                        'TextTransformation',
                        'LegacyList',
                        'LegacyListProperties',
                        'LegacyTodoList',
                        'CloudServices',
                        'DataFilter',
                        'DataSchema',
                        'WordCount',
                        'HtmlComment',
                        'HtmlEmbed',
                        'GeneralHtmlSupport',
                        'Base64UploadAdapter',
                        'BlockQuote',
                        'Paragraph',
                        'ShowBlocks',
                        'SelectAll',
                        'RemoveFormat'
                    ],
                }}
            />
        </div>
    );
});

export default RTEditor;
