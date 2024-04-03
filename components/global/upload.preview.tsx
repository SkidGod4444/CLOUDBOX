import React from 'react';
import { MdOutlineUploadFile, MdOutlineCancel } from "react-icons/md";

interface UploadPreviewProps {
    file: File;
}

export default function UploadPreview({ file, removeFile }: UploadPreviewProps & { removeFile: (file: File) => void }) {
    // Function to truncate the file name if it exceeds 15 characters
    const truncateFileName = (name: string, maxLength: number) => {
        return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
    };

    return (
        <div className='flex items-center gap-2 justify-between mt-5 border-2 rounded-md p-2 border-muted'>
            <div className='flex items-center gap-2'>
                <MdOutlineUploadFile className='h-10 w-10 text-primary'/>
                <div className='text-left'>
                    <h2>
                        {truncateFileName(file.name, 15)}
                    </h2>
                    <h2 className='text-[13px] text-gray-500'>
                       {(file.size/(1024 * 1024)).toFixed(2)} MB
                    </h2>
                </div>
            </div>
            <MdOutlineCancel className='ml-5 w-5 h-5 text-red-500 cursor-pointer' onClick={() => removeFile(file)}/>
        </div>
    );
}
