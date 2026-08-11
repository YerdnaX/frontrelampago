import estilos from './EtiquetaPrioridad.module.css';

const CONFIGURACION_PRIORIDAD = {
  Alta: { clase: 'alta', simbolo: '▲' },
  Media: { clase: 'media', simbolo: '●' },
  Baja: { clase: 'baja', simbolo: '▼' },
};

// Muestra la prioridad de una historia con icono, color y texto.
function EtiquetaPrioridad({ prioridad }) {
  const configuracion = CONFIGURACION_PRIORIDAD[prioridad] || CONFIGURACION_PRIORIDAD.Media;
  return (
    <span className={`insignia ${estilos[configuracion.clase]}`}>
      <span aria-hidden="true">{configuracion.simbolo}</span>
      Prioridad {prioridad}
    </span>
  );
}

export default EtiquetaPrioridad;
