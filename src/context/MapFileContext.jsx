import { createContext, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const MapFileContext = createContext();

export const MapFileContextProvider = (props) => {
  const { children } = props;

  const [renderMap, setRenderMap] = useState(false);
  const [validateFile, setValidateFile] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    setValidateFile([...acceptedFiles]);
    setRejectedFiles([...fileRejections]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "application/vnd.google-earth": [".kml"],
      },
    });

  const handleRenderMap = () => {
    setRenderMap(!renderMap);
    if (renderMap) {
      setValidateFile([]);
    }
    setRejectedFiles([]);
  };
  
  const handleExportDataSQL = (geojsonData) => {
    
    let createDbTable= `
    -- Seleccionar la base de datos GeoKml (crear si no existe)
      CREATE DATABASE IF NOT EXISTS GeoKml;
      USE GeoKml;

    -- Crear la tabla geodata (si no existe)
      CREATE TABLE IF NOT EXISTS geodata (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(200)  NOT NULL, 
      type VARCHAR(50) NOT NULL,
      coordinates TEXT NOT NULL,
    );`
    let insertDataTable = '';
    geojsonData.forEach((geoJson) => {
      geoJson.features.forEach((feature) => {
        const coordinates = JSON.stringify(feature.geometry.coordinates);
        insertDataTable += `INSERT INTO geodata (name, type, coordinates) VALUES ('${feature.properties.name}','${feature.geometry.type}', '${coordinates}');\n
        WHERE NOT EXISTS (
        SELECT 1 FROM geodata WHERE data = 'nuevo_registro'
        );
        `; 

      });
    });
    
    let sqlScript = `
      ${createDbTable}\n
      ${insertDataTable}
    `
    

    const blob = new Blob([sqlScript], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'exported_geodata.sql');
  };
  // const handleExportDataSQL = (dataToExport) => {
  //   // console.log(dataToExport);
  //   for (const iterator of dataToExport) {
      
  //     console.log(iterator.features[0].geometry.type);
  //     let myType=iterator.features[0].geometry.type
  //     console.log ("name")
  //     console.log(iterator.features[0].properties.name);
  //     // ==========Acceso a datos de punto=======//
  //    if (myType=="Point") {
  //     console.log(iterator.features[0].geometry.coordinates[0]);
  //     console.log(iterator.features[0].geometry.coordinates[1]);
  //    }
  //     //==========================================================//
  //     // ==========Acceso a datos LineString=======//
  //     if (myType=="LineString") {
  //       console.log(iterator.features[0].geometry.coordinates[0][0]);
  //     console.log(iterator.features[0].geometry.coordinates[0][1]);
  //     }
  //     //==========================================================//
  //     // ==========Acceso a datos de poligonos=======//
  //     if (myType=="Polygon") {
  //       console.log(iterator.features[0].geometry.coordinates[0][1][0]);
  //     console.log(iterator.features[0].geometry.coordinates[0][1][1]);
  //     }
  //     //==========================================================//
      
      
  //   }
  // };

  let data = {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
    handleRenderMap,
    renderMap,
    validateFile,
    rejectedFiles,
    handleExportDataSQL,
  };

  return (
    <MapFileContext.Provider value={data}>{children}</MapFileContext.Provider>
  );
};
