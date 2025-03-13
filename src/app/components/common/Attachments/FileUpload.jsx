'use client';
import { useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const FileUpload = ({ onFilesChange, initialFiles }) => {
    const [files, setFiles] = useState([]);
    console.log('files upload', files)

    
    
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const updatedFiles = [...files, ...selectedFiles];
        setFiles(updatedFiles);
        if (onFilesChange) {
            onFilesChange(updatedFiles);
        }
    };

    const handleDelete = (index) => {
        setFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter((_, i) => i !== index);
            if (onFilesChange) {
                onFilesChange(updatedFiles);
            }
            return updatedFiles;
        });
    };

    return (
        <div className="w-[310px] sm:w-[350px]  md:w-[400px] relative border-2 border-dashed border-[#0000004D] rounded-lg flex flex-col items-center justify-center group p-0">
            <label className="h-10 w-full text-[12px] flex items-center justify-center text-center gap-2 cursor-pointer hover:bg-gray-100 transition rounded-lg">
                <input type="file" className="hidden" multiple accept="image/*,application/pdf" onChange={handleFileChange} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                    <path d="M6.93745 10C6.24652 10.0051 5.83076 10.0263 5.4996 10.114C3.99238 10.5131 2.96048 11.8639 3.00111 13.3847C3.01288 13.8252 3.18057 14.3696 3.51595 15.4585C4.32309 18.079 5.67958 20.3539 8.7184 20.8997C9.27699 21 9.90556 21 11.1627 21L12.8372 21C14.0943 21 14.7229 21 15.2815 20.8997C18.3203 20.3539 19.6768 18.079 20.4839 15.4585C20.8193 14.3696 20.987 13.8252 20.9988 13.3847C21.0394 11.8639 20.0075 10.5131 18.5003 10.114C18.1691 10.0263 17.7534 10.0051 17.0625 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 3L12 14M12 3C12.4683 3 12.8243 3.4381 13.5364 4.3143L14.5 5.5M12 3C11.5316 3 11.1756 3.4381 10.4635 4.3143L9.49995 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Upload Files ({files.length})</span>
            </label>

            {files.length > 0 && (
                <PhotoProvider>
                    <div className="flex flex-wrap justify-center gap-2 my-2">
                        {files.map((file, index) => {
                            const fileURL = URL.createObjectURL(file);
                            const isImage = file.type.startsWith("image/");
                            const isPDF = file.type === "application/pdf";

                            return (
                                <div key={`${file.name}-${file.lastModified}`} className="relative w-14 h-14">
                                    {isImage ? (
                                        <PhotoView src={fileURL}>
                                            <img src={fileURL} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-lg cursor-pointer" />
                                        </PhotoView>
                                    ) : isPDF ? (
                                        <a href={fileURL} target="_blank" rel="noopener noreferrer" className="block w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#4a4a4a" fill="none">
                                                    <path d="M20 13V10.6569C20 9.83935 20 9.4306 19.8478 9.06306C19.6955 8.69552 19.4065 8.40649 18.8284 7.82843L14.0919 3.09188C13.593 2.593 13.3436 2.34355 13.0345 2.19575C12.9702 2.165 12.9044 2.13772 12.8372 2.11401C12.5141 2 12.1614 2 11.4558 2C8.21082 2 6.58831 2 5.48933 2.88607C5.26731 3.06508 5.06508 3.26731 4.88607 3.48933C4 4.58831 4 6.21082 4 9.45584V13M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M19.75 16H17.25C16.6977 16 16.25 16.4477 16.25 17V19M16.25 19V22M16.25 19H19.25M4.25 22V19.5M4.25 19.5V16H6C6.9665 16 7.75 16.7835 7.75 17.75C7.75 18.7165 6.9665 19.5 6 19.5H4.25ZM10.25 16H11.75C12.8546 16 13.75 16.8954 13.75 18V20C13.75 21.1046 12.8546 22 11.75 22H10.25V16Z" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                        </a>
                                    ) : null}

                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="absolute top-1 right-1 bg-red-600 text-white p-[2px] rounded-full z-50 text-xs"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
                                            <path d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            );
                        })}

                    </div>
                </PhotoProvider>
            )}
        </div>
    );
};

export default FileUpload;
// 