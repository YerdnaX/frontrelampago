import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as sprintsServicio from '../servicios/sprintsServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import IndicadorCarga from '../componentes/IndicadorCarga';
import SprintGoalDestacado from '../componentes/SprintGoalDestacado';
import BarraProgresoSprint from '../componentes/BarraProgresoSprint';
import { ESTADOS_SPRINT } from '../constantes/constantes';
import estilos from './SprintDetallePagina.module.css';

// Pantalla resumen de un Sprint: Sprint Goal, indicadores y accesos rápidos (HU-052).
function SprintDetallePagina() {
  const { id: idProyecto, idSprint } = useParams();
  const [sprint, setSprint] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');
  const [cambiandoEstado, setCambiandoEstado] = useState(false);

  useEffect(() => {
    cargarSprint();
  }, [idSprint]);

  // Carga el Sprint junto con su resumen de avance.
  async function cargarSprint() {
    setCargando(true);
    setMensajeError('');
    try {
      setSprint(await sprintsServicio.obtenerSprintPorId(idSprint));
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  // Guarda el nuevo Sprint Goal manteniendo el resto de los datos del Sprint.
  async function manejarGuardarGoal(nuevoGoal) {
    const actualizado = await sprintsServicio.actualizarSprint(idSprint, {
      nombre: sprint.Nombre,
      sprintGoal: nuevoGoal,
      fechaInicio: sprint.FechaInicio,
      fechaFin: sprint.FechaFin,
      estado: sprint.Estado,
    });
    setSprint((anterior) => ({ ...anterior, ...actualizado }));
  }

  // Cambia el estado del Sprint (Planificado, Activo, Finalizado).
  async function manejarCambiarEstado(nuevoEstado) {
    setCambiandoEstado(true);
    setMensajeError('');
    try {
      const actualizado = await sprintsServicio.actualizarSprint(idSprint, {
        nombre: sprint.Nombre,
        sprintGoal: sprint.SprintGoal,
        fechaInicio: sprint.FechaInicio,
        fechaFin: sprint.FechaFin,
        estado: nuevoEstado,
      });
      setSprint((anterior) => ({ ...anterior, ...actualizado }));
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCambiandoEstado(false);
    }
  }

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando Sprint..." />;
  }

  if (!sprint) {
    return (
      <div className="contenedor-pagina">
        <p className="campo-error">{mensajeError || 'El Sprint no existe.'}</p>
      </div>
    );
  }

  return (
    <div className="contenedor-pagina">
      <Link to={`/proyectos/${idProyecto}/sprints`} className={estilos.volver}>← Volver a Sprints</Link>

      {mensajeError && <p className="campo-error" style={{ marginBottom: 'var(--espacio-4)' }}>{mensajeError}</p>}

      <SprintGoalDestacado sprint={sprint} alGuardarGoal={manejarGuardarGoal} />

      <div className={estilos.filaEstado}>
        <span className={estilos.etiquetaEstado}>Estado del Sprint</span>
        <div className={estilos.opcionesEstado} role="radiogroup" aria-label="Estado del Sprint">
          {Object.values(ESTADOS_SPRINT).filter((estado) => estado !== 'Finalizado').map((estado) => (
            <button
              key={estado}
              type="button"
              role="radio"
              aria-checked={sprint.Estado === estado}
              className={`${estilos.opcionEstado} ${sprint.Estado === estado ? estilos.opcionEstadoActiva : ''}`}
              disabled={cambiandoEstado}
              onClick={() => manejarCambiarEstado(estado)}
            >
              {estado}
            </button>
          ))}
          {sprint.Estado === 'Finalizado' && <span className={estilos.estadoFinal}>Finalizado</span>}
        </div>
      </div>

      <div className={estilos.grillaIndicadores}>
        <div className={`tarjeta ${estilos.indicador}`}>
          <span className={estilos.numero}>{sprint.storyPointsComprometidos}</span>
          <span className={estilos.etiqueta}>Story Points</span>
        </div>
        <div className={`tarjeta ${estilos.indicador}`}>
          <span className={estilos.numero}>{sprint.totalHistorias}</span>
          <span className={estilos.etiqueta}>Historias</span>
        </div>
        <div className={`tarjeta ${estilos.indicador}`}>
          <span className={estilos.numero}>{sprint.historiasTerminadas}</span>
          <span className={estilos.etiqueta}>Completadas</span>
        </div>
      </div>

      {sprint.totalHistorias > 0 && (
        <div className={`tarjeta ${estilos.tarjetaProgreso}`}>
          <BarraProgresoSprint historiasTerminadas={sprint.historiasTerminadas} totalHistorias={sprint.totalHistorias} />
        </div>
      )}

      {sprint.totalHistorias === 0 ? (
        <div className={`tarjeta ${estilos.vacio}`}>
          <h3>Este Sprint todavía no contiene historias</h3>
          <p>Selecciona historias desde el Product Backlog para conformar el Sprint Backlog.</p>
          <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}/planificacion`} className="boton boton-primario">
            Planificar Sprint
          </Link>
        </div>
      ) : (
        <div className={estilos.accesos}>
          <Link to={`/proyectos/${idProyecto}/definition-done`} className="boton boton-secundario">
            ✓ Definition of Done
          </Link>
          <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}/planificacion`} className="boton boton-secundario">
            📋 Sprint Planning
          </Link>
          <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}/tablero`} className="boton boton-primario">
            🗂 Abrir tablero
          </Link>
          <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}/incremento`} className="boton boton-secundario">
            📦 Incremento
          </Link>
          <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}/review`} className="boton boton-secundario">
            👀 Review
          </Link>
          <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}/retrospectiva`} className="boton boton-secundario">
            🪴 Retrospectiva
          </Link>
          <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}/cierre`} className="boton boton-secundario">
            🏁 Cierre e indicador
          </Link>
          <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}/daily`} className="boton boton-secundario">
            🗣 Daily Scrum
          </Link>
          <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}/impedimentos`} className="boton boton-secundario">
            🚧 Impedimentos
          </Link>
        </div>
      )}
    </div>
  );
}

export default SprintDetallePagina;
