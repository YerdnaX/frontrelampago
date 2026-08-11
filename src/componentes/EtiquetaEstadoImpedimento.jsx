import estilos from './EtiquetaEstadoImpedimento.module.css';

const CONFIGURACION_ESTADO = {
  Abierto: { clase: 'abierto', simbolo: '●' },
  Gestionándose: { clase: 'gestionandose', simbolo: '◐' },
  Resuelto: { clase: 'resuelto', simbolo: '✓' },
};

// Muestra el estado de seguimiento de un impedimento con color e icono.
function EtiquetaEstadoImpedimento({ estado }) {
  const configuracion = CONFIGURACION_ESTADO[estado] || CONFIGURACION_ESTADO.Abierto;
  return (
    <span className={`insignia ${estilos[configuracion.clase]}`}>
      <span aria-hidden="true">{configuracion.simbolo}</span>
      {estado}
    </span>
  );
}

export default EtiquetaEstadoImpedimento;
