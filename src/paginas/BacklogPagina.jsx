import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as historiasServicio from '../servicios/historiasServicio';
import * as proyectosServicio from '../servicios/proyectosServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import IndicadorCarga from '../componentes/IndicadorCarga';
import EstadoVacio from '../componentes/EstadoVacio';
import TarjetaHistoria from '../componentes/TarjetaHistoria';
import FormularioHistoria from '../componentes/FormularioHistoria';
import estilos from './BacklogPagina.module.css';

// Pantalla del Product Backlog: lista, crea y ordena las historias de un proyecto.
function BacklogPagina() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [historias, setHistorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [enviandoHistoria, setEnviandoHistoria] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    cargarDatos();
  }, [id]);

  // Carga el proyecto y las historias de su backlog.
  async function cargarDatos() {
    setCargando(true);
    setMensajeError('');
    try {
      const [datosProyecto, listaHistorias] = await Promise.all([
        proyectosServicio.obtenerProyectoPorId(id),
        historiasServicio.obtenerHistoriasDelProyecto(id),
      ]);
      setProyecto(datosProyecto);
      setHistorias(listaHistorias);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  // Crea una nueva historia y la agrega al final del backlog.
  async function manejarCrearHistoria(datos) {
    setEnviandoHistoria(true);
    setMensajeError('');
    try {
      await historiasServicio.crearHistoria(id, datos);
      setFormularioAbierto(false);
      setMensajeExito('Historia creada correctamente.');
      await cargarDatos();
      setTimeout(() => setMensajeExito(''), 3000);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setEnviandoHistoria(false);
    }
  }

  // Mueve una historia hacia arriba o abajo y persiste el nuevo orden.
  async function manejarMover(posicion, direccion) {
    const nuevaPosicion = direccion === 'arriba' ? posicion - 1 : posicion + 1;
    if (nuevaPosicion < 0 || nuevaPosicion >= historias.length) return;

    const historiasReordenadas = [...historias];
    [historiasReordenadas[posicion], historiasReordenadas[nuevaPosicion]] = [historiasReordenadas[nuevaPosicion], historiasReordenadas[posicion]];
    setHistorias(historiasReordenadas);

    try {
      await historiasServicio.reordenarHistorias(id, historiasReordenadas.map((historia) => historia.IdHistoria));
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
      cargarDatos();
    }
  }

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando Product Backlog..." />;
  }

  return (
    <div className="contenedor-pagina">
      <Link to={`/proyectos/${id}`} className={estilos.volver}>← Volver al proyecto</Link>

      <div className={estilos.encabezado}>
        <div>
          <h1>Product Backlog</h1>
          {proyecto?.ProductGoal && <p className={estilos.goal}>“{proyecto.ProductGoal}”</p>}
        </div>
        <button type="button" className="boton boton-primario" onClick={() => setFormularioAbierto(true)}>
          + Nueva historia
        </button>
      </div>

      {mensajeExito && <p className={estilos.mensajeExito}>{mensajeExito}</p>}
      {mensajeError && <p className="campo-error" style={{ marginBottom: 'var(--espacio-4)' }}>{mensajeError}</p>}

      {formularioAbierto && (
        <div className={`tarjeta ${estilos.panelFormulario}`}>
          <div className={estilos.encabezadoPanel}>
            <h2>Nueva historia</h2>
            <button type="button" className="boton-icono" onClick={() => setFormularioAbierto(false)} aria-label="Cerrar formulario">✕</button>
          </div>
          <FormularioHistoria alGuardar={manejarCrearHistoria} enviando={enviandoHistoria} textoBoton="Guardar historia" />
        </div>
      )}

      {historias.length === 0 ? (
        <EstadoVacio
          icono="📋"
          titulo="Todavía no existen historias"
          descripcion="Empieza creando la primera necesidad del producto."
          accion={
            <button type="button" className="boton boton-primario" onClick={() => setFormularioAbierto(true)}>
              + Crear historia
            </button>
          }
        />
      ) : (
        <div className={estilos.lista}>
          {historias.map((historia, indice) => (
            <TarjetaHistoria
              key={historia.IdHistoria}
              historia={historia}
              posicion={indice}
              total={historias.length}
              alMover={(direccion) => manejarMover(indice, direccion)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BacklogPagina;
