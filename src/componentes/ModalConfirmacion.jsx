import estilos from './ModalConfirmacion.module.css';

// Muestra un dialogo de confirmacion antes de ejecutar una accion sensible.
function ModalConfirmacion({ titulo, mensaje, textoConfirmar = 'Confirmar', alConfirmar, alCancelar }) {
  return (
    <div className={estilos.fondo} role="dialog" aria-modal="true" aria-label={titulo}>
      <div className={estilos.caja}>
        <h3>{titulo}</h3>
        <p>{mensaje}</p>
        <div className={estilos.acciones}>
          <button type="button" className="boton boton-fantasma" onClick={alCancelar}>
            Cancelar
          </button>
          <button type="button" className="boton boton-peligro" onClick={alConfirmar}>
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacion;
