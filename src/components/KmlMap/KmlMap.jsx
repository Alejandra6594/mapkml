import { useContext } from "react";
import { MapFileContext } from "../../context/MapFileContext";

export const KmlMap = () => {
  const { acceptedFiles, handleRenderMap } = useContext(MapFileContext);
  return (
    <section>
      <button onClick={handleRenderMap}>Pintar nuevos archivos</button>
      <h2>Renderizado de archivos en el mapa</h2>
      <ul>
        {acceptedFiles.map((file) => (
          <li key={file.path}>{file.path}</li>
        ))}
      </ul>
    </section>
  );
};
