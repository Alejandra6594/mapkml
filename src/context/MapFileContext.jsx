import { createContext, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const MapFileContext = createContext();

export const MapFileContextProvider = (props) => {
  const { children } = props;

  const [renderMap, setRenderMap] = useState(false);
  const [validateFile, setValidateFile] = useState([]);
  const [copyAcceptedFiles, setCopyAcceptedFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(`Archivos aceptados:}` + acceptedFiles);
      setValidateFile([...acceptedFiles]);
      setCopyAcceptedFiles([...acceptedFiles]);
      // console.log(`Copia` + copyAcceptedFiles);
      // acceptedFiles.forEach((file) => {
      //   const reader = new FileReader();
      //   reader.onload = () => {
      //     const text = reader.result;
      //     onFileLoad(text);
      //   };
      //   reader.readAsText(file);
      // });
    },
    // [onFileLoad]
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
    setCopyAcceptedFiles([]);
  };
  let data = {
    getRootProps,
    getInputProps,
    isDragActive,
    copyAcceptedFiles,
    fileRejections,
    handleRenderMap,
    renderMap,
    validateFile,
  };
  return (
    <MapFileContext.Provider value={data}>{children}</MapFileContext.Provider>
  );
};
