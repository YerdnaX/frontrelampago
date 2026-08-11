import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as sprintsServicio from '../servicios/sprintsServicio';
import * as proyectosServicio from '../servicios/proyectosServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import IndicadorCarga from '../componentes/IndicadorCarga';
import EstadoVacio from '../componentes/EstadoVacio';
import TarjetaSprint from '../componentes/TarjetaSprint';
import FormularioSprint from '../componentes/FormularioSprint';
import estilos from './SprintsPagina.module.css';

// Pantalla que lista los Sprints de un proyecto y permite crear uno nuevo (HU-049).
function SprintsPagina() {
  const { id: idProyecto } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [sprints, setSprints] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, [idProyecto]);

  // Carga el proyecto y sus Sprints.
  async function cargarDatos() {
    setCargando(true);
    setMensajeError('');
    try {
      const [datosProyecto, listaSprints] = await Promise.all([
        proyectosServicio.obtenerProyectoPorId(idProyecto),
        sprintsServicio.obtenerSprintsDelProyecto(idProyecto),
      ]);
      setProyecto(datosProyecto);
      setSprints(listaSprints);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  // Crea un nuevo Sprint asociado al proyecto actual.
  async function manejarCrearSprint(datos) {
    setEnviando(true);
    setMensajeError('');
    try {
      await sprintsServicio.crearSprint(idProyecto, datos);
      setFormularioAbierto(false);
      await cargarDatos();
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setEnviando(false);
    }
  }

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando Sprints..." />;
  }

  return (
    <div className="contenedor-pagina">
      <Link to={`/proyectos/${idProyecto}`} className={estilos.volver}>← Volver al proyecto</Link>

      <div className={estilos.encabezado}>
        <div>
          <h1>Sprints</h1>
          {proyecto && <p className={estilos.subtitulo}>{proyecto.Nombre}</p>}
        </div>
        <button type="button" className="boton boton-primario" onClick={() => setFormularioAbierto(true)}>
          + Nuevo Sprint
        </button>
      </div>

      {mensajeError && <p className="campo-error" style={{ marginBottom: 'var(--espacio-4)' }}>{mensajeError}</p>}

      {formularioAbierto && (
        <div className={`tarjeta ${estilos.panelFormulario}`}>
          <div className={estilos.encabezadoPanel}>
            <h2>Nuevo Sprint</h2>
            <button type="button" className="boton-icono" onClick={() => setFormularioAbierto(false)} aria-label="Cerrar formulario">✕</button>
          </div>
          <FormularioSprint alGuardar={manejarCrearSprint} alCancelar={() => setFormularioAbierto(false)} enviando={enviando} />
        </div>
      )}

      {sprints.length === 0 ? (
        <EstadoVacio
          icono="🏁"
          titulo="No existen Sprints todavía"
          descripcion="Planifica el primer Sprint del proyecto."
          accion={
            <button type="button" className="boton boton-primario" onClick={() => setFormularioAbierto(true)}>
              + Crear Sprint
            </button>
          }
        />
      ) : (
        <div className={estilos.lista}>
          {sprints.map((sprint) => (
            <TarjetaSprint key={sprint.IdSprint} idProyecto={idProyecto} sprint={sprint} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SprintsPagina;
