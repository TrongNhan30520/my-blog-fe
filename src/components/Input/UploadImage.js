import React, { useState, useRef } from "react";
import ArrowUpTrayIcon from "@heroicons/react/24/outline/ArrowUpTrayIcon";

const UploadImage = ({ className, initialImage, onChange, title }) => {
  const [image, setImage] = useState(
    initialImage ? process.env.REACT_APP_BASE_URL + initialImage : ""
  );
  const inputRef = useRef();
  return (
    <div
      className={`${className} flex justify-center border-dashed border-2 border-gray-300 rounded-xl cursor-pointer`}
      onClick={(e) => {
        inputRef.current.click();
      }}
    >
      <input
        className="hidden"
        ref={inputRef}
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          setImage(window.URL.createObjectURL(file));
          onChange(file);
        }}
      />
      {image ? (
        <img className="w-full rounded-xl" src={image} alt="" />
      ) : (
        <div className="flex flex-col items-center justify-center opacity-50">
          <ArrowUpTrayIcon className="w-1/4 " />
          <p>{title} </p>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
