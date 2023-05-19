import React from 'react';
import './filelist.css'
import {useSelector} from "react-redux";
import File from "./file/File";

const FileList = () => {

   const files = useSelector(state => state.files.files).map(file => <File key = {file._id} file = {file}/>)

    if (files.length === 0) {
        return (
            <div className='loader'>Files not found</div>
        )
    }

    return (
        <div className='filelist'>
            <div className="filelist-header">
                <div className="filelist-name">Name</div>
                <div className="filelist-date">Date</div>
                <div className="filelist-size">Size</div>
            </div>
            {files}
        </div>
    );
};

export default FileList;