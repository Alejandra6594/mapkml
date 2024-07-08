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

  const handleExportDataSQL = (dataToExport) => {
    console.log(dataToExport);
    for (const iterator of dataToExport) {
      console.log(iterator.features[0].geometry);
      console.log(iterator.features[0].properties);
    }
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
