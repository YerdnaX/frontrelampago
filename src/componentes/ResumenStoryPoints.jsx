import estilos from './ResumenStoryPoints.module.css';

// Barra fija que muestra el total de historias y Story Points seleccionados
// durante Sprint Planning, y confirma la creacion del Sprint Backlog.
function ResumenStoryPoints({ totalHistorias, totalStoryPoints, alConfirmar, enviando, deshabilitado }) {
  return (
    <div className={estilos.barra}>
      <div className={estilos.resumen}>
        <div className={estilos.dato}>
          <span className={estilos.numero}>{totalHistorias}</span>
          <span className={estilos.etiqueta}>{totalHistorias === 1 ? 'historia' : 'historias'} seleccionadas</span>
        </div>
        <div className={estilos.dato}>
          <span className={estilos.numero}>{totalStoryPoints}</span>
          <span className={estilos.etiqueta}>Story Points comprometidos</span>
        </div>
      </div>
      <button type="button" className="boton boton-primario" onClick={alConfirmar} disabled={deshabilitado || enviando}>
        {enviando ? 'Guardando...' : 'Crear Sprint Backlog'}
      </button>
    </div>
  );
}

export default ResumenStoryPoints;
