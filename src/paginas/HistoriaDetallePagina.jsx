import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as historiasServicio from '../servicios/historiasServicio';
import * as criteriosServicio from '../servicios/criteriosServicio';
import * as definitionDoneServicio from '../servicios/definitionDoneServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import IndicadorCarga from '../componentes/IndicadorCarga';
import FormularioHistoria from '../componentes/FormularioHistoria';
import ListaCriteriosAceptacion from '../componentes/ListaCriteriosAceptacion';
import ChecklistHistoria from '../componentes/ChecklistHistoria';
import EtiquetaPrioridad from '../componentes/EtiquetaPrioridad';
import estilos from './HistoriaDetallePagina.module.css';

// Pantalla de detalle de una historia: edicion de datos y criterios de aceptacion.
function HistoriaDetallePagina() {
  const { id: idProyecto, idHistoria } = useParams();
  const [historia, setHistoria] = useState(null);
  const [checklist, setChecklist] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [actualizandoChecklist, setActualizandoChecklist] = useState(false);

  useEffect(() => {
    cargarHistoria();
  }, [idHistoria]);

  // Carga la historia junto con sus criterios de aceptacion.
  async function cargarHistoria() {
    setCargando(true);
    setMensajeError('');
    try {
      const [datosHistoria, datosChecklist] = await Promise.all([
        historiasServicio.obtenerHistoriaPorId(idHistoria),
        definitionDoneServicio.obtenerChecklistHistoria(idHistoria),
      ]);
      setHistoria(datosHistoria);
      setChecklist(datosChecklist);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  // Guarda los cambios del formulario preservando el estado actual de la historia.
  async function manejarGuardar(datos) {
    setEnviando(true);
    setMensajeError('');
    try {
      const actualizada = await historiasServicio.actualizarHistoria(idHistoria, { ...datos, estado: historia.Estado });
      setHistoria((anterior) => ({ ...anterior, ...actualizada, criterios: anterior.criterios }));
      setMensajeExito('Historia actualizada correctamente.');
      setTimeout(() => setMensajeExito(''), 3000);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setEnviando(false);
    }
  }

  // Agrega un criterio de aceptacion y actualiza la vista.
  async function manejarAgregarCriterio(descripcion) {
    try {
      const criterio = await criteriosServicio.agregarCriterio(idHistoria, descripcion);
      setHistoria((anterior) => ({ ...anterior, criterios: [...anterior.criterios, criterio] }));
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    }
  }

  // Edita la descripcion de un criterio existente.
  async function manejarEditarCriterio(idCriterio, descripcion) {
    try {
      await criteriosServicio.actualizarCriterio(idCriterio, descripcion);
      setHistoria((anterior) => ({
        ...anterior,
        criterios: anterior.criterios.map((criterio) => (criterio.IdCriterio === idCriterio ? { ...criterio, Descripcion: descripcion } : criterio)),
      }));
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    }
  }

  // Elimina un criterio de aceptacion.
  async function manejarEliminarCriterio(idCriterio) {
    try {
      await criteriosServicio.eliminarCriterio(idCriterio);
      setHistoria((anterior) => ({ ...anterior, criterios: anterior.criterios.filter((criterio) => criterio.IdCriterio !== idCriterio) }));
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    }
  }

  // Marca o desmarca un criterio Definition of Done de la historia.
  async function manejarCambiarChecklist(idDefinitionDone, cumplido) {
    setActualizandoChecklist(true);
    setMensajeError('');
    try {
      const actualizado = await definitionDoneServicio.actualizarChecklistHistoria(idHistoria, idDefinitionDone, cumplido);
      setChecklist(actualizado);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setActualizandoChecklist(false);
    }
  }

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando historia..." />;
  }

  if (!historia) {
    return (
      <div className="contenedor-pagina">
        <p className="campo-error">{mensajeError || 'La historia no existe.'}</p>
      </div>
    );
  }

  return (
    <div className="contenedor-pagina">
      <Link to={`/proyectos/${idProyecto}/backlog`} className={estilos.volver}>← Volver al backlog</Link>

      <div className={estilos.encabezado}>
        <div>
          <h1>{historia.Titulo}</h1>
          <div className={estilos.metaEncabezado}>
            <EtiquetaPrioridad prioridad={historia.Prioridad} />
            <span className="insignia" style={{ background: 'var(--color-superficie-alterna)', color: 'var(--color-texto-suave)' }}>
              {historia.StoryPoints ?? '—'} pts
            </span>
          </div>
        </div>
      </div>

      {mensajeExito && <p className={estilos.mensajeExito}>{mensajeExito}</p>}
      {mensajeError && <p className="campo-error" style={{ marginBottom: 'var(--espacio-4)' }}>{mensajeError}</p>}

      <div className={estilos.disposicion}>
        <section className={`tarjeta ${estilos.seccion}`}>
          <h2>Editar historia</h2>
          <FormularioHistoria
            valoresIniciales={{
              titulo: historia.Titulo,
              actor: historia.Actor,
              necesidad: historia.Necesidad,
              beneficio: historia.Beneficio,
              prioridad: historia.Prioridad,
              storyPoints: historia.StoryPoints,
            }}
            alGuardar={manejarGuardar}
            enviando={enviando}
            textoBoton="Guardar cambios"
          />
        </section>

        <section className={`tarjeta ${estilos.seccion}`}>
          <h2>Criterios de aceptación</h2>
          <ListaCriteriosAceptacion
            criterios={historia.criterios}
            alAgregar={manejarAgregarCriterio}
            alEditar={manejarEditarCriterio}
            alEliminar={manejarEliminarCriterio}
          />
        </section>
      </div>

      <section className={`tarjeta ${estilos.seccionChecklist}`}>
        <div className={estilos.encabezadoChecklist}>
          <div>
            <h2>Definition of Done</h2>
            <p>La DoD del proyecto se evalua por historia y se valida en backend antes de pasar a Terminado.</p>
          </div>
          <Link to={`/proyectos/${idProyecto}/definition-done`} className="boton boton-secundario boton-pequeno">
            Editar DoD del proyecto
          </Link>
        </div>

        <ChecklistHistoria
          checklist={checklist}
          cargando={actualizandoChecklist}
          alCambiar={manejarCambiarChecklist}
          accion={<Link to={`/proyectos/${idProyecto}/definition-done`} className="boton boton-primario">Crear primer criterio</Link>}
        />
      </section>
    </div>
  );
}

export default HistoriaDetallePagina;
