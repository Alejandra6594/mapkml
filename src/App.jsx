import { useContext } from "react";
import { FileUploader } from "./components/FileUploader/FileUploader";
import { KmlMap } from "./components/KmlMap/KmlMap";
import { MapFileContext } from "./context/MapFileContext";

import "./App.css";
function App() {
  const { renderMap } = useContext(MapFileContext);
  return (
    <section>
      <header className="header-section-app">
        <h1 className="title">Bienvenido a MapKml🗺️</h1>
        <p className="description">
          Este proyecto es una aplicación web desarrollada con React que permite
          a los usuarios cargar archivos KML (Keyhole Markup Language),
          visualizar su contenido geoespacial en un mapa interactivo y exportar
          los datos geoespaciales a un script SQL. Utiliza react-dropzone para
          crear una zona drag & drop, Leaflet para la visualización de mapas y
          la biblioteca leaflet-kml para manejar y renderizar archivos KML en el
          mapa.
        </p>
      </header>
      <main className="main-content">
        {renderMap ? <KmlMap /> : <FileUploader />}
      </main>
    </section>
  );
}

export default App;
