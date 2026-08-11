import estilos from './ChecklistHistoria.module.css';

// Muestra y permite actualizar el checklist Definition of Done de una historia.
function ChecklistHistoria({ checklist, alCambiar, cargando, accion }) {
  if (!checklist || checklist.totalCriterios === 0) {
    return (
      <div className={estilos.vacio}>
        <h3>Todavia no se ha definido el Definition of Done</h3>
        <p>Define los criterios que todo trabajo debe cumplir antes de considerarse terminado.</p>
        {accion}
      </div>
    );
  }

  return (
    <div className={estilos.contenedor}>
      <div className={estilos.resumen}>
        <strong>{checklist.criteriosCumplidos} de {checklist.totalCriterios} criterios cumplidos</strong>
        <span>{checklist.criteriosAceptacionRegistrados} criterios de aceptacion registrados</span>
      </div>

      <div className={estilos.lista}>
        {checklist.criterios.map((criterio) => (
          <label key={criterio.IdDefinitionDone} className={estilos.item}>
            <input
              type="checkbox"
              checked={criterio.Cumplido}
              onChange={(evento) => alCambiar(criterio.IdDefinitionDone, evento.target.checked)}
              disabled={cargando}
            />
            <span>{criterio.Descripcion}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default ChecklistHistoria;