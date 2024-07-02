import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { kml } from "@tmcw/togeojson";
import { saveAs } from "file-saver";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from "react";
import { MapFileContext } from "../../context/MapFileContext";
import "./stylesKmlMaps.css";

export const KmlMap = () => {
  const { handleRenderMap, validateFile } = useContext(MapFileContext);
  const [geojsonData, setGeojsonData] = useState([]);
  const newGeojsonData = [];
  useEffect(() => {
    if (validateFile.length > 0) {
      console.log(validateFile);
      validateFile.forEach((kmlFile) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const parser = new DOMParser();
          const kmlDoc = parser.parseFromString(
            e.target.result,
            "application/xml"
          );
          const geoJson = kml(kmlDoc);
          console.log(geoJson);
          newGeojsonData.push(geoJson);
          if (newGeojsonData.length === validateFile.length) {
            setGeojsonData(newGeojsonData);
          }
        };
        // reader.readAsText(files[i]);
        reader.readAsText(kmlFile);
      });
    }

    // return () => { checar
    //   second
    // }
  }, []);

  return (
    <section>
      <header className="header-kmlMap">
        <h2 className="title-kmlMap">🗺️Archivos renderizados en el mapa</h2>
      </header>

      <ul className="list-files-draw">
        {validateFile.map((file) => (
          <li className="item-files-draw" key={file.path}>
            🔵{file.path}
          </li>
        ))}
      </ul>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "30rem", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geojsonData.map((geoJson, index) => (
          <GeoJSON key={index} data={geoJson} />
        ))}
      </MapContainer>

      <div className="container-buttons-kmlMaps">
        <button className="btn-newFiles" onClick={handleRenderMap}>
          👈🏻Pintar nuevos archivos
        </button>
        <button
          className="btn-newFiles btn-newFile--query"
          onClick={handleRenderMap}
        >
          📇Exportar query
        </button>
      </div>
    </section>
  );
};
