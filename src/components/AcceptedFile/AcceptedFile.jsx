import "./AcceptedFileStyles.css";
export const AcceptedFile = (props) => {
  const { nameFile } = props;
  return (
    <div className="container-accep-file">
      <img
        className="img-file"
        src="/images/img-kml-file.png"
        alt="image file kml"
      />
      <p className="name-file">{nameFile}</p>
    </div>
  );
};
