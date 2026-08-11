import { useState } from 'react';
import estilos from './ListaDefinitionDone.module.css';

// Renderiza y permite editar la lista de criterios Definition of Done.
function ListaDefinitionDone({ criterios, alCrear, alActualizar, alEliminar }) {
  const [nuevoCriterio, setNuevoCriterio] = useState('');
  const [idEditando, setIdEditando] = useState(null);
  const [textoEdicion, setTextoEdicion] = useState('');

  // Crea un nuevo criterio a partir del formulario inferior.
  async function manejarCrear(evento) {
    evento.preventDefault();
    if (!nuevoCriterio.trim()) return;
    await alCrear(nuevoCriterio.trim());
    setNuevoCriterio('');
  }

  // Activa la edicion en linea de un criterio existente.
  function comenzarEdicion(criterio) {
    setIdEditando(criterio.IdDefinitionDone);
    setTextoEdicion(criterio.Descripcion);
  }

  // Guarda la descripcion editada del criterio actual.
  async function manejarGuardarEdicion(idDefinitionDone) {
    if (!textoEdicion.trim()) return;
    await alActualizar(idDefinitionDone, textoEdicion.trim());
    setIdEditando(null);
    setTextoEdicion('');
  }

  return (
    <div className={estilos.contenedor}>
      <div className={estilos.lista}>
        {criterios.map((criterio) => (
          <article key={criterio.IdDefinitionDone} className={estilos.item}>
            <div className={estilos.icono} aria-hidden="true">✓</div>
            {idEditando === criterio.IdDefinitionDone ? (
              <div className={estilos.edicion}>
                <input
                  className="campo-entrada"
                  value={textoEdicion}
                  onChange={(evento) => setTextoEdicion(evento.target.value)}
                  aria-label="Editar criterio Definition of Done"
                />
                <div className={estilos.accionesEdicion}>
                  <button type="button" className="boton boton-primario boton-pequeno" onClick={() => manejarGuardarEdicion(criterio.IdDefinitionDone)}>
                    Guardar
                  </button>
                  <button type="button" className="boton boton-fantasma boton-pequeno" onClick={() => setIdEditando(null)}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className={estilos.descripcion}>{criterio.Descripcion}</p>
                <div className={estilos.acciones}>
                  <button type="button" className="boton boton-fantasma boton-pequeno" onClick={() => comenzarEdicion(criterio)}>
                    Editar
                  </button>
                  <button type="button" className="boton boton-fantasma boton-pequeno" onClick={() => alEliminar(criterio.IdDefinitionDone)}>
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </article>
        ))}
      </div>

      <form className={estilos.formulario} onSubmit={manejarCrear}>
        <input
          className="campo-entrada"
          placeholder="Ej: Pruebas funcionales completadas"
          value={nuevoCriterio}
          onChange={(evento) => setNuevoCriterio(evento.target.value)}
          aria-label="Nuevo criterio Definition of Done"
        />
        <button type="submit" className="boton boton-primario">
          + Agregar criterio
        </button>
      </form>
    </div>
  );
}

export default ListaDefinitionDone;