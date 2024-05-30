import "./uploadStyles.css"

export const Upload = () => {
  return (
    <section className="container-upload">
        <header className="header-upload">
            <h1 className="title">Bienvenido a MapKml</h1>
            <p className="description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, voluptatibus dolore! Obcaecati deleniti suscipit vero nisi autem? Laboriosam numquam odio, alias a, deserunt praesentium voluptatibus aut, maxime explicabo eveniet molestiae.</p>
        </header>
        <article className="info-upload">
            <aside className="side-file-info">
                <h4>Añadir archivos KML</h4>
                <p>Solo se permite la carga de archivos KML</p>
            </aside>
            <aside className="side-add-file">
                <header>
                    <p>Tamaño máximo para archivos nuevos: ilimitado, archivos anexados:5</p>
                </header>
                <div className="container-upload-icons">
                    <div className="upload-icons">
                        <p>❤</p>
                        <p>💢</p>
                    </div>
                    <div className="upload-icons">
                        <p>💨</p>
                        <p>💫</p>
                    </div>
                </div>
                <div>
                    <input type="file" accept='.kml'></input>
                </div>
            </aside>
        </article>
        <section>
                <button>Pintar archivos</button>
            </section>
    </section>
  )
}
