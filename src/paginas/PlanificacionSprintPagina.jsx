import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as sprintsServicio from '../servicios/sprintsServicio';
import * as historiasServicio from '../servicios/historiasServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import IndicadorCarga from '../componentes/IndicadorCarga';
import EstadoVacio from '../componentes/EstadoVacio';
import SprintGoalDestacado from '../componentes/SprintGoalDestacado';
import FilaHistoriaPlanificacion from '../componentes/FilaHistoriaPlanificacion';
import ResumenStoryPoints from '../componentes/ResumenStoryPoints';
import estilos from './PlanificacionSprintPagina.module.css';

// Pantalla de Sprint Planning: visualiza el Product Backlog priorizado y permite
// a los Developers seleccionar las historias que comprometen en el Sprint (HU-056/058/059/061).
function PlanificacionSprintPagina() {
  const { id: idProyecto, idSprint } = useParams();
  const navegar = useNavigate();

  const [sprint, setSprint] = useState(null);
  const [historias, setHistorias] = useState([]);
  const [seleccionIds, setSeleccionIds] = useState(new Set());
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, [idSprint]);

  // Carga el Sprint, el Product Backlog completo y la seleccion actual del Sprint Backlog.
  async function cargarDatos() {
    setCargando(true);
    setMensajeError('');
    try {
      const [datosSprint, backlogCompleto, sprintBacklog] = await Promise.all([
        sprintsServicio.obtenerSprintPorId(idSprint),
        historiasServicio.obtenerHistoriasDelProyecto(idProyecto),
        sprintsServicio.obtenerSprintBacklog(idSprint),
      ]);
      setSprint(datosSprint);
      setHistorias(backlogCompleto);
      setSeleccionIds(new Set(sprintBacklog.map((historia) => historia.IdHistoria)));
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  // Marca o desmarca una historia dentro de la seleccion del Sprint.
  function manejarCambiarSeleccion(idHistoria, marcada) {
    setSeleccionIds((anterior) => {
      const nuevaSeleccion = new Set(anterior);
      if (marcada) {
        nuevaSeleccion.add(idHistoria);
      } else {
        nuevaSeleccion.delete(idHistoria);
      }
      return nuevaSeleccion;
    });
  }

  const historiasSeleccionadas = useMemo(
    () => historias.filter((historia) => seleccionIds.has(historia.IdHistoria)),
    [historias, seleccionIds]
  );
  const totalStoryPoints = useMemo(
    () => historiasSeleccionadas.reduce((total, historia) => total + (historia.StoryPoints || 0), 0),
    [historiasSeleccionadas]
  );

  // Persiste la seleccion actual como el Sprint Backlog del Sprint.
  async function manejarCrearSprintBacklog() {
    setGuardando(true);
    setMensajeError('');
    try {
      await sprintsServicio.seleccionarHistoriasSprint(idSprint, [...seleccionIds]);
      navegar(`/proyectos/${idProyecto}/sprints/${idSprint}/tablero`);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setGuardando(false);
    }
  }

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando Sprint Planning..." />;
  }

  if (!sprint) {
    return (
      <div className="contenedor-pagina">
        <p className="campo-error">{mensajeError || 'El Sprint no existe.'}</p>
      </div>
    );
  }

  return (
    <div className={`contenedor-pagina ${estilos.contenedor}`}>
      <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}`} className={estilos.volver}>← Volver al Sprint</Link>

      <SprintGoalDestacado sprint={sprint} />

      <div className={estilos.encabezado}>
        <div>
          <h1>Sprint Planning</h1>
          <p className={estilos.ayuda}>
            Selecciona, como equipo Developer, las historias del Product Backlog que creen poder completar en este Sprint.
          </p>
        </div>
      </div>

      {mensajeError && <p className="campo-error" style={{ marginBottom: 'var(--espacio-4)' }}>{mensajeError}</p>}

      {historias.length === 0 ? (
        <EstadoVacio
          icono="📋"
          titulo="El Product Backlog está vacío"
          descripcion="Crea historias en el backlog del proyecto antes de planificar el Sprint."
          accion={
            <Link to={`/proyectos/${idProyecto}/backlog`} className="boton boton-primario">
              Abrir Product Backlog
            </Link>
          }
        />
      ) : (
        <>
          <div className={estilos.lista}>
            {historias.map((historia) => (
              <FilaHistoriaPlanificacion
                key={historia.IdHistoria}
                historia={historia}
                seleccionada={seleccionIds.has(historia.IdHistoria)}
                alCambiar={manejarCambiarSeleccion}
              />
            ))}
          </div>

          <ResumenStoryPoints
            totalHistorias={historiasSeleccionadas.length}
            totalStoryPoints={totalStoryPoints}
            alConfirmar={manejarCrearSprintBacklog}
            enviando={guardando}
            deshabilitado={historiasSeleccionadas.length === 0}
          />
        </>
      )}
    </div>
  );
}

export default PlanificacionSprintPagina;
