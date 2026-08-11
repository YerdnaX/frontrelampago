import estilos from './BarraProgresoSprint.module.css';

// Muestra el porcentaje de historias terminadas dentro de un Sprint.
function BarraProgresoSprint({ historiasTerminadas, totalHistorias }) {
  const porcentaje = totalHistorias > 0 ? Math.round((historiasTerminadas / totalHistorias) * 100) : 0;

  return (
    <div className={estilos.contenedor}>
      <div className={estilos.encabezado}>
        <span>Avance del Sprint</span>
        <span className={estilos.porcentaje}>{porcentaje}%</span>
      </div>
      <div className={estilos.pista} role="progressbar" aria-valuenow={porcentaje} aria-valuemin={0} aria-valuemax={100}>
        <div className={estilos.relleno} style={{ width: `${porcentaje}%` }} />
      </div>
      <span className={estilos.detalle}>
        {historiasTerminadas} de {totalHistorias} {totalHistorias === 1 ? 'historia completada' : 'historias completadas'}
      </span>
    </div>
  );
}

export default BarraProgresoSprint;
