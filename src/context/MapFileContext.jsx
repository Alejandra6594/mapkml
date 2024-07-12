import { createContext, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getLongitudeAndLatitudeAprox, createDataBase,  changeContexDataBase, createTable, dataUnics} from "../helpers/dataSql";

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

  const handleExportDataSQL = (dataToExport) => {
    let insertDataTable = "";
    for (const element of dataToExport) {
      let nameFile = element.features[0].properties.name;
      let typeFile = element.features[0].geometry.type;
      let longitudeAndLatitudeAprox = getLongitudeAndLatitudeAprox(element);
      let longitudeAprox = longitudeAndLatitudeAprox[0];
      let latitudeAprox = longitudeAndLatitudeAprox[1];
      let coordinates = JSON.stringify(
        element.features[0].geometry.coordinates
      );
      //FORMACION DE CADENA PARA LA INSERCIÓN DE DATOS EN LA TABLA GEODATA
      insertDataTable += `INSERT INTO geodata (nameFile, typeFile,longitudeAprox,latitudeAprox, coordinates) VALUES ('${nameFile}','${typeFile}','${longitudeAprox}', '${latitudeAprox}' ,'${coordinates}');\n`;
    }

    let sqlScript = `
    ${createDataBase}\n
    ${changeContexDataBase}\n
    ${createTable}\n
    ${dataUnics}\n
    ${insertDataTable}

  `;

    const blob = new Blob([sqlScript], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "exported_geodata.sql");
  };

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
