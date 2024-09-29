import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState } from 'react';
import Editor from "./ckeditor/build/ckeditor";
import { BsArrowsFullscreen } from "react-icons/bs";
import { TfiFullscreen } from "react-icons/tfi";

const RTEditor = ({ value, onChange, ...props }: any) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    return (
        <div className={`pt-4 px-3  ${isFullScreen ? 'fullscreen-editor' : 'w-[99%]'}`} dir="rtl">
            <button 
                className={'bg-white dark:bg-gray-700 p-3 mb-2 rounded-full shadow cursor-pointer z-10'}
                onClick={toggleFullScreen}
            >
                {isFullScreen ? <TfiFullscreen size={20} /> : <BsArrowsFullscreen size={20} />}
            </button>
            <CKEditor
                editor={Editor.Editor}
                data={value}
                onChange={(event, editor) => {
                    onChange?.(editor.getData());
                }}
                className={'dark:bg-gray-700'}
                config={{
                    language: 'fa',
                    toolbar: [
                        'AccessibilityHelp', 
                        'heading', 
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
                        '|', // دسته‌بندی ابزارها با استفاده از خط‌عمودی
                        'Alignment',
                        'AutoImage',
                        'AutoLink',
                        'Indent',
                        'IndentBlock',
                        'Outdent', // کاهش تورفتگی
                        '|', // دسته‌بندی ابزارها با استفاده از خط‌عمودی
                        'ImageUpload',
                        'MediaEmbed',
                        '|', // دسته‌بندی ابزارها با استفاده از خط‌عمودی
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
};

export default RTEditor;
