import React from 'react';
import './file.css'
import dirLogo from '../../../../assets/img/imgDir.svg'
import fileLogo from '../../../../assets/img/imgFile.svg'
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file";
import sizeFormat from "../../../../assets/sizeFormat";

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)


    function openDirHandler(file) {
        if(file.type === 'dir'){
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    return (
        <div className='file' onClick={() => openDirHandler(file)}>
            <img src= {file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-img"/>
            <div className="file-name">{file.name}</div>
            <div className="file-date">{file.date.slice(0,10)}</div>
            <div className="file-size">{sizeFormat(file.size)}</div>
            {file.type !=='dir'&&<button onClick={(e) => downloadClickHandler(e)} className='file-btn file-download'>Download</button>}
            <button onClick={(e) => deleteClickHandler(e)} className='file-btn file-delete'>Delete</button>
        </div>
    );
};

export default File;