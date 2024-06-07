import { createContext, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const MapFileContext = createContext();

export const MapFileContextProvider = (props) => {
  const { children } = props;

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(`Archivos aceptados:}` + acceptedFiles);

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
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.google-earth": [".kml"],
    },
  });

  let data = {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  };
  return (
    <MapFileContext.Provider value={data}>{children}</MapFileContext.Provider>
  );
};
