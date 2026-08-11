import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as sprintsServicio from '../servicios/sprintsServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import IndicadorCarga from '../componentes/IndicadorCarga';
import EstadoVacio from '../componentes/EstadoVacio';
import ColumnaTablero from '../componentes/ColumnaTablero';
import TarjetaTablero from '../componentes/TarjetaTablero';
import { ESTADOS_HISTORIA } from '../constantes/constantes';
import estilos from './TableroPagina.module.css';

// Tablero Kanban del Sprint: visualiza y permite mover historias entre estados (HU-068/HU-069).
// Punto central de cambio de estado: Integrante 03 debera integrar aqui la validacion de la
// Definition of Done antes de permitir el paso final a "Terminado".
function TableroPagina() {
  const { id: idProyecto, idSprint } = useParams();
  const [sprint, setSprint] = useState(null);
  const [historias, setHistorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');
  const [idArrastrando, setIdArrastrando] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, [idSprint]);

  // Carga el Sprint y las historias comprometidas en su Sprint Backlog.
  async function cargarDatos() {
    setCargando(true);
    setMensajeError('');
    try {
      const [datosSprint, sprintBacklog] = await Promise.all([
        sprintsServicio.obtenerSprintPorId(idSprint),
        sprintsServicio.obtenerSprintBacklog(idSprint),
      ]);
      setSprint(datosSprint);
      setHistorias(sprintBacklog);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  // Cambia el estado de una historia con actualizacion optimista y reversion ante error.
  async function cambiarEstado(historia, nuevoEstado) {
    if (historia.Estado === nuevoEstado) return;
    const estadoAnterior = historia.Estado;

    setHistorias((anterior) => anterior.map((item) => (item.IdHistoria === historia.IdHistoria ? { ...item, Estado: nuevoEstado } : item)));
    setMensajeError('');

    try {
      await sprintsServicio.actualizarEstadoHistoria(historia.IdHistoria, nuevoEstado);
    } catch (error) {
      setHistorias((anterior) => anterior.map((item) => (item.IdHistoria === historia.IdHistoria ? { ...item, Estado: estadoAnterior } : item)));
      setMensajeError('No fue posible actualizar el estado. La historia volvió a su estado anterior.');
    }
  }

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando tablero..." />;
  }

  if (!sprint) {
    return (
      <div className="contenedor-pagina">
        <p className="campo-error">{mensajeError || 'El Sprint no existe.'}</p>
      </div>
    );
  }

  return (
    <div className={estilos.pagina}>
      <div className={estilos.encabezado}>
        <div>
          <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}`} className={estilos.volver}>← {sprint.Nombre}</Link>
          <h1>Tablero</h1>
          <p className={estilos.goal}>“{sprint.SprintGoal}”</p>
        </div>
      </div>

      {mensajeError && <p className={`campo-error ${estilos.error}`}>{mensajeError}</p>}

      {historias.length === 0 ? (
        <EstadoVacio
          icono="🗂"
          titulo="Este Sprint todavía no contiene historias"
          descripcion="Selecciona historias desde el Product Backlog para conformar el Sprint Backlog."
          accion={
            <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}/planificacion`} className="boton boton-primario">
              Planificar Sprint
            </Link>
          }
        />
      ) : (
        <div className={estilos.tablero}>
          {ESTADOS_HISTORIA.map((estado) => {
            const historiasColumna = historias.filter((historia) => historia.Estado === estado);
            return (
              <ColumnaTablero
                key={estado}
                estado={estado}
                historias={historiasColumna}
                alSoltar={(idHistoria, estadoDestino) => {
                  const historia = historias.find((item) => item.IdHistoria === idHistoria);
                  if (historia) cambiarEstado(historia, estadoDestino);
                  setIdArrastrando(null);
                }}
              >
                {historiasColumna.map((historia) => (
                  <TarjetaTablero
                    key={historia.IdHistoria}
                    idProyecto={idProyecto}
                    historia={historia}
                    alCambiarEstado={cambiarEstado}
                    arrastrando={idArrastrando === historia.IdHistoria}
                    alIniciarArrastre={setIdArrastrando}
                    alTerminarArrastre={() => setIdArrastrando(null)}
                  />
                ))}
              </ColumnaTablero>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TableroPagina;
