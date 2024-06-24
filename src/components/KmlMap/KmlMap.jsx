import { useContext } from "react";
import { MapFileContext } from "../../context/MapFileContext";
import "./stylesKmlMaps.css";

export const KmlMap = () => {
  const { handleRenderMap, validateFile } = useContext(MapFileContext);
  console.log("validate copy" + validateFile);
  return (
    <section>
      <button className="btn-newFiles" onClick={handleRenderMap}>
        👈🏻Pintar nuevos archivos
      </button>
      <h2>Renderizado de archivos en el mapa</h2>

      <ul>
        {validateFile.map((file) => (
          <li key={file.path}>{file.path}</li>
        ))}
      </ul>
    </section>
  );
};
