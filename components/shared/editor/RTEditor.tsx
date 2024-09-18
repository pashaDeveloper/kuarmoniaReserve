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
        <div className={`pt-4 px-3 ${isFullScreen ? 'fullscreen-editor' : ''}`} dir="rtl">
            <button 
                className={'bg-white p-2 mb-2 rounded-full shadow cursor-pointer z-10'}
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
                config={{
                    language: 'fa'
                }}
            />
        </div>
    );
};

export default RTEditor;
