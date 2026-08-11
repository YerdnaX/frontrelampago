import { Link } from 'react-router-dom';
import estilos from './TarjetaSprint.module.css';

const CLASE_POR_ESTADO = { Planificado: 'planificado', Activo: 'activo', Finalizado: 'finalizado' };

// Formatea una fecha ISO como texto corto legible.
function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString('es-CR', { day: '2-digit', month: 'short' });
}

// Muestra el resumen de un Sprint dentro de la lista de Sprints del proyecto.
function TarjetaSprint({ idProyecto, sprint }) {
  return (
    <Link to={`/proyectos/${idProyecto}/sprints/${sprint.IdSprint}`} className={`tarjeta ${estilos.tarjeta}`}>
      <div className={estilos.encabezado}>
        <h3>{sprint.Nombre}</h3>
        <span className={`insignia ${estilos[CLASE_POR_ESTADO[sprint.Estado] || 'planificado']}`}>{sprint.Estado}</span>
      </div>
      <p className={estilos.goal}>“{sprint.SprintGoal}”</p>
      <div className={estilos.meta}>
        <span>📅 {formatearFecha(sprint.FechaInicio)} — {formatearFecha(sprint.FechaFin)}</span>
        <span>🧩 {sprint.TotalHistorias ?? 0} historias</span>
        <span>⚡ {sprint.StoryPointsComprometidos ?? 0} pts</span>
      </div>
    </Link>
  );
}

export default TarjetaSprint;
