import estilos from './IndicadorCarga.module.css';

// Muestra un indicador de carga con un mensaje opcional.
function IndicadorCarga({ mensaje = 'Cargando...' }) {
  return (
    <div className={estilos.contenedor} role="status" aria-live="polite">
      <span className={estilos.giro} />
      <p>{mensaje}</p>
    </div>
  );
}

export default IndicadorCarga;
