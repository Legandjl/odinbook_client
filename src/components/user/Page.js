import React, { useContext } from "react";

import "./page.css";

import FilePicker from "../filepicker/FilePicker";
import { FileContext } from "../../context/FileContext";
import CropTool from "../uploader/CropTool";

const Page = () => {
  const { isCropping, imageSrc } = useContext(FileContext);

  return (
    <div className="userPage">
      <FilePicker />
      {isCropping && (
        <div>
          <CropTool image={imageSrc} />
        </div>
      )}{" "}
      <div className="profileHeader"></div>
      <div className="sideBar"></div>
      <div className="currentView"></div>
    </div>
  );
};

export default Page;
