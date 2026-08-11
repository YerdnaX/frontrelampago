import estilos from './IndicadorCumplimiento.module.css';

// Presenta el porcentaje real de cumplimiento del Sprint.
function IndicadorCumplimiento({ cumplimiento, titulo = 'Cumplimiento del Sprint' }) {
  return (
    <section className={`tarjeta ${estilos.tarjeta}`}>
      <p className={estilos.titulo}>{titulo}</p>
      <div className={estilos.porcentaje}>{cumplimiento.porcentaje}%</div>
      <div className={estilos.barra} aria-hidden="true">
        <div className={estilos.relleno} style={{ width: `${cumplimiento.porcentaje}%` }} />
      </div>
      <div className={estilos.resumen}>
        <span>{cumplimiento.historiasTerminadas} de {cumplimiento.historiasComprometidas} historias completadas</span>
        <span>{cumplimiento.storyPointsTerminados} / {cumplimiento.storyPointsComprometidos} Story Points entregados</span>
      </div>
    </section>
  );
}

export default IndicadorCumplimiento;