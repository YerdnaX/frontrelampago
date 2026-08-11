import { useState } from 'react';
import ModalConfirmacion from './ModalConfirmacion';
import estilos from './ListaCriteriosAceptacion.module.css';

// Gestiona la lista de criterios de aceptacion de una historia (agregar, editar, eliminar).
function ListaCriteriosAceptacion({ criterios, alAgregar, alEditar, alEliminar }) {
  const [nuevoCriterio, setNuevoCriterio] = useState('');
  const [idEnEdicion, setIdEnEdicion] = useState(null);
  const [textoEdicion, setTextoEdicion] = useState('');
  const [criterioAEliminar, setCriterioAEliminar] = useState(null);

  // Envia el nuevo criterio y limpia el campo de texto.
  function manejarAgregar(evento) {
    evento.preventDefault();
    if (!nuevoCriterio.trim()) return;
    alAgregar(nuevoCriterio.trim());
    setNuevoCriterio('');
  }

  // Inicia la edicion en linea de un criterio existente.
  function iniciarEdicion(criterio) {
    setIdEnEdicion(criterio.IdCriterio);
    setTextoEdicion(criterio.Descripcion);
  }

  // Confirma la edicion en linea de un criterio.
  function confirmarEdicion(idCriterio) {
    if (textoEdicion.trim()) {
      alEditar(idCriterio, textoEdicion.trim());
    }
    setIdEnEdicion(null);
  }

  // Elimina el criterio seleccionado y cierra el dialogo de confirmacion.
  function confirmarEliminacion() {
    alEliminar(criterioAEliminar.IdCriterio);
    setCriterioAEliminar(null);
  }

  return (
    <div className={estilos.contenedor}>
      {criterios.length === 0 && <p className={estilos.vacio}>Todavía no hay criterios de aceptación para esta historia.</p>}

      <ul className={estilos.lista}>
        {criterios.map((criterio) => (
          <li key={criterio.IdCriterio} className={estilos.item}>
            <span className={estilos.marca} aria-hidden="true">✓</span>
            {idEnEdicion === criterio.IdCriterio ? (
              <input
                className="campo-entrada"
                value={textoEdicion}
                onChange={(evento) => setTextoEdicion(evento.target.value)}
                onBlur={() => confirmarEdicion(criterio.IdCriterio)}
                onKeyDown={(evento) => evento.key === 'Enter' && confirmarEdicion(criterio.IdCriterio)}
                autoFocus
                aria-label="Editar criterio de aceptación"
              />
            ) : (
              <button type="button" className={estilos.texto} onClick={() => iniciarEdicion(criterio)}>
                {criterio.Descripcion}
              </button>
            )}
            <button
              type="button"
              className="boton-icono"
              onClick={() => setCriterioAEliminar(criterio)}
              aria-label="Eliminar criterio"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {criterioAEliminar && (
        <ModalConfirmacion
          titulo="Eliminar criterio"
          mensaje={`¿Deseas eliminar el criterio "${criterioAEliminar.Descripcion}"? Esta acción no se puede deshacer.`}
          textoConfirmar="Eliminar"
          alConfirmar={confirmarEliminacion}
          alCancelar={() => setCriterioAEliminar(null)}
        />
      )}

      <form className={estilos.formulario} onSubmit={manejarAgregar}>
        <input
          className="campo-entrada"
          placeholder="Ej: El sistema muestra un mensaje de error si la contraseña es incorrecta"
          value={nuevoCriterio}
          onChange={(evento) => setNuevoCriterio(evento.target.value)}
          aria-label="Nuevo criterio de aceptación"
        />
        <button type="submit" className="boton boton-secundario">
          + Agregar criterio
        </button>
      </form>
    </div>
  );
}

export default ListaCriteriosAceptacion;
