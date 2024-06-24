import { useContext } from "react";
import { AcceptedFile } from "../AcceptedFile/AcceptedFile";

import { MapFileContext } from "../../context/MapFileContext";

import "./FileUploaderStyles.css";
export const FileUploader = ({ onFileLoad }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    validateFile,
    handleRenderMap,
    rejectedFiles,
  } = useContext(MapFileContext);

  return (
    <section className="container-upload">
      <article className="info-upload">
        <aside className="side-file-info">
          <h4 className="side-title">Añadir archivos KML</h4>
          <p className={`${rejectedFiles.length > 0 ? "fileRejection" : ""}`}>
            Solo se permite la carga de archivos KML
          </p>
          {rejectedFiles.length > 0 ? (
            <div className="zone-files-rejects">
              <h4 className="title-file-reject">Archivos rechazados:</h4>
              <ul className="list-files-rejects">
                {rejectedFiles.map((fileReject) => (
                  <li className="item-file-reject" key={fileReject.file.name}>
                    🔴{fileReject.file.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
        <aside className="side-add-file">
          <header className="side-add-file-header">
            <p>
              Tamaño máximo para archivos nuevos:{" "}
              <strong style={{ color: "blue" }}>ilimitado</strong>, archivos
              anexados:
              {validateFile.length > 0 ? (
                <strong style={{ color: "blue" }}>{validateFile.length}</strong>
              ) : (
                0
              )}
            </p>
          </header>
          <section className="container-upload-icons">
            <div className="upload-icons upload-icons--separate">
              <div className="box-icon box-icon--separate">
                <img src="/icons/folder.svg" alt="folder" />
              </div>
              <div className="box-icon box-icon--separate">
                <img src="/icons/DowloadFile.svg" alt="DowloadFile" />
              </div>
            </div>
            <div className="upload-icons">
              <div className="box-icon">
                <img src="/icons/Square2.svg" alt="Square2" />
              </div>
              <div className="box-icon">
                <img src="/icons/Square3.svg" alt="Square3" />
              </div>
              <div className="box-icon">
                <img src="/icons/FolderMinus.svg" alt="folder-minus" />
              </div>
            </div>
          </section>
          <section className="container-upload-file">
            <article
              {...getRootProps()}
              className={`drop-zone-upload ${isDragActive ? "is-active" : ""}`}
            >
              <input {...getInputProps()} />

              {isDragActive ? (
                <p>Suelte los archivos aqui...</p>
              ) : (
                <div className="zone-accept-file">
                  {validateFile.length > 0 ? (
                    <ul className="list-file-accepts">
                      {validateFile.map((file) => (
                        <li className="item-file-accepts" key={file.path}>
                          <AcceptedFile nameFile={file.path} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>
                      Arrastre y suelte algunos archivos aquí, o haga clic para
                      seleccionar archivos
                    </p>
                  )}
                </div>
              )}
            </article>
          </section>
        </aside>
      </article>

      <article className="info-upload info-upload--separate">
        <aside className="side-file-info"></aside>
        <aside className="side-add-file">
          <section className="container-upload-button">
            <button
              className="btn-upload"
              disabled={validateFile.length > 0 ? false : true}
              onClick={handleRenderMap}
            >
              Pintar archivos
            </button>
          </section>
        </aside>
      </article>
    </section>
  );
};
