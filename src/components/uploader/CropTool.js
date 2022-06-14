import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { useNavigate } from "react-router";

import "./Cropper.css";
import "./Style.css";

const CropTool = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropFinal, setCropFinal] = useState(false);
  const [currentCrop, setCurrentCrop] = useState({});
  const [attemptingUpload, setAttemptingUpload] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    const uploadFile = async () => {
      console.log("starting upload");
      setAttemptingUpload(true);
      const ref = await props.loadImage(currentCrop, props.image);
      setAttemptingUpload(false);
      setCropFinal(false);
      console.log("upload completed");
      props.toggleCrop();
      nav(`/home`, { replace: true });
    };
    if (cropFinal && !attemptingUpload) {
      uploadFile();
    }
  }, [attemptingUpload, cropFinal, currentCrop, nav, props]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCurrentCrop(croppedAreaPixels);
  }, []);

  return (
    <div className={"backgroundCover"}>
      <div className={"cropContainer"}>
        <div className={"cropContainerHeader"}>
          <i
            style={{ color: "white" }}
            className="ri-close-line"
            onClick={props.toggleCrop}
          ></i>
        </div>{" "}
        <div className={"cropContainerInner"}>
          <Cropper
            image={props.image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            objectFit="horizontal-cover"
            disableAutomaticStylesInjection={true}
            showGrid={false}
          />
        </div>
        <div className="cropContainerFooter">
          <i
            style={{
              fontSize: "1.6em",
              justifySelf: "end",
              alignSelf: "center",
              marginRight: 6,
              color: cropFinal ? "#E0E0E2" : "white",
            }}
            className="ri-arrow-right-circle-fill"
            onClick={() => {
              if (cropFinal) {
                return;
              }
              setCropFinal(true);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default CropTool;
