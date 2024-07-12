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
        <h3>Actualizar la descripcion cuando se termine el proyecto</h3>
        <p className="description">
          Este proyecto es una aplicación web desarrollada con React que permite
          a los usuarios cargar archivos KML (Keyhole Markup Language),
          visualizar su contenido geoespacial en un mapa interactivo y exportar
          los datos geoespaciales a un script SQL para posteriormente ser guardados en una base de datos. Utiliza react-dropzone para
          crear una zona drag & drop, Leaflet para la visualización de mapas, React Leaflet para abstraer las capas de Leaflet como componentes de React y la dependencia togeojson para representar elementos graficos sencillos en formato basado en JavaScript Objetc Notation.
        </p>
      </header>
      <main className="main-content">
        {renderMap ? <KmlMap /> : <FileUploader />}
      </main>
    </section>
  );
}

export default App;
