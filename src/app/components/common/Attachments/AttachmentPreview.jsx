import React, { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Image from "next/image";
import { Download, EllipsisVertical, Trash2 } from "lucide-react";

const AttachmentPreview = ({ files }) => {
  const [hovered, setHovered] = useState(false);

  const [fileURLs, setFileURLs] = useState([]);
  // console.log('fileURLs :::', fileURLs)
  useEffect(() => {
    if (files?.length > 0) {
      const urls = files.map((file) => {
        if (file instanceof File) {
          return URL.createObjectURL(file);
        } else if (typeof file === "string") {
          return file; // Assume it's already a URL
        }
        return null;
      });

      setFileURLs(urls);

      // Cleanup
      return () => {
        urls.forEach((url) => {
          if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
        });
      };
    }
  }, [files]);

  return (
    <>
      {fileURLs.length > 0 && (
        <PhotoProvider>
          <div className="flex flex-wrap justify-center gap-2 my-2">
            {fileURLs.map((fileURL, index) => {
              if (!fileURL) return null;

              const isImage = fileURL.match(/\.(jpeg|jpg|png|gif|webp)$/i);
              const isPDF = fileURL.endsWith(".pdf");

              return (
                <div key={index} className="relative w-14 h-14">
                  {isImage ? (
                    <PhotoView src={fileURL}>
                      <img
                        src={fileURL}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg cursor-pointer"
                      />
                    </PhotoView>
                  ) : isPDF ? (
                    <>
                      <div className="border-2 rounded-md border-gray-300 p-[5px] w-[85px] h-[90px]">
                        <div className=" flex justify-between">
                          <img src='/pdf.png' alt=""

                            className=" w-[40px] bg-gray-50  rounded-sm" />
                          <EllipsisVertical className="cursor-pointer" onClick={() => setHovered(!hovered)} />
                        </div>
                        <p className="text-[12px]">Prepaid</p>
                        <span className="text-[12px] text-gray-500">12.6 MB</span>
                      </div>

                      {hovered &&
                        <div className="absolute -bottom-6 right-2 bg-white shadow-lg rounded-lg p-2 flex gap-2">
                          <button className="p-2 hover:text-blue-500">
                            <Download size={18} />
                          </button>
                          <button className="p-2 hover:text-red-500">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      }
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </PhotoProvider>
      )}
    </>
  );
};

export default AttachmentPreview;
