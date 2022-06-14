import { useRef, useState } from "react";

const FilePicker = ({ startCrop }) => {
  const [icon, setIcon] = useState("ri-add-box-line");
  const hiddenFileSelect = useRef(null);

  const handleFile = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    const toCrop = new Image();
    toCrop.src = img;
    startCrop(img);
  };

  return (
    <i
      className={icon}
      onClick={() => hiddenFileSelect.current.click()}
      onMouseOver={() => setIcon("ri-add-box-fill")}
      onMouseLeave={() => setIcon("ri-add-box-line")}
    >
      <input
        ref={hiddenFileSelect}
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleFile}
        style={{ display: "none" }}
      />
    </i>
  );
};

export default FilePicker;
