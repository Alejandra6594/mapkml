import { createContext, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const MapFileContext = createContext();

export const MapFileContextProvider = (props) => {
  const { children } = props;

  const [renderMap, setRenderMap] = useState(false);
  const [validateFile, setValidateFile] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      setValidateFile([...acceptedFiles]);
      setRejectedFiles([...fileRejections]);
      
    },
    []
  );

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

  let data = {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
    handleRenderMap,
    renderMap,
    validateFile,
    rejectedFiles,
  };

  return (
    <MapFileContext.Provider value={data}>{children}</MapFileContext.Provider>
  );
};
