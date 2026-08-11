import estilos from './EstadoVacio.module.css';

// Muestra un estado vacio con titulo, descripcion y una accion opcional.
function EstadoVacio({ icono = '✨', titulo, descripcion, accion }) {
  return (
    <div className={estilos.contenedor}>
      <div className={estilos.icono} aria-hidden="true">{icono}</div>
      <h3>{titulo}</h3>
      {descripcion && <p>{descripcion}</p>}
      {accion && <div className={estilos.accion}>{accion}</div>}
    </div>
  );
}

export default EstadoVacio;
