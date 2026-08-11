import estilos from './ResumenCierreSprint.module.css';

// Resume el estado final del Sprint y expone la accion de cierre.
function ResumenCierreSprint({ resumen, alCerrar, cargandoCierre }) {
  return (
    <section className={`tarjeta ${estilos.tarjeta}`}>
      <div className={estilos.encabezado}>
        <div>
          <p className={estilos.etiqueta}>{resumen.sprint.Estado === 'Finalizado' ? 'Sprint finalizado' : 'Cerrar Sprint'}</p>
          <h2>{resumen.sprint.Nombre}</h2>
          <p className={estilos.goal}>“{resumen.sprint.SprintGoal}”</p>
        </div>
        <span className={`insignia ${estilos.estado}`}>{resumen.sprint.Estado}</span>
      </div>

      <div className={estilos.grilla}>
        <article className={estilos.item}><strong>{resumen.historiasComprometidas}</strong><span>Historias comprometidas</span></article>
        <article className={estilos.item}><strong>{resumen.historiasTerminadas}</strong><span>Historias terminadas</span></article>
        <article className={estilos.item}><strong>{resumen.storyPointsComprometidos}</strong><span>Story Points comprometidos</span></article>
        <article className={estilos.item}><strong>{resumen.storyPointsTerminados}</strong><span>Story Points entregados</span></article>
      </div>

      <div className={estilos.validaciones}>
        <p>{resumen.reviewRegistrada ? '✓' : '•'} Review registrada</p>
        <p>{resumen.retrospectivaRegistrada ? '✓' : '•'} Retrospectiva registrada</p>
        <p>{resumen.incrementoRegistrado ? '✓' : '•'} Incremento documentado</p>
      </div>

      {resumen.sprint.Estado !== 'Finalizado' && (
        <button type="button" className="boton boton-peligro" onClick={alCerrar} disabled={cargandoCierre}>
          {cargandoCierre ? 'Cerrando...' : 'Cerrar Sprint'}
        </button>
      )}
    </section>
  );
}

export default ResumenCierreSprint;