const ImagePreview = ({ type, url, id, name, isFallback, foo }) => {
  return (
    <div className="imageWrap">
      <img style={{ width: "200px", height: "200px" }} src={url} />
    </div>
  );
};

export default ImagePreview;
