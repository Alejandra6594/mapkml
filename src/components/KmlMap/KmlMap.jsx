import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Popup,
  Tooltip,
} from "react-leaflet";
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
    if (validateFile.length < 0) return;

    const readers = [];
    let isMounted = true;

    validateFile.forEach((kmlFile) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isMounted) {
          const parser = new DOMParser();
          const kmlDoc = parser.parseFromString(
            e.target.result,
            "application/xml"
          );
          const geoJson = kml(kmlDoc);
          newGeojsonData.push(geoJson);
          if (newGeojsonData.length === validateFile.length) {
            setGeojsonData(newGeojsonData);
          }
        }
      };

      reader.onerror = (error) => {
        if (isMounted) {
          console.error("Error reading file:", error);
        }
      };

      readers.push(reader);
      reader.readAsText(kmlFile);
    });

    return () => {
      isMounted = false;
      readers.forEach((reader) => reader.abort());
      console.log("All readers aborted and cleaned up");
    };
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
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geojsonData.map((geoJson, index) => (
          <GeoJSON key={index} data={geoJson}>
            <Tooltip direction="bottom" offset={[0, 10]} opacity={1} permanent>
              {geoJson.features[0].properties.name}
            </Tooltip>
          </GeoJSON>
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
