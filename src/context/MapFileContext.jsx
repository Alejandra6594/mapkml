import { createContext, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const MapFileContext = createContext();

export const MapFileContextProvider = (props) => {
  const { children } = props;

  const [renderMap, setRenderMap] = useState(false);
  const [validateFile, setValidateFile] = useState([]);
  const [copyAcceptedFiles, setCopyAcceptedFiles] = useState([]);
  const [copiFileRejections, setCopiFileRejections] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      console.log(`Archivos aceptados:}` + acceptedFiles);
      setValidateFile([...acceptedFiles]);
      setCopyAcceptedFiles([...acceptedFiles]);
      setCopiFileRejections([...fileRejections])
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
    setCopiFileRejections([]);
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
    copiFileRejections,
  };
  return (
    <MapFileContext.Provider value={data}>{children}</MapFileContext.Provider>
  );
};
